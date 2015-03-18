<?php
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__.'/../vendor/autoload.php';

// M7anC760lRoXKs7N


if ($_SERVER['REMOTE_ADDR'] != '93.103.107.253') {
    die('...');
}


$app = new Silex\Application();
$app['debug'] = false;

$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => array(
        __DIR__.'/views/'
    )
));
$app->register(new Silex\Provider\TranslationServiceProvider(), array(
    'locale_fallbacks' => array('en'),
));
$app->register(new Silex\Provider\SwiftmailerServiceProvider());
$app['swiftmailer.options'] = array(
    'host' => 'mail.your-server.de',
    'port' => '587',
    'username' => 'info@strackovski.com',
    'password' => 'M7anC760lRoXKs7N',
    'encryption' => 'tls',
    'auth_mode' => 'login'
);

/*
 * Content definition
 */
$app['messages'] = $app->share(function(){
    return array(
        'contact_confirm' => array(
            'title' => 'Strackovski Art',
            'subtitle' => 'Message received!',
            'main' => array(
                'title' => 'Thank you for your message',
                'body' => 'I will get back to you shortly. In the meantime feel free to check the featured section below. If you would like to contact me further simply reply to this message.'
            )
        ),
        'newsletter_confirm' => array(
            'title' => 'Strackovski Newsletter',
            'subtitle' => 'Subscription confirmed!',
            'main' => array(
                'title' => 'Welcome',
                'body' => 'Thank you for subscribing to my newsletter! You will receive an email when new works are uploaded to this site, which happens approximately once a month. In the meantime feel free to check the featured section below. If you would like to contact me simply reply to this message.'
            )
        ),
        'featured' => array(
            0 => array(
                'image' => 'gent1.jpg',
                'title' => 'Gentlemen',
                'text' => 'Some text about this feature'
            ),
            1 => array(
                'image' => 'dama1.jpg',
                'title' => 'Ladies',
                'text' => 'Some text about this feature'
            ),
            2 => array(
                'image' => 'gent2.jpg',
                'title' => 'Gentlemen',
                'text' => 'Some text about this feature'
            ),
            3 => array(
                'image' => 'dama2.jpg',
                'title' => 'Ladies',
                'text' => 'Some text about this feature'
            )
        )
    );
});

$app['pages'] = $app->share(function(){
    return array(
        'home' => array(
            'keywords' => 'Stevo Strackovski art gallery, contemporary art',
            'description' => 'Stevo Strackovski art gallery, contemporary art',
            'author' => 'Stevo Strackovski',
            'title' => 'Welcome',
            'slug' => 'home'
        ),
        'about' => array(
            'keywords' => 'Stevo Strackovski art gallery, contemporary art',
            'description' => 'Stevo Strackovski art gallery, contemporary art',
            'author' => 'Stevo Strackovski',
            'title' => 'About',
            'slug' => 'about'
        ),
        'gallery' => array(
            'keywords' => 'Stevo Strackovski art gallery, contemporary art',
            'description' => 'Stevo Strackovski art gallery, contemporary art',
            'author' => 'Stevo Strackovski',
            'title' => 'Gallery',
            'slug' => 'gallery'
        )
    );
});

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

/*
    $result = array();
    for($i = 0; $i < 20; ++$i) {
        $result[] = 'pch.png';
    } */

    return $result;
});


/*
 * Error handlers
 */
$app->error(function (\Exception $e, $code) use ($app) {
    $templates = array(
        'errors/'.$code.'.html.twig',
        'errors/'.substr($code, 0, 2).'x.html.twig',
        'errors/'.substr($code, 0, 1).'xx.html.twig',
        'errors/default.html.twig'
    );

    return new Response($app['twig']->resolveTemplate($templates)->render(array('code' => $code)), $code);
});

/*
 * Translator
 */
$app['translator'] = $app->share($app->extend('translator', function($translator, $app) {
    $translator->addLoader('yaml', new \Symfony\Component\Translation\Loader\YamlFileLoader());
    $translator->addResource('yaml', __DIR__.'/locales/en.yml', 'en');
    $translator->addResource('yaml', __DIR__.'/locales/sl.yml', 'sl');

    return $translator;
}));

/*
 * Home routing
 */
$app->match('/', function(Request $request) use ($app) {
    return new RedirectResponse($request->getLocale());
});

$app->match('/{_locale}/', function () use ($app) {;
    $data = array();
    $data['artwork'] = $app['artwork'];
    $data['page'] = $app['pages']['home'];

    return $app['twig']->render('home.twig', $data);
})->bind('home');

/*
 * Sections routing
 */
$app->match('/{_locale}/{section}', function ($section) use ($app) {
    $section2 = trim(strtolower($section));
    if (!array_key_exists($section2, $app['pages']) or
        !file_exists(__DIR__.'/views/' . strtolower($section) . '.twig')) {
            throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
    }
    $data = array();
    $data['artwork'] = $app['artwork'];
    $data['page'] = $app['pages'][$section2];

    return $app['twig']->render(strtolower($section) . '.twig', $data);
})->bind('section');

/*
 * Mailing
 */
$app->match('/mail', function (Request $request) use ($app)
{
    $action = $request->get('action');

    if (is_null($action)) {
        throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
    }

    if ($action == 'newsletter') {
        $subscriberEmail = $request->get('subscribe_email');

        if (is_null($subscriberEmail) or strlen($subscriberEmail) < 1) {
            throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
        }

        $confirmationMessage = \Swift_Message::newInstance()
            ->setSubject('New subscriber')
            ->setFrom(array('info@strackovski.com' => 'Strackovski.com'))
            ->setTo(array('vlado@nv3.org'))
            ->setContentType('text/html')
            ->setBody($subscriberEmail);

        $data = $app['messages']['newsletter_confirm'];
    } elseif($action == 'contact') {
        $senderName = $request->get('contact_name');
        $senderEmail = $request->get('contact_email');
        $senderMsg = $request->get('contact_msg');

        if (is_null($senderName) or strlen($senderName) < 1) {
            throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
        }

        if (is_null($senderEmail) or strlen($senderEmail) < 1) {
            throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
        }

        if (is_null($senderMsg) or strlen($senderMsg) < 1) {
            throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
        }

        // Message to admin
        $confirmationMessage = \Swift_Message::newInstance()
            ->setSubject('New message')
            ->setFrom(array($senderEmail => $senderName))
            ->setTo(array('vlado@nv3.org'))
            ->setContentType('text/html')
            ->setBody($senderMsg);

        $data = $app['messages']['contact_confirm'];
    }
    else {
        throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
    }

    if (!is_null($request->get('include_featured'))) {
        $data['featured'] = $app['messages']['featured'];
    }

    $body = $app['twig']->render('mail/email-message.twig', $data);

    // Message to client
    $message = \Swift_Message::newInstance()
        ->setSubject($data['mail']['subtitle'])
        ->setFrom(array('info@strackovski.com' => 'Strackovski.com'))
        ->setTo(array('vlado@nv3.org'))
        ->setContentType('text/html')
        ->setBody($body);

    try {
        if (isset($confirmationMessage)) {
            $app['mailer']->send($confirmationMessage);
        }
        return $app['mailer']->send($message);
    } catch (\Exception $e) {
        throw new Exception($e->getMessage());
    }

})->bind('mail');

$app->run();