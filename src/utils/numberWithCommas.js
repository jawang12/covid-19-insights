export const numberWithCommas = (n) => {
  const numStr = n.toString();
  let output = numStr.slice(-3);
  let index = null;
  for (let i = numStr.length - 4; i >= 0; i -= 3) {
    // handles exception of first thousand
    if (!index) {
      output = numStr[i] + ',' + output;
    } else {
      output =
        numStr.slice(i, i + 1) + ',' + numStr.slice(i + 1, i + 3) + output;
    }
    // handles leftover numbers. if we reach i === 0, then there are none leftover
    index = i ? i : null;
  }
  if (index) {
    output = numStr.slice(0, index) + output;
  }
  return output;
};
