const fs = require('fs');

class File {
  constructor(size, name) {
    this._size = Number(size);
    this._name = name;
  }

  getName() {
    return this._name;
  }

  isDir() {
    return false;
  }

  isFile() {
    return true;
  }

  getSize() {
    return this._size;
  }
}

class Directory {
  constructor(name, parent = null, children = {}) {
    this._name = name;
    this._parent = parent;
    this._children = { ...children };
  }

  getName() {
    return this._name;
  }

  getParent() {
    return this._parent;
  }

  setParent(parent) {
    this._parent = parent;
  }

  getChild(childKey) {
    return this._children[childKey];
  }

  getChildren() {
    return this._children;
  }

  setChild(key, child) {
    this._children[key] = child;
  }

  isChild(key) {
    return this._children[key] !== undefined;
  }

  isDir() {
    return true;
  }

  isFile() {
    return false;
  }

  getSize() {
    let size = 0;
    Object.keys(this._children)
      .map((key) => this._children[key])
      .forEach((child) => {
        size += child.getSize();
      });
    return size;
  }

  getSumOfDirsToSize(size) {
    const myEligibleSize = this.getSize() <= size ? this.getSize() : 0;
    const childrenSize = Object.keys(this._children)
      .map((key) => this._children[key])
      .filter((child) => child.isDir())
      .map((dir) => dir.getSumOfDirsToSize(size))
      .reduce((partialSum, a) => partialSum + a, 0);

    return myEligibleSize + childrenSize;
  }

  getTheSmallestOverSize(size) {
    let minSize = this.getSize() >= size ? this.getSize() : Infinity;
    Object.keys(this._children)
      .map((key) => this._children[key])
      .filter((child) => child.isDir())
      .forEach((dir) => {
        const smallestDir = dir.getTheSmallestOverSize(size);
        if (smallestDir < minSize && smallestDir >= size) {
          minSize = smallestDir;
        }
      });
    return minSize;
  }
}

try {
  const dataDev = fs.readFileSync('input-test.txt', 'utf8');
  const linesDev = dataDev.split('\r\n');

  console.log('----  TESTING DATA  ----');
  testIt('Part 1', part1(linesDev), 95437);
  testIt('Part 2', part2(linesDev), 24933642);

  console.log();

  const dataProd = fs.readFileSync('input.txt', 'utf8');
  const linesProd = dataProd.split('\r\n');

  console.log('---- PRODUCTION DATA ----');
  testIt('Part 1', part1(linesProd), 1543140);
  testIt('Part 2[F]', part2(linesProd), 29493284, true);
  testIt('Part 2[F]', part2(linesProd), 6370, true);
  testIt('Part 2', part2(linesProd), 1117448);
} catch (err) {
  console.error(err);
}

function buildSystem(dangerousLines) {
  const lines = [...dangerousLines];
  const root = new Directory('/');
  let cwd = root;

  while (lines.length) {
    const line = lines.splice(0, 1)[0];
    const [_, command, arg] = line.split(' ');

    if (command === 'cd') {
      if (arg === '/') {
        cwd = root;
      } else if (arg === '..') {
        cwd = cwd.getParent();
      } else {
        cwd = cwd.getChild(arg);
      }
    } else if (command === 'ls') {
      let nextCommandIndex = lines.findIndex((line) => line.startsWith('$'));
      const dirContentLines =
        nextCommandIndex >= 0 ? lines.splice(0, nextCommandIndex) : lines.splice(0);

      dirContentLines.forEach((dirLine) => {
        const [el1, el2] = dirLine.split(' ');

        if (el1 === 'dir') {
          if (!cwd.getChild(el2)) {
            const newDir = new Directory(el2, cwd);
            newDir.setParent(cwd);
            cwd.setChild(el2, newDir);
          }
        } else {
          if (!cwd.getChild(el2)) {
            const newFile = new File(el1, el2);
            cwd.setChild(el2, newFile);
          }
        }
      });
    }
  }

  return root;
}

function part1(lines) {
  const root = buildSystem(lines);
  return root.getSumOfDirsToSize(100000);
}

function part2(lines) {
  const root = buildSystem(lines);

  return root.getTheSmallestOverSize(30000000 - (70000000 - root.getSize()));
}

function testIt(testName, actual, expected, negate = false) {
  const passed = negate ? expected !== actual : expected === actual;
  const testStatusText = `[${passed ? 'PASSED' : 'FAILED'}]`;
  console.log(
    passed ? '\x1b[32m%s\x1b[0m' : '\x1b[31m%s\x1b[0m',
    testStatusText,
    `${testName} is${negate ? ' NOT' : ''} \`${actual}\`${
      !passed ? ` and should${negate ? ' NOT' : ''} be \`${expected}\`` : ''
    }`
  );
}
