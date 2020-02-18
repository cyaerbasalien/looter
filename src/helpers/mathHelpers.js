import { combinations as choose } from 'mathjs';

function binomial(n, k, p) {
  return choose(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function chanceOfDrop(n, k, p) {
  let sum = 0;
  while (k <= n) {
    sum += binomial(n, k++, p);
  }
  return sum;
}

export { binomial, chanceOfDrop };
