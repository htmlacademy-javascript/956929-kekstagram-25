function Random (a, b) {

  const down = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const up = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (up - down + 1) + up;

  return Math.floor(result);
}
