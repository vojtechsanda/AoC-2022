const fs = require('fs');

const [DEV_MODE, PROD_MODE] = [0, 1];
const MODE = PROD_MODE;

try {
  const data = fs.readFileSync(MODE === DEV_MODE ? 'input-test.txt' : 'input.txt', 'utf8');
  const lines = data.split('\r\n');

  console.log(`PART 1: ${part1(lines)}`);
  console.log(`PART 2: ${part2(lines)}`);
} catch (err) {
  console.error(err);
}

function part1(lines) {
  let maxElve = 0;
  let currentElve = 0;

  lines.forEach((item, index) => {
    if (item !== '') {
      currentElve += Number(item);
    }

    if (item === '' || index + 1 === lines.length) {
      if (currentElve > maxElve) {
        maxElve = currentElve;
      }
      currentElve = 0;
    }
  });

  return maxElve;
}

function part2(lines) {
  const topElves = [0, 0, 0];
  let currentElve = 0;

  lines.forEach((item, index) => {
    if (item !== '') {
      currentElve += Number(item);
    }

    if (item === '' || index + 1 === lines.length) {
      topElves.sort((a, b) => a - b);

      if (currentElve > topElves[0]) {
        topElves[0] = currentElve;
      }

      currentElve = 0;
    }
  });

  return topElves.reduce((acc, val) => acc + val, 0);
}
