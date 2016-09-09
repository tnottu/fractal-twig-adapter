'use strict';

const _ = require('lodash');
const utils = require('@frctl/fractal').utils;

module.exports = function(fractal) {
	return function(path) {
		const env = this.context._env;
		const request = env && env.request;
		const mountPath = fractal.web.get('static.mount');
		let _path;

		if (!env || env.server) {
			_path = path;
			_path = (mountPath) ? `/${mountPath}${_path}` : _path;
		} else {
			_path = utils.relUrlPath(path, _.get(request, 'path', '/'), fractal.web.get('builder.urls'));
		}

		return _path;
	};
};
