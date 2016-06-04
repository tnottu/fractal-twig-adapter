'use strict';

const Path = require('path');
const Twig = require('twig');

module.exports = function(source, config){

	let instance = Twig.twig;
	let viewCache = null;

	Twig.cache(false);

	/**
	 * Register a custom loader for `@component` reference handles
	 * More information: https://github.com/twigjs/twig.js/pull/301
	 */
	Twig.extend(function(Twig) {
		Twig.Templates.registerLoader('fractal', function(name, params) {
			params.data = viewCache[params.id];
			return new Twig.Template(params);
		});
	});

	/**
	 * Load and cache view contents
	 */
	function loadViews() {
		viewCache = {};
		for (let view of source.flattenDeep()) {
			viewCache[`@${view.alias}`] = view.content;
		}
	}

	/**
	 * Refresh cache on changes
	 */
	source.on('loaded', loadViews);
	source.on('changed', loadViews);

	return {
		engine: instance,
		render: function(path, str, context, meta) {

			if (!viewCache) { loadViews(); }

			let template = instance({
				method: 'fractal',
				name: `@${Path.parse(path).name}`,
				allowInlineIncludes: true,
				async: false
			});

			return Promise.resolve(template.render(context));

		}
	};

};
