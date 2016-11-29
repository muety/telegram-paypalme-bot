'use strict';

const Telegram = require('telegram-node-bot')
    , fs = require('fs');

class PersistentMemoryStorage extends Telegram.BaseStorage {
    constructor(userStoragePath, chatStoragePath) {
        super();

        this.userStoragePath = userStoragePath;
        this.chatStoragePath = chatStoragePath;

        let userStorageFileContent;
        let chatStorageFileContent;

        try {
            JSON.parse(fs.readFileSync(userStoragePath, 'utf8'));
            JSON.parse(fs.readFileSync(chatStoragePath, 'utf8'));
        }
        catch (e) {
            userStorageFileContent = {};
            chatStorageFileContent = {};
        }

        this._storage = {
            userStorage: userStorageFileContent,
            chatStorage: chatStorageFileContent
        };
    }

    get(storage, key) {
        return new Promise((resolve) => {
            resolve(this._storage[storage][key] || {});
        });
    }

    set(storage, key, data) {
        return new Promise((resolve) => {
            this._storage[storage][key] = data;
            resolve();
        });
    }

    remove(storage, key) {
        return new Promise((resolve) => {
            delete this._storage[storage][key];
            resolve();
        });
    }

    flush() {
        fs.writeFileSync(this.userStoragePath, JSON.stringify(this._storage.userStorage));
        fs.writeFileSync(this.chatStoragePath, JSON.stringify(this._storage.chatStorage));
        setTimeout(() => {

        }, 1000);
    }
}

module.exports = PersistentMemoryStorage;