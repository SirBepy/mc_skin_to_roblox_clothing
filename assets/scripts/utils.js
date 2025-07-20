export function createMirroredImage(skinImg, srcX, srcY, srcW, srcH) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = srcW;
  tempCanvas.height = srcH;
  const tempCtx = tempCanvas.getContext('2d');

  tempCtx.translate(srcW, 0);
  tempCtx.scale(-1, 1);
  tempCtx.drawImage(skinImg, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

  return tempCanvas;
}

export function createFlippedImage(skinImg, srcX, srcY, srcW, srcH, flipAxis) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = srcW;
  tempCanvas.height = srcH;
  const tempCtx = tempCanvas.getContext('2d');

  if (flipAxis === 'x') {
    tempCtx.translate(srcW, 0);
    tempCtx.scale(-1, 1);
  } else if (flipAxis === 'y') {
    tempCtx.translate(0, srcH);
    tempCtx.scale(1, -1);
  }

  tempCtx.drawImage(skinImg, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);
  return tempCanvas;
}
