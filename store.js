'use strict';

const fs = require('fs');

let map;
let filePath;
let clean;

function init(jsonFilePath) {
    filePath = jsonFilePath;
    try {
        map = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    }
    catch (e) {
        map = {};
    }
    clean = false;
}

function get(key) {
    return new Promise((resolve, reject) => {
        return resolve(map[key] || {});
    });
}

function set(key, val) {
    return new Promise((resolve, reject) => {
        map[key] = val;
        clean = false;
        return resolve();
    });
}

function flush() {
    if (clean) return;
    clean = true;
    console.log('Flushing Key/Value Store');
    fs.writeFileSync(filePath, JSON.stringify(map));
}

module.exports = {
    init: init,
    get: get,
    set: set,
    flush: flush
};