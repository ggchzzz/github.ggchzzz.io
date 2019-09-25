---
layout: post
title: vue-webpack
date: 2019-09-25 09:29
category: webpack
author: ggchzzz
tags: [fontend,webapck,vue]
summary: detail steps for build vue component
---
### 创建vue webpack项目

1. npm i webpack -g

2. npm i webpack-cli -g

3. npm init -y

4. npm i vue --save

5. npm i webpack webpack-dev-server --save-dev

6. 根目录下新建index.html

    ```js

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>

    </body>
    </html>

    ```

7. 根目录下新建webpack.config.js

```js
var path = require('path');
var webpack = require('webpack');

module.exports = {};
```

新建src文件夹，src文件夹下新建main.js

目前整个项目的结构如下:

### js模块化(CMD规范)

1. 在src目录下新建一个until.js

    ```js
    module.exports = function say() {
        console.log('hello world');
    }
    main.js
    var say = require('./util');
    say();
    ```

2. 修改webpack.config.js

    ```js
    var path = require('path');
    var webpack = require('webpack');

    module.exports = {
        entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
        output: {
            path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
            publicPath: '/dist/', // 通过devServer访问路径
            filename: 'build.js' // 打包后的文件名
        },
        devServer: {
            historyApiFallback: true,
            overlay: true
        }
    };
    ```

3. 修改package.josn

    ```js
    "scripts": {
    "dev": "webpack-dev-server --open --hot",
    "build": "webpack --progress --hide-modules"
    },
    ```

    注意：webpack-dev-server会自动启动一个静态资源web服务器 --hot参数表示启动热更新

4. 修改index.html，引入打包后的文件

    ```html
        <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>

    <body>
        <script src="/dist/build.js"></script>
    </body>

    </html>
    ```

5. 运行

    ```js
    npm run dev
    ```

6. 如果我们希望看打包后的bundle.js文件，运行 

   ```js
   npm run build
   ```

   可以看到生成了一个dist目录，里面就有打包好后的bundle.js
    webpack默认不支持转码es6，但是import export这两个语法却单独支持。所以我们可以改写前面的模块化写法

7. 引入vue

    main.js

    ```js
    import Vue from 'vue';

    var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
    });
    ```

    ```html
    index.html
        <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>

    <body>
        <div id="app">
            {{message}}
        </div>
        <script src="/dist/build.js"></script>
    </body>
    </html>
    ```

    修改webpack.config.js文件

    ```js
    var path = require('path');
    var webpack = require('webpack');

    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/dist/',
            filename: 'build.js'
        },
        devServer: {
            historyApiFallback: true,
            overlay: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        }
    };
    ```

    重新运行npm run dev，可以看到，页面正常显示了Hello World

### 引入scss和css

1. webpack默认只支持js的模块化，如果需要把其他文件也当成模块引入，就需要相对应的    loader解析器

    ```js
    npm i node-sass css-loader vue-style-loader sass-loader --save-dev
    ```

2. webpack.config.js

    ```js
    npm i node-sass css-loader vue-style-loader sass-loader --save-dev
    ```

    webpack.config.js
  
     ```js
        var path = require('path');
    var webpack = require('webpack');

    module.exports = {
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/dist/',
            filename: 'build.js'
        },
        devServer: {
            historyApiFallback: true,
            overlay: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader'
                    ],
                }
            ]
        }
    };
    ```

    解释：

    ```js
    {
    test: /\.css$/,
    use: [
        'vue-style-loader',
        'css-loader'
        ],
    }
    ```

    这段代码意思是：匹配后缀名为css的文件,然后分别用css-loader，vue-style-loader去解析
    解析器的执行顺序是从下往上(先css-loader再vue-style-loader)

    注意：因为我们这里用vue开发，所以使用vue-style-loader，其他情况使用style-loader

    css-loader使得我们可以用模块化的写法引入css,vue-style-loader会将引入的css插入到html页面里的style标签里 

    要引入scss也是同理的配置写法:

    ```js
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                     ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                 ],
            }]
    }
    ```

    我们现在来试下

    在src目录下新建style目录，style目录里新建common.scss

    ```js
    body {
    background: #fed;
    }
    ```

    main.js

    ```js
    import './style/common.scss';
    ```

### 使用babel转码

1. ES6的语法大多数浏览器依旧不支持,bable可以把ES6转码成ES5语法，这样我们就可以大胆的在项目中使用最新特性了

   ```js
   npm i babel-core babel-loader babel-preset-env babel-preset-stage-3 --save-dev
   ```

    webpack.config.js添加一个loade

    ```js
    {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
    }
    ```

    exclude表示忽略node_modules文件夹下的文件，不用转码

2. 配置es6

   ```js
   npm i babel-polyfill --save-dev
    ```

    修改wenpack.config.js入口

    ```js
    entry: ['babel-polyfill', './src/main.js'],
    ```

    重新npm run dev，可以发现正常运行了

### 引入图片资源

1. 引入图片资源

    ```js
    npm i file-loader --save-dev
    ```

    webpack.config.js添加一个loader

    把图片也当成模块引入

   ```js
    {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    options: {
        name: '[name].[ext]?[hash]'
        }
    }
   ```

### 单文件组件

1. 在前面的例子里，我们使用 Vue.component 来定义全局组件  
   在实际项目里，更推荐使用单文件组件

   ```js
    npm i vue-loader vue-template-compiler --save-dev
   ```

2. 添加一个loader

   ```js
    {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
        loaders: {
            'scss': [
                'vue-style-loader',
                'css-loader',
                'sass-loader'
            ],
            'sass': [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
            ]
        }
    }
    }
    ```

3. 在src目录下新建一个App.vue

   ```js
            <template>
        <div id="app">
            <h1>{{ msg }}</h1>
            <img src="./img/logo.png">
            <input type="text" v-model="msg">
        </div>
        </template>

        <script>

        import getData from './util';

        export default {
        name: 'app',
        data () {
            return {
            msg: 'Welcome to Your Vue.js'
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
            const data = await getData();
            this.msg = data;
            }
        }
        }
        </script>

        <style lang="scss">
        #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;

        h1 {
            color: green;
        }
        }
        </style>
    ```

    main.js

    ```js
    import Vue from 'vue';
        import App from './App.vue';

        import './style/common.scss';

        new Vue({
        el: '#app',
        template: '<App/>',
        components: { App }
        })

        ```

        index.html
    
 ```js
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>

        <body>
            <div id="app"></div>
            <script src="/dist/build.js"></script>
        </body>
        </html>
```

   npm run dev，可以发现单文件被正确加载了

4. source-map(调试)

   在开发阶段，调试也是非常重要的一项需求。

    修改webpack.config.js

  ```js
    module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    // 省略其他...

    devtool: '#eval-source-map'
    };
    ```

### 打包发布

1. 在实际发布时，会对文件进行压缩，缓存，分离等等优化处理

   ```js
   npm i cross-env --save-dev
   ```

2. 修改package.json

    ```json
    "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
    }
    ```

3. 这次我们设置了环境变量，打包时，NODE_ENV是production

然后修改webpack.config.js，判断NODE_ENV为production时，压缩js代码

   ```js
    var path = require('path');
    var webpack = require('webpack');

    module.exports = {
        // 省略...
    }

    if (process.env.NODE_ENV === 'production') {
        module.exports.devtool = '#source-map';
        module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
            NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        ])
    }
   ```
