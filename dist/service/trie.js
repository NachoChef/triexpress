"use strict";
// export default class Trie {}
class Trie {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
    add(word) {
        [...word].forEach((l, i) => {
            Trie.addLetter(l, i === word.length - 1, this);
        });
    }
    toString() {
        return JSON.stringify(this, null, 2);
    }
    static addLetter(letter, isEnd, currNode) {
        // add if missing
        if (!currNode.children[letter]) {
            currNode.children[letter] = new Trie();
        }
        // set values
        currNode.children[letter].isEnd = isEnd;
    }
}
