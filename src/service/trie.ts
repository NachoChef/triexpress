// export default class Trie {}

class Node {
  letter: string;
  isEnd: boolean;
  children: Map<string, Node>;

  private readonly LIMIT: number = 10;

  constructor(letter: string, isEnd: boolean) {
    this.letter = letter;
    this.isEnd = isEnd;
    this.children = new Map();
  }
}
export default class Trie {
  root: Node;

  constructor() {
    this.root = new Node('', false);
  }

  public add(word: string) {
    if (!word || word.length === 0) {
      return;
    }
    const chars = [...word];
    this.addLetters(chars, this.root);
  }

  public find(prefix: string): string[] {
    if (!prefix || prefix.length === 0) {
      return [];
    }
    const chars = [...prefix];
    return this.findLetters(chars, this.root);
  }

  addLetters(letters: string[], currNode: Node): void {
    // add if missing
    if (!currNode.children.has(letters[0])) {
      currNode.children.set(
        letters[0],
        new Node(letters[0], letters.length === 1)
      );
    }

    // thank you, next
    if (letters.length > 1) {
      this.addLetters(letters.slice(1), currNode.children.get(letters[0])!);
    }
  }

  findLetters(letters: string[], currNode: Node): string[] {
    const res: string[] = [];

    // traverse to the end of whatever portion of the tree contains the prefix
    const nextNode = this.traverseTo(letters, currNode);

    if (nextNode.isEnd) {
      res.push([...letters].join(''));
    }

    // now follow each branch and add to return array if isEnd
    const queue = [...nextNode.children.values()];
    if (nextNode.children) {
      while (queue.length > 0) {
        const currNode = queue.shift()!;
        if (currNode.isEnd) {
          res.push([...letters].join(''));
        }
        queue.push(...currNode.children.values());
      }
    }

    return res;
  }

  traverseTo(letters: string[], currNode: Node): Node {
    if (!letters || letters.length === 0) {
      return currNode;
    }

    return this.traverseTo(
      letters.slice(1),
      currNode.children.get(letters[0])!
    );
  }

  public findAllWords(currNode: Node): string[] {
    const res: string[] = [];

    res.push(currNode.letter);

    // end condition
    if (currNode.isEnd) {
      return res;
    }

    for (const child of currNode.children.values()) {
      res.push(...this.findAllWords(child));
    }

    console.log(res);

    return res;
  }
}
