const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomLengthArray = (array) => {
  return array.slice(Math.floor(Math.random() * array.length));
};
const getShuffledArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const getRandomMapElement = (map) => {
  let items = Array.from(map);
  return items[Math.floor(Math.random() * items.length)];
};
export {getRandomNumber, getRandomElement, getRandomLengthArray, getShuffledArray, getRandomMapElement};
