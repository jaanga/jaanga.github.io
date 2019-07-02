var n = 1;
var end_value = 10**7;
search: while (n <= end_value) {
  n++;
  for (var i = 2; i <= Math.sqrt(n); i++)
    if (n % i == 0)
      continue search;
  // found a prime!
  postMessage(n);
}