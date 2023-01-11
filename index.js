const utils = require('./_dev/_source/js/utils');

module.exports = {
    utils: utils,
    initForYuzuLoader: (config) => {
        config.renderedPartialDirs.splice(0, 0, './node_modules/yuzu-plugin-core/_dev/_templates/_dataStructures');
    },
    initForYuzuApi: (config) => {
        config.api.files.templates.splice(0, 0, './node_modules/yuzu-plugin-core/_dev/_templates');
    }
};