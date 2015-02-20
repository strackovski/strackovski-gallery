<?php
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__.'/../vendor/autoload.php';

if ($_SERVER['REMOTE_ADDR'] != '93.103.107.253') {
    die('...');
}

$app = new Silex\Application();
$app['debug'] = true;

$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/views',
));

$app->register(new Silex\Provider\TranslationServiceProvider(), array(
    'locale_fallbacks' => array('en'),
));

$app['artwork'] = $app->share(function(){
    $dir = __DIR__.'/artwork';
    $result = array();
    if (file_exists($dir) and is_dir($dir)) {
        $files = scandir($dir);
        foreach ($files as $file) {
            $finfo = pathinfo($dir.'/'.$file);
            if ($finfo['extension'] == 'jpg' or $finfo['extension'] == 'png') {
                $result[] = $file;
            }
        }
    }

    return $result;
});

$app['translator'] = $app->share($app->extend('translator', function($translator, $app) {
    $translator->addLoader('yaml', new \Symfony\Component\Translation\Loader\YamlFileLoader());

    $translator->addResource('yaml', __DIR__.'/locales/en.yml', 'en');
    $translator->addResource('yaml', __DIR__.'/locales/sl.yml', 'sl');

    return $translator;
}));

$app->match('/', function(Request $request) use ($app) {
    return new RedirectResponse($request->getLocale());
});

$app->match('/{_locale}/', function () use ($app) {
    $pageData = array(
        'keywords' => 'Stevo Strackovski art gallery, contemporary art',
        'description' => 'Stevo Strackovski art gallery, contemporary art',
        'author' => 'Stevo Strackovski',
        'title' => 'Welcome',
        'slug' => 'home'
    );
    $data = array();
    $data['artwork'] = $app['artwork'];
    $data['page'] = $pageData;
    return $app['twig']->render('home.twig', $data);
})->bind('home');

$app->match('/{_locale}/{section}', function ($section) use ($app) {
    $section2 = trim(strtolower($section));
    $allowed = array('about', 'gallery', 'home');
    if (!file_exists(__DIR__.'/views/' . strtolower($section) . '.twig') or
        !in_array(strtolower($section), $allowed)) {
        return new Response('', 404);
    }

    $pageData = array(
        'keywords' => 'Stevo Strackovski art gallery, contemporary art',
        'description' => 'Stevo Strackovski art gallery, contemporary art',
        'author' => 'Stevo Strackovski',
        'title' => ucfirst($section2),
        'slug' => $section2
    );
    $data = array();
    $data['artwork'] = $app['artwork'];
    $data['page'] = $pageData;

    return $app['twig']->render(strtolower($section) . '.twig', $data);
})->bind('section');

$app->run();