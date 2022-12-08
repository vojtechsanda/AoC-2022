const fs = require('fs');

try {
  const dataDev = fs.readFileSync('input-test.txt', 'utf8');
  const linesDev = dataDev.split('\r\n');

  console.log('----  TESTING DATA  ----');
  testIt('Part 1', part1([...linesDev]), 'CMZ');
  testIt('Part 2', part2([...linesDev]), 'MCD');

  console.log();

  const dataProd = fs.readFileSync('input.txt', 'utf8');
  const linesProd = dataProd.split('\r\n');

  console.log('---- PRODUCTION DATA ----');
  testIt('Part 1', part1([...linesProd]), 'FWSHSPJWM');
  testIt('Part 2', part2([...linesProd]), -Infinity);
} catch (err) {
  console.error(err);
}

function part1(lines) {
  const dividerIndex = lines.findIndex((line) => line === '');
  const config = lines.splice(0, dividerIndex + 1).slice(0, -2);
  const stacks = [];

  const regex = /(...) ?/gm;
  config.forEach((line) => {
    const containers = [];
    let container;
    while (([_, container] = regex.exec(line) ?? []).length) {
      containers.push(container);
    }

    containers.forEach((container, i) => {
      if (!stacks[i]) {
        stacks[i] = [];
      }
      if (container[1].trim()) {
        stacks[i].unshift(container[1]);
      }
    });
  });

  lines.forEach((line) => {
    const [quantity, from, to] = line
      .split(' ')
      .filter((_, index) => index % 2)
      .map((el) => Number(el));

    for (let i = 0; i < quantity; i++) {
      const item = stacks[from - 1].splice(-1, 1)[0];
      stacks[to - 1].push(item);
    }
  });

  return stacks.map((stack) => stack.splice(-1, 1)[0]).join('');
}

function part2(lines) {
  const dividerIndex = lines.findIndex((line) => line === '');
  const config = lines.splice(0, dividerIndex + 1).slice(0, -2);
  const stacks = [];

  const regex = /(...) ?/gm;
  config.forEach((line) => {
    const containers = [];
    let container;
    while (([_, container] = regex.exec(line) ?? []).length) {
      containers.push(container);
    }

    containers.forEach((container, i) => {
      if (!stacks[i]) {
        stacks[i] = [];
      }
      if (container[1].trim()) {
        stacks[i].unshift(container[1]);
      }
    });
  });

  lines.forEach((line) => {
    const [quantity, from, to] = line
      .split(' ')
      .filter((_, index) => index % 2)
      .map((el) => Number(el));

    const items = stacks[from - 1].splice(-1 * quantity);

    items.forEach((item) => {
      stacks[to - 1].push(item);
    });

    // console.log(line, [stacks[from - 1], stacks[to - 1]], quantity, from, to, items);
  });

  return stacks.map((stack) => stack.splice(-1, 1)[0]).join('');
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
