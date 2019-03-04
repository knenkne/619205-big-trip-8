const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomLengthArray = (array) => {
  return array.slice(Math.floor(Math.random() * array.length));
};
const getShuffledArray = (array) =>
  array
  .map((a) => [Math.random(), a])
  .sort((a, b) => a[0] - b[0])
  .map((a) => a[1]);
const getRandomMapElement = (map) => {
  let items = Array.from(map);
  return items[Math.floor(Math.random() * items.length)];
};
export {getRandomNumber, getRandomElement, getRandomLengthArray, getShuffledArray, getRandomMapElement};
