const fs = require('fs');

try {
  const dataDev = fs.readFileSync('input-test.txt', 'utf8');
  const linesDev = dataDev.split('\r\n');

  console.log('----  TESTING DATA  ----');
  testIt('Part 1', part1(linesDev), 15);
  testIt('Part 2', part2(linesDev), 12);

  console.log();

  const dataProd = fs.readFileSync('input.txt', 'utf8');
  const linesProd = dataProd.split('\r\n');

  console.log('---- PRODUCTION DATA ----');
  testIt('Part 1', part1(linesProd), 13682);
  testIt('Part 2', part2(linesProd), 12881);
} catch (err) {
  console.error(err);
}

function part1(lines) {
  let total = 0;

  lines.forEach((line) => {
    const [oponentMove, myMove] = line.split(' ');
    const oponentMoveValue = oponentMove.charCodeAt(0) - 64;
    const myMoveValue = myMove.charCodeAt(0) - 23 - 64;
    const result = calcResult(oponentMoveValue, myMoveValue);

    if (result < 0) {
      total += 0;
    } else if (result > 0) {
      total += 6;
    } else {
      total += 3;
    }

    total += myMoveValue;
  });

  return total;
}

function calcNeededValue(move, result) {
  const res = {
    0: {
      1: 3,
      2: 1,
      3: 2,
    },
    3: {
      1: 1,
      2: 2,
      3: 3,
    },
    6: {
      1: 2,
      2: 3,
      3: 1,
    },
  };

  return res[result][move];
}

function calcResult(oponent, me) {
  if (oponent == 1 && me == 3) {
    return -1;
  } else if (oponent == 3 && me == 1) {
    return 1;
  }

  return me - oponent;
}

function part2(lines) {
  let total = 0;

  lines.forEach((line) => {
    const [oponentMove, result] = line.split(' ');
    const oponentMoveValue = oponentMove.charCodeAt(0) - 64;
    const resultValue = result === 'X' ? 0 : result === 'Y' ? 3 : 6;
    const meValue = calcNeededValue(oponentMoveValue, resultValue);

    total += meValue;
    total += resultValue;
  });

  return total;
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
