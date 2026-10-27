/**
 * Pruebas unitarias del frontend con Jasmine + Karma.
 *  - Jasmine: escribe las pruebas (describe / it / expect / spyOn).
 *  - Karma: las ejecuta dentro de un Chrome real (sin ventana).
 *  - webpack + babel: traducen TypeScript/JSX para que el navegador lo entienda.
 *  - Karma-coverage: genera el informe de cobertura en /coverage.
 * Requiere tener Google Chrome instalado.
 */
const path = require("path");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],
    plugins: [
      require("karma-jasmine"),
      require("karma-webpack"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
    ],
    files: [{ pattern: "tests/index.js", watched: false }],
    preprocessors: { "tests/index.js": ["webpack"] },
    webpack: {
      mode: "development",
      devtool: false,
      resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"],
        alias: {
          "@": __dirname,
          // En las pruebas no hay router de Next: se usan versiones simples de estos módulos.
          "next/link$": path.resolve(__dirname, "tests/stubs/next-link.tsx"),
          "next/navigation$": path.resolve(__dirname, "tests/stubs/next-navigation.ts"),
        },
      },
      module: {
        rules: [
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: { chrome: "100" } }],
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-typescript",
                ],
                plugins: [["istanbul", { exclude: ["tests/**"] }]],
              },
            },
          },
        ],
      },
    },
    reporters: ["progress", "coverage"],
    coverageReporter: {
      dir: path.join(__dirname, "coverage"),
      reporters: [{ type: "html", subdir: "html" }, { type: "text-summary" }],
    },
    browsers: ["ChromeHeadlessCI"],
    customLaunchers: {
      ChromeHeadlessCI: { base: "ChromeHeadless", flags: ["--no-sandbox", "--disable-gpu"] },
    },
    singleRun: true,
    restartOnFileChange: true,
  });
};
