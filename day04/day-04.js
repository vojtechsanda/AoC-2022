const fs = require('fs');

try {
  const dataDev = fs.readFileSync('input-test.txt', 'utf8');
  const linesDev = dataDev.split('\r\n');

  console.log('----  TESTING DATA  ----');
  testIt('Part 1', part1(linesDev), 2);
  testIt('Part 2', part2(linesDev), 4);

  console.log();

  const dataProd = fs.readFileSync('input.txt', 'utf8');
  const linesProd = dataProd.split('\r\n');

  console.log('---- PRODUCTION DATA ----');
  testIt('Part 1', part1(linesProd), 496);
  testIt('Part 2', part2(linesProd), 847);
} catch (err) {
  console.error(err);
}

function part1(lines) {
  let counter = 0;

  lines.forEach((line) => {
    const [[elve1min, elve1max], [elve2min, elve2max]] = line
      .split(',')
      .map((elve) => elve.split('-').map((strNum) => Number(strNum)));

    if (
      (elve1min <= elve2min && elve1max >= elve2max) ||
      (elve1min >= elve2min && elve1max <= elve2max)
    ) {
      counter++;
    }
  });

  return counter;
}

function part2(lines) {
  let counter = 0;

  lines.forEach((line) => {
    const [[elve1min, elve1max], [elve2min, elve2max]] = line
      .split(',')
      .map((elve) => elve.split('-').map((strNum) => Number(strNum)));

    if (
      (elve1min >= elve2min && elve1min <= elve2max) ||
      (elve1max >= elve2min && elve1max <= elve2max) ||
      (elve2max >= elve1min && elve2max <= elve1max) ||
      (elve2min >= elve1min && elve2min <= elve1max)
    ) {
      counter++;
    }
  });

  return counter;
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
