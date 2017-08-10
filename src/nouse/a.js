
/**
 * Global Setting
 */
fis.set('project.ignore', ['node_modules/**', 'fis-conf.js', 'package.json']);
fis.hook("commonjs", {
    extList: ['.js', '.vue']
});
// 用 loader 来自动引入资源。
fis.match('::package', {
    postpackager: fis.plugin('loader')
});
fis.unhook('components');
fis.hook('node_modules');



/**
 * Set Modules
 */
fis.match('/{node_modules,web,contrib,customs,static/modules}/**', {
    isMod: true,
    useSameNameRequire: true
});



/**
 * Set Parser
 */
//1、JS Parser
fis.match('/{web,contrib,customs}/**.{js,vue:js}',{
    rExt:'.js',
    isMod:true,
    useSameNameRequire:true,
    parser:fis.plugin('babel-5.x',{})
});
fis.match('{/static/**.js,/web/components/echarts.min.js,/customs/*/assets/**}', {
    parser: null,
    isMod: false
});
//2、添加css和image加载支持
fis.match('*.{js,jsx,ts,tsx,es}', {
    preprocessor: [
        fis.plugin('js-require-css'),
        fis.plugin('js-require-file', {
            useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
        })
    ]
});
//3、less Parser
fis.match('{/static/css/*.less,/{web,contrib,customs}/**.{css,less}}', {
    parser: 'less2',
    rExt: '.css',
    postprocessor : fis.plugin("autoprefixer",{
        "browsers": ['Firefox >= 20', 'Safari >= 6', 'Explorer >= 9', 'Chrome >= 12', "ChromeAndroid >= 4.0"],
        "flexboxfixer": true,
        "gradientfixer": true
    }),
    optimizer: fis.plugin('clean-css')
});
//4、Vue Parser
const vueify = require('fis3-parser-vueify');
fis.match('/{web,contrib,customs}/(**.vue)', {
    rExt: 'js',
    isMod:true,
    useSameNameRequire:true,
    parser:fis.plugin(vueify,{})
});



/**
 * Pack
 */
fis.set('path', '../src/static/webapp');
fis.set('url', '/static/webapp/static');
fis.set('query', '?v=' + Date.now());

fis.match('static/**/*', {
    release: fis.get('path') + '/static$0',
    url:fis.get('url') + '$0',
});
fis.match("{web,contrib,customs}/(**)", {
    isMod: true,
    release: fis.get("path") + "/static$0",
    url:fis.get("url") + "$0",
}).match("node_modules/(**)", {
    isMod: true,
    release: fis.get("path") + "/static/$0",
    url:fis.get("url") + "$0",
}).match("web/(**.html)", {
    release: "../src/templates/webapp/$0",
    url:fis.get("url") + "$0",
}).match("contrib/(**.html)", {
    release: "../src/templates/webapp/$0",
    url:fis.get("url") + "$0",
}).match("customs/(**.html)", {
    release: "../src/templates/webapp/$0",
    url:fis.get("url") + "$0",
});

fis.match('::package', {
    postpackager: [fis.plugin('loader', {
        packager: fis.plugin('map')
    })]
});

fis.media("prod").match('/pkg/**.{js,css,png}', {
  useHash: true
}).match('::package', {
    postpackager: [fis.plugin('loader', {
        packager: fis.plugin('map'),
        allInOne: true
    })]
});


// var eslintConf = {
//  ignoreFiles: ['node_modules/**', 'fis-conf.js', 'package.json'],
//  envs: ['browser', 'node'],
//  globals: ['$'],
//  useEslintrc: true,
//  rules: {
//      semi: 0,
//      'brace-style': [2, 'stroustrup'],
//      indent: [2, 4, { 'SwitchCase': 1, 'VariableDeclarator': 1 }],
//      'no-new': 0
//  }
// };

// fis.match('/{web,contrib,customs}/{*.js,**/*.js}', {
//  lint: fis.plugin('eslint', eslintConf)
// });



