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

fractal.engine('twig', '@frctl/twig-adapter'); // register the Twig engine adapter
fractal.set('components.ext', '.twig'); // use Twig for component views
fractal.set('components.engine', 'twig'); // look for files with a .twig file extension
```

The handle syntax uses `#` character instead of `@` in order to keep compatibility with the PHP version of Twig which uses `@` for namespaces.

```
{% include '#my-component' %}
```
