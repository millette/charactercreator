module.exports = {
  exclude: [
    "cc-v2.code-workspace",
  ],
  scripts: {
    "mount:src": "mount src --to /",
    "mount:css": "mount css",
    "mount:credits": "mount target/credits --to /credits",
    "mount:layer": "mount target/layer --to /layer",
    "run:sass": "sass src/sass:css --no-source-map",
    "run:sass::watch": "$1 --watch",
  },
  devOptions: {
    bundle: false,
    open: "none",
    hmr: false,
  },
}
