# Twig Adapter

Use Twig templates with [Fractal](http://frctl.github.io).

## Usage

Install via NPM:

```bash
npm i https://github.com/tnottu/fractal-twig-adapter.git --save
```

Add configuration details into your fractal.js file:

```js
const twigAdapter = require('@frctl/twig');
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig'
```
