# Pill Boxer v2.0

## Why
Pill Boxer was designed and built to easily allow web producers to create photos in a 16:9 aspect ratio from portrait or otherwise non-landscape photos, such as mugshots.

The term for this technqiue is called "pillarboxing" (versus the more-common term letterboxing), hence the name.

[Try it out!](https://media.mcclatchy.com/static/pill-boxer/)

## What

Built with:

* Svelte
* Cropper.js
* Tailwind CSS
* Vite.js


*Max image width or height is 4,096px. This can be configured in `App.svelte`.*

## How to start working with it

First, I highly recommend becoming familar with the [Svelte](https://svelte.dev/docs), [Tailwind CSS](https://tailwindcss.com/docs/installation) and [Cropper.js](https://github.com/fengyuanchen/cropperjs/blob/main/README.md) documentation.

Install modules
```bash
npm install
```

Start server
```bash
npm run dev
```
Build for production
```bash
npm run build
```

## Deployment
This application is deployed via McClatchy's SSH static server.

All files inside of `dist` must be uploaded to the `McClatchy/McClatchy/static/pill-boxer` directory.

## About v1.0

The original version of Pillboxer was built with `gulp` and mostly-vanilla JS. It can be found under the tag `archive/v1`. To restore this branch use: `git checkout -b v1 archive/v1`.
