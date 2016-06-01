# Twig Adapter

Use Twig templates with Fractal.

This is the default template engine adapter for Fractal and does not need to be installed separately. See the Fractal [template engine documentation](https://github.com/frctl/fractal/blob/master/docs/engines/overview.md) for details on use and customisation.

# Twig Adapter

Use Twig templates with [Fractal](http://frctl.github.io).

## Usage

Install via NPM:

```bash
npm i https://github.com/tnottu/fractal-twig-adapter.git --save
```

Add configuration details into your fractal.js file:

```js
const fractal = require('@frctl/fractal');

fractal.engine('twig', '@frctl/twig-adapter'); // register the twig engine adapter
fractal.set('components.ext', '.twig'); // look for files with a .twig file extension

```
