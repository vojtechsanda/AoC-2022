const fs = require('fs');

try {
  console.log('----  TESTING DATA  ----');
  const corrects = [5, 6, 10, 11];
  for (let i = 1; i <= 4; i++) {
    const dataDev = fs.readFileSync(`input-test-${i}.txt`, 'utf8');
    const linesDev = dataDev.split('\r\n');

    testIt(`Part 1[${i}]`, part1(linesDev), corrects[i - 1]);
  }

  const corrects2 = [undefined, undefined, undefined, undefined, 19, 23, 23, 29, 26];
  for (let i = 5; i <= 9; i++) {
    const dataDev = fs.readFileSync(`input-test-${i}.txt`, 'utf8');
    const linesDev = dataDev.split('\r\n');

    testIt(`Part 2[${i}]`, part2(linesDev), corrects2[i - 1]);
  }

  console.log();

  const dataProd = fs.readFileSync('input.txt', 'utf8');
  const linesProd = dataProd.split('\r\n');

  console.log('---- PRODUCTION DATA ----');
  testIt('Part 1', part1(linesProd), 1912);
  testIt('Part 2', part2(linesProd), 2122);
} catch (err) {
  console.error(err);
}

function part1(lines) {
  const line = lines[0];
  for (let i = 0; i < line.length; i++) {
    const uniq = {};
    line
      .slice(i, i + 4)
      .split('')
      .forEach((letter) => (uniq[letter] = true));
    if (Object.keys(uniq).length === 4) {
      return i + 4;
    }
  }
}

function part2(lines) {
  const line = lines[0];
  for (let i = 0; i < line.length; i++) {
    const uniq = {};
    line
      .slice(i, i + 14)
      .split('')
      .forEach((letter) => (uniq[letter] = true));
    if (Object.keys(uniq).length === 14) {
      return i + 14;
    }
  }
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
