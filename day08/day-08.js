const fs = require('fs');

try {
  const dataDev = fs.readFileSync('input-test.txt', 'utf8');
  const linesDev = dataDev.split('\r\n');

  console.log('----  TESTING DATA  ----');
  testIt('Part 1', part1(linesDev), 21);
  testIt('Part 2', part2(linesDev), 8);

  console.log();

  const dataProd = fs.readFileSync('input.txt', 'utf8');
  const linesProd = dataProd.split('\r\n');

  console.log('---- PRODUCTION DATA ----');
  testIt('Part 1', part1(linesProd), 1803);
  testIt('Part 2', part2(linesProd), 268912);
} catch (err) {
  console.error(err);
}

function part1(lines) {
  const trees = lines.map((line) => line.split(''));

  const isVisible = (x, y) => {
    const theTree = trees[y][x];
    // Edge
    if (x === 0 || y === 0 || x === trees[0].length - 1 || y === trees.length - 1) return true;

    // Up
    let topHid = false;
    for (let i = 0; i < y; i++) {
      if (trees[i][x] >= theTree) {
        topHid = true;
        break;
      }
    }

    // Down
    let downHid = false;
    for (let i = y + 1; i < trees.length; i++) {
      if (trees[i][x] >= theTree) {
        downHid = true;
        break;
      }
    }

    // Left
    let leftHid = false;
    for (let i = 0; i < x; i++) {
      if (trees[y][i] >= theTree) {
        leftHid = true;
        break;
      }
    }

    // Right
    let rightHid = false;
    for (let i = x + 1; i < trees[y].length; i++) {
      if (trees[y][i] >= theTree) {
        rightHid = true;
        break;
      }
    }

    return !topHid || !downHid || !leftHid || !rightHid;
  };

  let counter = 0;
  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
      if (isVisible(j, i)) {
        counter++;
      }
    }
  }
  return counter;
}

function part2(lines) {
  const trees = lines.map((line) => line.split(''));

  const getScore = (x, y) => {
    const theTree = trees[y][x];
    let counter = 1;

    // Up
    let topCounter = 0;
    for (let i = y - 1; i >= 0; i--) {
      topCounter++;
      if (trees[i][x] >= theTree) {
        break;
      }
    }
    counter *= topCounter;

    // Down
    let downCounter = 0;
    for (let i = y + 1; i < trees.length; i++) {
      downCounter++;
      if (trees[i][x] >= theTree) {
        break;
      }
    }
    counter *= downCounter;

    // Left
    let leftCounter = 0;
    for (let i = x - 1; i >= 0; i--) {
      leftCounter++;
      if (trees[y][i] >= theTree) {
        break;
      }
    }
    counter *= leftCounter;

    // Right
    let rightCounter = 0;
    for (let i = x + 1; i < trees[y].length; i++) {
      rightCounter++;
      if (trees[y][i] >= theTree) {
        break;
      }
    }
    counter *= rightCounter;

    return counter;
  };

  let maxScore = 0;
  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
      if (getScore(j, i) > maxScore) {
        maxScore = getScore(j, i);
      }
    }
  }
  return maxScore;
}

function testIt(testName, actual, expected) {
  const passed = expected === actual;
  const testStatusText = `[${passed ? 'PASS' : 'FAIL'}]`;
  console.log(
    passed ? '\x1b[32m%s\x1b[0m' : '\x1b[31m%s\x1b[0m',
    testStatusText,
    `${testName} is \`${actual}\`${!passed ? ` and should be \`${expected}\`` : ''}`
  );
}
