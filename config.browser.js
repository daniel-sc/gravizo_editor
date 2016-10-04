System.config({
  //use typescript for compilation
  //transpiler: 'typescript'
  transpiler: 'ts',
  //typescript compiler options
  typescriptOptions: {
    tsconfig: true,
    emitDecoratorMetadata: true
  },
  meta: {
    'typescript': {
      "exports": "ts"
    }
  },
  paths: {
    // paths serve as alias
    'npm:': 'https://unpkg.com/'
  },
  //map tells the System loader where to look for things
  map: {
    app: "./src",
        // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

    // other libraries
    'rxjs':                      'npm:rxjs',
    'ts':                        'npm:plugin-typescript@4.0.10/lib/plugin.js',
    'typescript':                'npm:typescript@2.0.2/lib/typescript.js'
  },
  //packages defines our app package
  packages: {
    app: {
      main: './main.ts',
      defaultExtension: 'ts'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  }
});
