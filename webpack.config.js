const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const MINICssPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: "./src/jss/index.js"
  },
  output: {
    filename: "bundle.[hash:20].js", //hash:20 ctrl f5 basmaqdan qurtarir bizi
    path: path.resolve(__dirname, "dist") //function obyektin ichine girir adi metod olur. dist public, src development
  },
  devServer: {
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          root: "./srv/index.html",
          interpolate: true
        }
      },
      {
        test: /\.css$/i,
        use: [MINICssPlugin.loader, "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MINICssPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new MINICssPlugin(),
    new HTMLPlugin({
      template: "./src/index.html",
      inject: true, //htmlin icine javascripti soxsun
      chunks: ["index"],
      filename: "index.html"
    })
    // new HTMLPlugin({
    //   template: "./src/gallery.html",
    //   inject: true, //htmlin icine javascripti soxsun
    //   chunks: ["index"],
    //   filename: "gallery.html"
    // }),
    // new HTMLPlugin({
    //   template: "./src/contact.html",
    //   inject: true, //htmlin icine javascripti soxsun
    //   chunks: ["index"],
    //   filename: "contact.html"
    // })
  ]
};
