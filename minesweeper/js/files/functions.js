export function initDOM(baseObject, domElement) {
  const keys = Object.keys(baseObject);

  if (keys) {
    const keysLength = keys.length;
    if (keysLength > 1) {
      for (let i = 1; i < keysLength; i += 1) {
        const key = keys[i];
        const objectElement = baseObject[key];
        domElement.append(objectElement.component);

        initDOM(objectElement, objectElement.component);
      }
    }
  }
}

export function randomIndex(base) {
  return Math.floor(Math.random() * Math.floor(base));
}
