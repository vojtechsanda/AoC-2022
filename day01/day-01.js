const fs = require('fs');

try {
  const dataDev = fs.readFileSync('input-test.txt', 'utf8');
  const linesDev = dataDev.split('\r\n');

  console.log('----  TESTING DATA  ----');
  testIt('Part 1', part1(linesDev), 24000);
  testIt('Part 2', part2(linesDev), 45000);

  console.log();

  const dataProd = fs.readFileSync('input.txt', 'utf8');
  const linesProd = dataProd.split('\r\n');

  console.log('---- PRODUCTION DATA ----');
  testIt('Part 1', part1(linesProd), 71300);
  testIt('Part 2', part2(linesProd), 209691);
} catch (err) {
  console.error(err);
}

function part1(lines) {
  let maxElve = 0;
  let currentElve = 0;

  lines.forEach((item, index) => {
    if (item !== '') {
      currentElve += Number(item);
      return;
    }

    if (currentElve > maxElve) {
      maxElve = currentElve;
    }
    currentElve = 0;
  });

  return maxElve;
}

function part2(lines) {
  const topElves = [0, 0, 0];
  let currentElve = 0;

  lines.forEach((item) => {
    if (item !== '') {
      currentElve += Number(item);
      return;
    }

    const minElveIndex = getMinIndex(topElves);
    if (currentElve > topElves[minElveIndex]) {
      topElves[minElveIndex] = currentElve;
    }
    currentElve = 0;
  });

  return topElves.reduce((acc, val) => acc + val, 0);
}

function getMinIndex(arr) {
  let minIndex = -1;
  let minItem = Infinity;

  arr.forEach((item, index) => {
    if (item < minItem) {
      minItem = item;
      minIndex = index;
    }
  });

  return minIndex;
}

function testIt(testName, expected, actual) {
  const passed = expected === actual;
  const testStatusText = `[${passed ? 'PASS' : 'FAIL'}]`;
  console.log(
    passed ? '\x1b[32m%s\x1b[0m' : '\x1b[31m%s\x1b[0m',
    testStatusText,
    `${testName} is \`${actual}\`${!passed ? ` and should be \`${expected}\`` : ''}.`
  );
}
