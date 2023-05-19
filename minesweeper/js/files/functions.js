export function initDOM(baseObject, target) {
  const keys = Object.keys(baseObject);
  if (keys) {
    const keysLength = keys.length;
    if (keysLength > 1 && keys.includes('component')) {
      for (let i = 1; i < keysLength; i += 1) {
        const key = keys[i];
        const objectElement = baseObject[key];

        target.append(objectElement.component);

        initDOM(objectElement, objectElement.component);
      }
    } else if (keysLength >= 1 && !keys.includes('component')) {
      for (let i = 0; i < keysLength; i += 1) {
        const key = keys[i];
        const objectElement = baseObject[key];

        target.append(objectElement.component);

        initDOM(objectElement, objectElement.component);
      }
    }
  }
}
// export function initDOM(baseObject, target) {
//   const keys = Object.keys(baseObject);
//   if (keys) {
//     const keysLength = keys.length;
//     if (keysLength > 1) {
//       for (let i = 1; i < keysLength; i += 1) {
//         const key = keys[i];
//         const objectElement = baseObject[key];

//         target.append(objectElement.component);

//         initDOM(objectElement, objectElement.component);
//       }
//     }
//   }
// }

export function randomIndex(base) {
  return Math.floor(Math.random() * Math.floor(base));
}

export function convertPositionToArr(position) {
  const positionArray = position.split('-');
  const x = Number(positionArray[0]);
  const y = Number(positionArray[positionArray.length - 1]);

  return [x, y];
}
