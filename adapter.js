'use strict';

const twig = require('twig');

module.exports = function(source, config){

    let instance = twig;

    return {
        engine: instance,
        render: function(path, str, context, meta){
            let template = instance({ data: str });
            return Promise.resolve(template.render(context));
        }
    }
};
