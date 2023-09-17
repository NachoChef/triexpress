"use strict";
// export default class Trie {}
class Trie {
    constructor(isEnd) {
        this.children = new Map();
        this.isEnd = false;
        this.isEnd = isEnd || false;
    }
    add(word) {
        const chars = [...word];
        Trie.addLetters(chars, this);
    }
    static addLetters(letters, currNode) {
        // add if missing
        if (!currNode.children.has(letters[0])) {
            currNode.children.set(letters[0], new Trie(letters.length === 1));
        }
        // thank you, next
        if (letters.length > 1) {
            this.addLetters(letters.slice(1), currNode.children.get(letters[0]));
        }
    }
}
