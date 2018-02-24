const ghpages = require('gh-pages');
const fs = require('fs-extra');
const path = require('path');

const dir_page = 'gh-pages';

try {
    // Clear distination folder
    fs.removeSync(dir_page);

    // Copy js
    fs.copySync('dist', path.resolve(dir_page, 'dist'));
    // Copy index.html
    fs.copySync('index.html', path.resolve(dir_page, 'index.html'));

    ghpages.publish(dir_page, function(err) {
        console.log(err);
    });
} catch (err) {
    console.error(err);
}

