'use strict';

const _ = require('lodash');
const utils = require('@frctl/fractal').utils;

module.exports = function(fractal) {
	return function(path) {
		const env = this.context._env;
		const request = env && env.request;

		return (!env || env.server) ? path : utils.relUrlPath(path, _.get(request, 'path', '/'), fractal.web.get('builder.urls'));
	};
};
