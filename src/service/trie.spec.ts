import Trie from './trie';

let r: Trie;
beforeEach(() => {
  r = new Trie();
});

describe('trie', () => {
  it('default has no children', () => {
    expect(r.root.children.size).toBe(0);
  });

  it('add empty string', () => {
    r.add('');

    expect(r.root.children.size).toBe(0);
  });

  it('add single letter', () => {
    r.add('a');

    expect(r.root.children.size).toBe(1);
    expect(r.root.children.get('a')).toBeDefined();
    expect(r.root.children.get('a')!.isEnd).toBe(true);
  });

  it('add two letters', () => {
    r.add('ab');

    expect(r.root.children.size).toBe(1);
    expect(r.root.children.get('a')).toBeDefined();
    expect(r.root.children.get('a')!.isEnd).toBe(false);
    expect(r.root.children.get('a')!.children.size).toBe(1);
    expect(r.root.children.get('a')!.children.get('b')).toBeDefined();
    expect(r.root.children.get('a')!.children.get('b')!.isEnd).toBe(true);
  });

  it('add two similar words', () => {
    r.add('abs');
    r.add('abby');

    expect(r.root.children.size).toBe(1);
    expect(r.root.children.get('a')).toBeDefined();
    expect(r.root.children.get('a')!.isEnd).toBe(false);
    expect(r.root.children.get('a')!.children.size).toBe(1);
    expect(r.root.children.get('a')!.children.get('b')).toBeDefined();
    expect(r.root.children.get('a')!.children.get('b')!.isEnd).toBe(false);
    expect(r.root.children.get('a')!.children.get('b')!.children.size).toBe(2);
    expect(
      r.root.children.get('a')!.children.get('b')!.children.get('s')
    ).toBeDefined();
    expect(
      r.root.children.get('a')!.children.get('b')!.children.get('s')!.isEnd
    ).toBe(true);
    expect(
      r.root.children.get('a')!.children.get('b')!.children.get('b')
    ).toBeDefined();
    expect(
      r.root.children.get('a')!.children.get('b')!.children.get('b')!.isEnd
    ).toBe(false);
    expect(
      r.root.children
        .get('a')!
        .children.get('b')!
        .children.get('b')!
        .children.get('y')
    ).toBeDefined();
    expect(
      r.root.children
        .get('a')!
        .children.get('b')!
        .children.get('b')!
        .children.get('y')
    ).toBeDefined();
    expect(
      r.root.children
        .get('a')!
        .children.get('b')!
        .children.get('b')!
        .children.get('y')!.isEnd
    ).toBeTruthy();
  });

  it('find all words', () => {
    r.add('abs');
    r.add('abby');
    expect(r.findAllWords(r.root)).toEqual(['abs', 'abby']);
  });
});
