const path = require('path')
const utils = require('./build/utils')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const uploadZip = require('./build/upload-zip')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'
const isCdn = process.env.VUE_APP_URL === 'prod'
// vue.config.js
module.exports = {
  pages: {
    ...utils.entries()
  },
  publicPath: isProduction ? './' : '/',
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@a', resolve('src/assets'))
      .set('@c', resolve('src/components/common'))
      .set('@u', resolve('src/utils'))
      .set('@config', resolve('src/config'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
      .set('@ant-design/icons/lib/dist$', resolve('src/antd-icons.js'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },
  configureWebpack: config => {
    // 忽略moment其它语言库
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // 配置cdn模块
    if (isProduction) {
      // config.plugins.push(
      //   new BundleAnalyzerPlugin({
      //     analyzerPort: 8891
      //   })
      // )
      config.plugins.push(new uploadZip())
      config.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        moment: 'moment'
      }

      // 压缩代码
      config.optimization = {
        splitChunks: {},
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true
              }
            }
          })
        ]
      }
    }
  },
  css: {
    extract: true,
    loaderOptions: {
      less: {
        modifyVars: {
          // less全局变量
          /*
          'primary-color': '#F5222D',
          */
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://39.97.246.227:8090',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/zhuxu': {
        // target: 'http://39.97.164.4:9001/', // 外网
        target: 'http://wxz-test-001.natapp1.cc',
        changeOrigin: true,
        pathRewrite: {
          '^/zhuxu': ''
        }
      },
      '/wangxuanzhang': {
        // target: 'http://39.97.164.4:9001/', // 外网
        target: 'http://wxz-test-001.natapp1.cc/',
        changeOrigin: true,
        pathRewrite: {
          '^/wangxuanzhang': ''
        }
      }
    }
  },
  productionSourceMap: false,
  lintOnSave: true,
  transpileDependencies: []
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, 'src/assets/css/variables.less')]
    })
}
