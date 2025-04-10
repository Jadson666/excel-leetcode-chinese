function getPrefixMatchTable(pattern) {
  const match = [0];
  let prefixIndex = 0, suffixIndex = 1;
  while (suffixIndex < pattern.length) {
    if (pattern[suffixIndex] === pattern[prefixIndex]) {
      match[suffixIndex] = prefixIndex + 1; // 匹配成功，更新最大匹配數量
      prefixIndex++; 
      suffixIndex++;
    } else if (prefixIndex === 0) { // 沒找到 prefix-suffix 對子。第一個字元都不匹配
      match[suffixIndex] = 0;
      suffixIndex++;
    } else {
      prefixIndex = match[prefixIndex - 1]; // 比較長的對子繼續往下匹配失敗了，退回到短一截的 prefix-suffix 對子
    }
  }
  return match;
}

function kmp(str, pattern) {
  const lps = getPrefixMatchTable(pattern);

  let i = 0, j = 0;
  while (i < str.length) {
    if (str[i] === pattern[j]) {
        i++;
        j++;
    } else {
        if (j === 0) {
            i++;
        } else {
            j = lps[j - 1];
        }
    }
    if (j === pattern.length) return i - pattern.length;
  }
  return -1;
}

console.log(kmp('aaabbc', 'aab')); // 1, compare success on index 1
console.log(kmp('abcabc', 'abc')); // 0, compare success on index 0
