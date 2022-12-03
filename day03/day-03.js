const fs = require('fs');

try {
  const dataDev = fs.readFileSync('input-test.txt', 'utf8');
  const linesDev = dataDev.split('\r\n');

  console.log('----  TESTING DATA  ----');
  testIt('Part 1', part1(linesDev), 157);
  testIt('Part 2', part2(linesDev), 70);

  console.log();

  const dataProd = fs.readFileSync('input.txt', 'utf8');
  const linesProd = dataProd.split('\r\n');

  console.log('---- PRODUCTION DATA ----');
  testIt('Part 1', part1(linesProd), 8233);
  testIt('Part 2', part2(linesProd), 2821);
} catch (err) {
  console.error(err);
}

function part1(lines) {
  let total = 0;

  lines.forEach((line) => {
    const itemsInCompartmentNum = line.length / 2;
    const first = line.slice(0, itemsInCompartmentNum);
    const second = line.slice(itemsInCompartmentNum);

    const firstCompartment = {};
    first.split('').forEach((letter) => (firstCompartment[letter] = true));
    const matchedItem = second.split('').find((letter) => firstCompartment[letter]);

    if (matchedItem >= 'a') {
      total += matchedItem.charCodeAt(0) - 96;
    } else {
      total += matchedItem.charCodeAt(0) - 38;
    }
  });

  return total;
}

function part2(lines) {
  let total = 0;
  const groupsNum = lines.length / 3;

  for (let i = 0; i < groupsNum; i++) {
    const groupItemsCount = {};

    for (let j = 0; j < 3; j++) {
      const line = lines[i * 3 + j];
      const splitLine = line.split('');

      for (let k = 0; k < splitLine.length; k++) {
        const letter = splitLine[k];
        if (!groupItemsCount[letter]) {
          groupItemsCount[letter] = [false, false, false];
        }
        groupItemsCount[letter][j] = true;

        if (groupItemsCount[letter].every((val) => val)) {
          total += getCharVal(letter);
          j = 3;
          break;
        }
      }
    }
  }

  return total;
}

function getCharVal(char) {
  if (char >= 'a') {
    return char.charCodeAt(0) - 96;
  } else {
    return char.charCodeAt(0) - 38;
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
