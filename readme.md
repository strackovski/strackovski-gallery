strackovski.com - Artist's Gallery Web Site
=========
Gallery web site for art content and artist info with email subscription and basic REST API (used for iOS app). 
Includes HTML email template. Published at http://www.strackovski.com/

![Screens](http://www.nejoapps.eu/quantity-converter/screens.png)

Made using
----
  * Silex PHP framework (http://silex.sensiolabs.org/)
  * Composer (https://getcomposer.org/)
  * SwiftMailer (http://swiftmailer.org/)
  * Bootstrap v3.2.0 (http://getbootstrap.com)
  * jQuery JavaScript Library v1.11.1 (http://jquery.com/)
  * Grunt JS for asset compression (http://gruntjs.com/)

Usage
----
  * Install application dependencies (defined in composer.json) by running composer install
  * Install management dependencies (defined in package.json) using npm install (optional, if you wish to run Grunt tasks)
  * Application parameters must be set in config/config.json. Use config/config.json.dist as template
  * Assets (stylesheets, scripts) can be minified and uglyfied by running Grunt tasks defined in Gruntfile.js
  * Rewrite requests to web/index.php using .htaccess (see htaccess.dist) depending on your server configuration

License
----
Designed and implemented by Vladimir Stračkovski, 2015. Use freely, as long as you use your own
graphic template. For more information please contact owner of this repository. For content information and license on
http://www.strackovski.com/ please consult legal notice on the web site.
