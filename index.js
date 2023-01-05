const utils = require('./_source/js/utils');

module.exports = {
    utils: utils,
    initForYuzuLoader: (config) => {
        config.renderedPartialDirs.push('./node_modules/yuzu-plugin-core/_templates/_dataStructures');
    },
    initForYuzuApi: (config) => {
        config.api.files.templates.push('./node_modules/yuzu-plugin-core/_templates');
    }
};