const deps = require('./package.json').dependencies

module.exports = {
  publicPath: 'http://localhost:8085/',

  chainWebpack: (config) => {

    config.optimization.delete('splitChunks')
    /* module federation plugin import */
    config
      .plugin('module-federation-plugin')
      .use(require('webpack').container.ModuleFederationPlugin, [{
        name: "layout",
        filename: "remoteEntry.js",
        remotes: {
          home: 'home@http://localhost:8084/remoteEntry.js',
        },
        shared: {
          "core-js": {
            eager: true,
            singleton: true,
            requiredVersion: deps['core-js'],
          },
          "vue": {
            eager: true,
            singleton: true,
            requiredVersion: deps.vue,
          }
        }
    }])
  },

  devServer: {
    port: 8085,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    }
  }
}