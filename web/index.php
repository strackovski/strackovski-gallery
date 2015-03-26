<?php
/**
 * Stevo Stračkovski Gallery Web Site (http://www.strackovski.com)
 * Copyright 2015 Vladimir Stračkovski
 * All rights reserved (https://github.com/strackovski-art-www)
 */
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__.'/../vendor/autoload.php';

if ($_SERVER['REMOTE_ADDR'] != '93.103.107.253') {
    die('...');
}

if (!file_exists(dirname(__DIR__) . '/config/config.json')) {
    header('HTTP/1.0 404 Not found');
    exit('Invalid configuration. Check manual for more information.');
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

$app['cfg'] = $app->share(function(){
    $cfg = file_get_contents(dirname(__DIR__) . '/config/config.json');
    return json_decode($cfg, 1);
});

$app->register(new Silex\Provider\SwiftmailerServiceProvider());
$app['swiftmailer.options'] = $app['cfg']['email'];

$app['artwork'] = $app->share(function(){
    /*
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
    */

    $result = array();
    for($i = 0; $i < 20; ++$i) {
        $result[] = 'pch.png';
    }

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

$app->match('/{_locale}/', function ($_locale) use ($app) {
    if ($_locale != 'en') {
        return new RedirectResponse('/en/');
    }

    $data = array();
    $data['artwork'] = $app['artwork'];
    $data['page'] = $app['cfg']['pages']['home'];
    $data['active'] = 'home';

    return $app['twig']->render('page.twig', $data);
})->bind('home');

/*
 * Sections routing
 */
$app->match('/{_locale}/{section}', function (Request $request, $_locale, $section) use ($app) {
    if ($_locale != 'en') {
        return new RedirectResponse('/en/' . $section);
    }

    $section2 = trim(strtolower($section));

    if (!array_key_exists($section2, $app['cfg']['pages'])) {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
    }
    $data = array();
    $data['artwork'] = $app['artwork'];
    $data['page'] = $app['cfg']['pages'][$section2];
    $data['active'] = $section2;

    return $app['twig']->render('page.twig', $data);
})->bind('section');

/*
 * Newsletter subscription email handler
 */
$app->match('/subscribe', function (Request $request) use ($app) {
    $clientEmail = $request->get('subscribe_email');

    if (is_null($clientEmail) or strlen($clientEmail) < 1) {
        throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
    }

    // Build new subscription notification message for list administrator
    $adminNotificationMessage = \Swift_Message::newInstance()
        ->setSubject('New subscriber')
        ->setFrom(array('info@strackovski.com' => 'Strackovski.com'))
        ->setTo(array('vlado@nv3.org'))
        ->setContentType('text/html')
        ->setBody($clientEmail);

    // Build HTML email template for client subscription confirmation message
    $data = $app['cfg']['messages']['newsletter_confirm'];
    if (!is_null($request->get('include_featured'))) {
        $data['featured'] = $app['cfg']['messages']['featured'];
    }
    $body = $app['twig']->render('mail/email-message.twig', $data);

    // Build subscription confirmation message for client
    $clientConfirmationMessage = \Swift_Message::newInstance()
        ->setSubject($data['mail']['subtitle'])
        ->setFrom(array('info@strackovski.com' => 'Strackovski.com'))
        ->setTo(array($clientEmail))
        ->setContentType('text/html')
        ->setBody($body);

    try {
        $app['mailer']->send($adminNotificationMessage);
        $app['mailer']->send($clientConfirmationMessage);

        return true;
    } catch (\Exception $e) {
        throw new Exception($e->getMessage());
    }
})->bind('subscribe');

/*
 * Contact form action handler
 */
$app->match('/message', function (Request $request) use ($app) {
    $senderName = $request->get('contact_name');
    $clientEmail = $request->get('contact_email');
    $senderMsg = $request->get('contact_msg');

    if (is_null($senderName) or strlen($senderName) < 1) {
        throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
    }

    if (is_null($clientEmail) or strlen($clientEmail) < 1) {
        throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
    }

    if (is_null($senderMsg) or strlen($senderMsg) < 1) {
        throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
    }

    // Build message notification email for site administrator
    $adminNotificationMessage = \Swift_Message::newInstance()
        ->setSubject('New message')
        ->setFrom(array($clientEmail => $senderName))
        ->setTo(array('vlado@nv3.org'))
        ->setContentType('text/html')
        ->setBody($senderMsg);

    // Build HTML email template for client message
    $data = $app['cfg']['messages']['contact_confirm'];
    if (!is_null($request->get('include_featured'))) {
        $data['featured'] = $app['cfg']['messages']['featured'];
    }
    $body = $app['twig']->render('mail/email-message.twig', $data);

    // Build client confirmation message
    $clientConfirmationMessage = \Swift_Message::newInstance()
        ->setSubject($data['mail']['subtitle'])
        ->setFrom(array('info@strackovski.com' => 'Strackovski.com'))
        ->setTo(array($clientEmail))
        ->setContentType('text/html')
        ->setBody($body);

    try {
        $app['mailer']->send($adminNotificationMessage);
        $app['mailer']->send($clientConfirmationMessage);

        return true;
    } catch (\Exception $e) {
        throw new Exception($e->getMessage());
    }
})->bind('message');

$app->run();