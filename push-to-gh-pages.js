const ghpages = require('gh-pages');
const fs = require('fs-extra');

try {
    // Clear distination folder
    fs.removeSync('gh-pages/');

    // Copy js
    fs.copySync('dist', 'gh-pages/dist');

    // Copy index.html
    fs.copySync('index.html', 'gh-pages/index.html')

    ghpages.publish('gh-pages', function(err) {
        console.log(err);
    });
} catch (err) {
    console.error(err);
}

