//count the number of Characters in the given String and return the value
const countCharacters = (str) => {
  return str.length;
}

//count the number of vowels in the given String and return the value
const countVowels = (str) => {
  let n=0;
  for(let i=0; i<str.length; i++)
    if('aeiouAEIOU'.indexOf(str.charAt(i)) != -1) n++;
  return n;
}

//Check the existence of the given String in the Specified String and return the value
const checkExistenceOfStr = (str, checkStr) => {
  return str.indexOf(checkStr) != -1;
}

//replace a word and return the value
const replaceWord = (str, wordToBeReplaced, replaceWord) => {
  return str.replace(wordToBeReplaced, replaceWord);
}

//convert the specified string into Title Case and return the value
const titleCaseConversion = (str) => {
  return str.split(' ')
         .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
         .join(' ');
}


// find the largest word (in terms of length) in the specified string and return the value
const findLongestWord = (str) => {
  let vstr = str.split(' ');
  let i = vstr.reduce((n, s, idx, v) => {
                  if(v[n].length < s.length) n = idx;
                  return n;
               }, 0);
  return vstr[i];
}


module.exports = {
  countCharacters,
  countVowels,
  checkExistenceOfStr,
  replaceWord,
  titleCaseConversion,
  findLongestWord
}
