<?php
/**
 * Stevo Stračkovski Gallery Web Site (http://www.strackovski.com)
 * Copyright 2015 Vladimir Stračkovski
 * All rights reserved (https://github.com/strackovski-gallery-www)
 */
error_reporting(0);
ini_set('display_errors', 0);

//====================================================
// APP BOOTSTRAP & CONTROLLERS
//====================================================
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__.'/../vendor/autoload.php';

/*
if ($_SERVER['REMOTE_ADDR'] != '93.103.107.253') {
    return new \Symfony\Component\HttpKernel\Exception\HttpException(404);
}
*/

// Check for mandatory configuration file
if (!file_exists(dirname(__DIR__) . '/config/config.json')) {
    header('HTTP/1.0 404 Not found');
    exit('Invalid configuration. Check manual for more information.');
}

$app = new Silex\Application();
$app['debug'] = false;

// Register URL generator, Twig and Translator providers
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => array(
        __DIR__.'/views/'
    )
));
$app->register(new Silex\Provider\TranslationServiceProvider(), array(
    'locale_fallbacks' => array('en'),
));

// Expose application configuration
$app['cfg'] = $app->share(function(){
    $cfg = file_get_contents(dirname(__DIR__) . '/config/config.json');
    return json_decode($cfg, 1);
});

// Expose subscribers list
$app['subscribers'] = $app->share(function(){
    $cfg = file_get_contents(dirname(__DIR__) . '/config/subscribers.json');
    return json_decode($cfg, 1);
});

$app->register(new Silex\Provider\SwiftmailerServiceProvider());
$app['swiftmailer.options'] = $app['cfg']['email'];

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
 * Translator configuration
 */
$app['enabled_locales'] = $app->share(function(){
    return array('en');
});

$app['translator'] = $app->share($app->extend('translator', function($translator, $app) {
    $translator->addLoader('yaml', new \Symfony\Component\Translation\Loader\YamlFileLoader());
    foreach ($app['enabled_locales'] as $enabledLocale) {
        if (file_exists(__DIR__."/locales/{$enabledLocale}.yml")) {
            $translator->addResource('yaml', __DIR__."/locales/{$enabledLocale}.yml", "{$enabledLocale}");
        }
    }

    return $translator;
}));

/*
 * Home routing
 */
$app->match('/', function(Request $request) use ($app) {
    return new RedirectResponse($request->getLocale());
});

$app->match('/{_locale}/', function ($_locale) use ($app) {
    if (!in_array($_locale, $app['enabled_locales'])) {
        // @todo use locale fallback
        return new RedirectResponse('/en/');
    }

    $data = array();
    $data['artwork'] = $app['cfg']['artwork'];
    $data['page'] = $app['cfg']['pages']['home'];
    $data['content'] = $app['cfg']['pages'];
    $data['active'] = 'home';

    return $app['twig']->render('page.twig', $data);
})->bind('home');


/*
 * Sections routing
 */
$app->match('/{_locale}/{section}', function (Request $request, $_locale, $section) use ($app) {
    if (!in_array($_locale, $app['enabled_locales'])) {
        return new RedirectResponse('/en/' . $section);
    }

    $section2 = trim(strtolower($section));

    if (!array_key_exists($section2, $app['cfg']['pages'])) {
        throw new \Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
    }
    $data = array();
    $data['artwork'] = $app['cfg']['artwork'];
    $data['page'] = $app['cfg']['pages'][$section2];
    $data['content'] = $app['cfg']['pages'];
    $data['active'] = $section2;

    return $app['twig']->render('page.twig', $data);
})->bind('section');

/**
 * API Endpoint Interface
 *
 * @param string resource Defines type of resource requested
 * @internal string query Defines type of query (action) to perform on the resource
 */
$app->match('/{_locale}/api/{resource}', function (Request $request, $resource) use ($app) {
    $result = array();
    $queries = array('featured', 'all', 'add', 'check', 'remove');
    $query = strtolower(trim($request->get('q')));

    if (is_null($query) or strlen($query) < 1) {
        throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
    }

    if (!in_array($query, $queries)) {
        throw new \Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
    }

    // Get image resources
    if ($resource == 'images') {
        foreach ($app['cfg']['artwork'] as $i => $artwork) {
            // Get featured items only
            if ($query == 'featured') {
                if ($artwork['featured'] == 1) {
                    $result[$i]['id'] = $artwork['id'];
                    $result[$i]['name'] = $artwork['file'];
                    $result[$i]['title'] = $artwork['title'];
                }
            // Get all items
            } else if ($query == 'all') {
                $result[$i]['id'] = $artwork['id'];
                $result[$i]['name'] = $artwork['file'];
                $result[$i]['title'] = $artwork['title'];
            }
        }
    // Manage newsletter subscriptions
    } else if ($resource == 'subscription') {
        $email = $request->get('email');

        if (is_null($email) or strlen($email) < 1) {
            return new Response("Invalid parameter 'email'", '500');
        }

        // Check if email already subscribed
        if ($query == 'check') {
            if (in_array($email, $app['subscribers'])) {
                return 1;
            } else {
                return 0;
            }
        // Add new subscriber
        } else if ($query == 'add') {
            if (in_array($email, $app['subscribers'])) {
                return 0;
            } else {
                $newList = $app['subscribers'];
                $newList[] = $email;

                // Add subscriber email to subscribers list
                $f = fopen(dirname(__DIR__) . '/config/subscribers.json', 'w');
                fwrite($f, json_encode($newList));
                fclose($f);

                // Send confirmation emails
                $subReq = Request::create('/subscribe', 'POST', array('subscribe_email' => $email, 'include_featured' => 1));
                $app->handle($subReq, \Symfony\Component\HttpKernel\HttpKernelInterface::SUB_REQUEST, false);

                return 1;
            }
        // Remove existing subscriber
        } else if ($query == 'remove') {
            if (in_array($email, $app['subscribers'])) {
                $emailList = $app['subscribers'];

                // Remove existing subscriber from subscribers list
                unset($emailList[array_search($email, $app['subscribers'])]);
                $emailList = array_values($emailList);
                $f = fopen(dirname(__DIR__) . '/config/subscribers.json', 'w');
                fwrite($f, json_encode($emailList));
                fclose($f);

                return 1;
            } else {
                return 0;
            }
        }
    }
    return json_encode($result);
})->bind('api');

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
        ->setFrom(array($app['cfg']['email']['username'] => ucfirst($app['cfg']['name'])))
        ->setTo($app['cfg']['admin_email'])
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
        ->setFrom(array($app['cfg']['email']['username'] => ucfirst($app['cfg']['name'])))
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
        ->setFrom(array($app['cfg']['email']['username'] => ucfirst($app['cfg']['name'])))
        ->setTo($app['cfg']['admin_email'])
        ->setContentType('text/html')
        ->setBody("{$senderName} ({$clientEmail}) wrote: {$senderMsg}");

    // Build HTML email template for client message
    $data = $app['cfg']['messages']['contact_confirm'];
    if (!is_null($request->get('include_featured'))) {
        $data['featured'] = $app['cfg']['messages']['featured'];
    }
    $body = $app['twig']->render('mail/email-message.twig', $data);

    // Build client confirmation message
    $clientConfirmationMessage = \Swift_Message::newInstance()
        ->setSubject($data['mail']['subtitle'])
        ->setFrom(array($app['cfg']['email']['username'] => ucfirst($app['cfg']['name'])))
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