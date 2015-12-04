import {readFileSync} from 'fs';
import {argv} from 'yargs';


// --------------
// Configuration.
export const ENV                  = argv['env']         || 'dev';
export const DEBUG                = argv['debug']       || false;
export const PORT                 = argv['port']        || 5000;
export const LIVE_RELOAD_PORT     = argv['reload-port'] || 4002;
export const DOCS_PORT            = argv['docs-port']   || 4003;
export const APP_BASE             = argv['base']        || '/';

export const APP_TITLE            = 'Signature generator';

export const APP_SRC              = 'app';
export const ASSETS_SRC           = `${APP_SRC}/assets/**/*`;
export const NODE_MODULES_SRC     = 'node_modules';

export const DIST_PATH            = '/';

export const TOOLS_DIR            = 'tools';
export const TEST_DEST            = 'test';
export const DOCS_DEST            = 'docs';
export const APP_DEST             = `dist/${ENV}`;
export const ASSETS_DEST          = `${APP_DEST}/assets`;
export const CSS_DEST             = `${APP_DEST}/styles`;
export const FONTS_DEST           = `${APP_DEST}/fonts`;
export const LIB_DEST             = `${APP_DEST}/libs`;
export const VERSION              = appVersion();

export const VERSION_NPM          = '3.0.0';
export const VERSION_NODE         = '4.0.0';

// Declare NPM dependencies (Note that globs should not be injected).
export const DEV_DEPENDENCIES = [
  { src: 'systemjs/dist/system-polyfills.js', dest: LIB_DEST },

  { src: 'es6-shim/es6-shim.min.js',    dest: LIB_DEST, inject: 'shims' },
  { src: 'reflect-metadata/Reflect.js', dest: LIB_DEST, inject: 'shims' },
  { src: 'systemjs/dist/system.src.js', dest: LIB_DEST, inject: 'shims' },

  // Faster dev page load
  { src: 'angular2/bundles/angular2.dev.js', dest: LIB_DEST, inject: 'libs' },
  { src: 'angular2/bundles/router.dev.js', dest: LIB_DEST, inject: 'libs' },
  { src: 'angular2/bundles/http.dev.js', dest: LIB_DEST, inject: 'libs' },
];

DEV_DEPENDENCIES
  .filter(d => !/\*/.test(d.src)) // Skip globs
  .forEach(d => d.src = require.resolve(d.src));

export const APP_ASSETS = [
  { src: `${DIST_PATH}components/app/app.css`, inject: true, dest: CSS_DEST }
];

export const SYSTEM_CONFIG = {
  defaultJSExtensions: true,
  paths: {
    '*': `${DIST_PATH}node_modules/*`
  }
};


// --------------
// Private.
function appVersion(): number|string {
  var pkg = JSON.parse(readFileSync('package.json').toString());
  return pkg.version;
}
