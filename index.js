const utils = require('./_dev/_source/js/utils');

module.exports = {
    utils: utils,
    initForYuzuLoader: (config) => {
        config.renderedPartialDirs.push('./node_modules/yuzu-plugin-core/_dev/_templates/_dataStructures');
    },
    initForYuzuApi: (config) => {
        config.api.files.templates.push('./node_modules/yuzu-plugin-core/_dev/_templates');
    }, 
    postInstallManageFiles: (fs, path, files) => {

        files.forEach((file) => {
            if(fs.existsSync('../../package.json')) {
                let destPath = path.dirname(file.dest);
                if(fs.existsSync(destPath) && fs.existsSync(file.dest)) {
                    console.log(`${file.dest} already installed, not overwriting`);
                    //we have to rename files that already exist, they are likely to clash if they still exist
                    if(fs.existsSync(file.source)) {
                        fs.renameSync(file.source, `${file.source}.bak`);
                    }
                }
                else if(!fs.existsSync(file.source))  {
                    console.log(`${file.source}, source doesn't exist`);
                }
                else {
                    console.log(`Installing file to ${file.dest}`);
                    if(!fs.existsSync(destPath)) {
                        fs.mkdirSync(destPath, { recursive: true })
                    }
                    fs.renameSync(file.source, file.dest);
                }
            }
        })

    }
};