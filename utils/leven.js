const range = (start, end) => {
  if (start > end) return [];
  return [start, ...range(start + 1, end)];
};

const min = (...nums) => nums.reduce((a, b) => (a < b ? a : b));

const levenshtein = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = range(0, b.length + 1)
    .map((x) => [x])
    .concat(
      range(1, a.length + 1)
        .map((x) => [x])
        .map((x) => x.concat(range(1, b.length + 1).map((y) => 0))),
    );

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[b.length][a.length];
};

console.log(levenshtein('kitten', 'sitting')); // returns 3

const transformWord = (word1, word2) => {
  let steps = [];
  let matrix = [];
  for (let i = 0; i <= word2.length; i++) {
    matrix[i] = [i];
    for (let j = 0; j <= word1.length; j++) {
      if (!matrix[i]) matrix[i] = [];
      matrix[i][j] = 0;
    }
  }
  for (let i = 0; i <= word1.length; i++) {
    matrix[0][i] = i;
  }
  for (let i = 1; i <= word2.length; i++) {
    for (let j = 1; j <= word1.length; j++) {
      if (word2[i - 1] === word1[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
          matrix[i - 1][j - 1] + 1,
        );
        steps.push(`Replace ${word1[j - 1]} with ${word2[i - 1]}`);
      }
    }
  }
  return { distance: matrix[word2.length][word1.length], steps: steps };
};
console.log(transformWord('kitten', 'sitting'));
