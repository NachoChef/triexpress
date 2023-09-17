// export default class Trie {}

class Trie {
  children: Map<string, Trie> = new Map();
  isEnd: boolean = false;

  constructor(isEnd?: boolean) {
    this.isEnd = isEnd || false;
  }

  public add(word: string) {
    const chars = [...word];
    Trie.addLetters(chars, this);
  }

  static addLetters(letters: string[], currNode: Trie): void {
    // add if missing
    if (!currNode.children.has(letters[0])) {
      currNode.children.set(letters[0], new Trie(letters.length === 1));
    }

    // thank you, next
    if (letters.length > 1) {
      this.addLetters(letters.slice(1), currNode.children.get(letters[0])!);
    }
  }
}
