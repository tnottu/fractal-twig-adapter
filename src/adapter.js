'use strict';

const _ = require('lodash');
const Path = require('path');
const Twig = require('twig');
const Adapter = require('@frctl/fractal').Adapter;
const utils = require('@frctl/fractal').utils;

class TwigAdapter extends Adapter {

	constructor(source, app) {
		super(null, source);

		Twig.cache(false);

		this._app = app;
		this._partials = {};

		/**
		 * Custom loader for `@component` reference handles
		 * Reference: https://github.com/twigjs/twig.js/pull/301
		 * TODO: Check if this would be a better solution: https://github.com/twigjs/twig.js/issues/398
		 */
		Twig.extend((TwigExtend) => {
			TwigExtend.Templates.registerLoader('fractal', (name, params) => {
				if (params.id.indexOf('@') !== 0) {
					params.id = `@${Path.parse(params.id).name.replace(/^_/, '').replace(/^\d\d\-/, '')}`;
					console.log(params.id);
				}
				params.data = this._partials[params.id];
				return new TwigExtend.Template(params);
			});
		});

		this._engine = Twig;

	}

	render(tplPath, str, context, _meta) {
		const meta = _meta || {};

		setEnv('_self', meta.self, context);
		setEnv('_target', meta.target, context);
		setEnv('_env', meta.env, context);
		setEnv('_config', this._app.config(), context);

		_.each(this._views, (view) => {
			this._partials[view.handle] = view.content;
		});

		return new Promise((resolve) => {
			const handle = `@${Path.parse(tplPath).name.replace(/^_/, '').replace(/^\d\d\-/, '')}`;
			const template = Twig.twig({
				method: this._partials[handle] ? 'fractal' : undefined,
				name: this._partials[handle] ? `@${Path.parse(tplPath).name.replace(/^_/, '').replace(/^\d\d\-/, '')}` : undefined,
				path: this._partials[handle] ? undefined : tplPath,
				allowInlineIncludes: true,
				async: false
			});
			const html = template.render(context);
			resolve(html);
		});
	}

}

function setEnv(key, value, context) {
	if (_.isUndefined(context[key]) && !_.isUndefined(value)) {
		context[key] = value;
	}
}

module.exports = function(config) {

	config = config || {};

	return {
		register(source, app) {

			const adapter = new TwigAdapter(source, app);
			const Twig = adapter.engine;

			if (!config.pristine) {
				_.each(require('./filters')(app) || {}, function(fn, name) {
					Twig.extendFilter(name, fn);
				});
			}

			_.each(config.filters || {}, function(fn, name) {
				Twig.extendFilter(name, fn);
			});

			return adapter;
		}
	};
};
