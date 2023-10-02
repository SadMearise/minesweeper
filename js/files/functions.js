export function randomIndex(base) {
  return Math.floor(Math.random() * Math.floor(base));
}

export function convertPositionToArr(position) {
  const positionArray = position.split('-');
  const x = Number(positionArray[0]);
  const y = Number(positionArray[positionArray.length - 1]);

  return [x, y];
}
