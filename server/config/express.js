/**
 * Configuración para el uso
 * del framework Express 4
 *
 * @author  devnieL
 *
 */

var express         = require('express');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var swig            = require('swig');
var multer          = require('multer');
var favicon         = require('serve-favicon');
var compress        = require('compression');
var cookieParser    = require('cookie-parser');
var cookieSession   = require('cookie-session')

var env = require("./env")[process.env.NODE_ENV || 'development'];

module.exports = function(app, i18n) {

    app.use(compress());

    /*======================================
	   Express Configuration
	    =========================================*/

    app.set('showStackError', true);

    //Prettify HTML
    // ES: Originalmente Express retorna los archivos html sin espacios
    // ni saltos de línea, con esta configuración se retorna un HTML con un formato
    // mejor, ojo que solo a nivel de código fuente, no tiene nada que ver con
    // lo que verá el usuario final.
    //
    app.locals.pretty = true;

    // ES : Todas las variables guardadas como propiedades de app.locals, pueden ser después
    // accedidas en las vistas con etiquetas especiales (<%= errors[0] %>), usualmente se
    // usa para enviar mensajes de error al usuario.
    app.locals.errors = {};
    app.locals.message = {};

    // Set views path, template engine and default layout
    // ES : Establece la ruta donde se encuentran las vistas que serán
    // compiladas y mostradas a los usuarios, además del motor usado en las vistas
    // en este caso SWIG : http://paularmstrong.github.io/swig/
    app.set('views', global.rootDirectory + '/app/views/');

    // Reactjs views

    app.set('view engine', 'jsx');

    app.engine('jsx', require('express-react-views').createEngine({
        beautify : false
    }));

    app.engine('html', swig.renderFile);

    //app.use(favicon(rootDirectory + '/assets/img/favicon.ico'));

    // log every request to the console
    // ES : Utilitario de desarrollo para mostrar las solicitudes realizadas
    // por los usuarios en la consola o log.

    app.use(logger('dev'));

    // simulate DELETE and PUT
    // ES : Permite que los usuarios realicen
    // solicitudes PUT o DELETE
    app.use(methodOverride());

    // Lets use cookie parser to access
    // the cookies on req object
    app.use(cookieParser());

	   // pull information from html in POST
    // ES : Importante para gestionar nativamente
    // solicitudes POST con datos en JSON o incluidos en URLs
	  app.use(bodyParser.json());
	  app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieSession({
      name: 'session',
      keys: ['key1', 'key2']
    }))

    // set the static files location /public/img will be /img for users

    // ES : Establece una carpeta donde se accederan a los archivos públicos
    // tales como javascript, css, imagenes o fuentes de texto.

    app.use(express.static(global.rootDirectory + '/public'));

    /***************************************
    ES : Rutas de la aplicación, aquí
    también puede incluirse endpoints de
    servicios web para acceso desde móviles.
    ****************************************/

    require("./routes")(app);

};
