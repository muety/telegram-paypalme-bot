'use strict';

const fs = require('fs');

let map;
let filePath;

function init(jsonFilePath) {
    filePath = jsonFilePath;
    try {
        map = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    }
    catch (e) {
        map = {};
    }
}

function get(key) {
    return new Promise((resolve, reject) => {
        return resolve(map[key] || null);
    });
}

function set(key, val) {
    return new Promise((resolve, reject) => {
        map[key] = val;
        return resolve();
    });
}

function flush() {
    console.log('Flushing Key/Value Store');
    fs.writeFileSync(filePath, JSON.stringify(map));
}

module.exports = {
    init: init,
    get: get,
    set: set,
    flush: flush
};