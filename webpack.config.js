const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugInPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let production = process.env.NODE_ENV === "production";

let config = {
  mode: "development",
  devServer: {
    liveReload: true,
    watchFiles: ["src/**/* css/**/*"],
    static: "./dist",
    // proxy: {
    //   "/api": {
    //     target: "",
    //   },
    // },
    open: true,
    hot: true,
  },
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
    clean: true,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      // Javascript
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
      // // HTML
      // {
      //   test: /\.html$/,
      //   exclude: /node-modules/,
      //   use: ["html-loader"],
      // },
      // CSS
      {
        test: /\.css$/,
        exclude: /node-modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      // Images/Assets
      {
        test: /\.(svg|ico|png|webp|jpg|gif|jpeg)$/i,
        type: "assets/resource",
      },
      // SCSS/SASS
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new CopyPlugInPlugin({
      patterns: [
        { from: "src/assets", to: "assets" }, // Adjust according to your asset directory structure
      ],
    }),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "Home",
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      title: "Blog",
      template: path.resolve(__dirname, "src/blog.html"),
      filename: "blog.html",
    }),
    new HtmlWebpackPlugin({
      title: "Quiz",
      template: path.resolve(__dirname, "src/quiz.html"),
      filename: "quiz.html",
    }),
    new HtmlWebpackPlugin({
      title: "Login",
      template: path.resolve(__dirname, "src/login.html"),
      filename: "login.html",
    }),
    new HtmlWebpackPlugin({
      title: "Signup",
      template: path.resolve(__dirname, "src/signup.html"),
      filename: "signup.html",
    }),
    new HtmlWebpackPlugin({
      title: "Shop",
      template: path.resolve(__dirname, "src/shop.html"),
      filename: "shop.html",
    }),
    new HtmlWebpackPlugin({
      title: "Checkout",
      template: path.resolve(__dirname, "src/checkout.html"),
      filename: "checkout.html",
    }),
  ],
};

if (production) {
  (config.mode = "production"), (config.devtool = "eval");
}

module.exports = config;
