import { config } from './config.js';
import { canvases, drawTemplate, addLabels } from './canvas.js';
import { createMirroredImage, createFlippedImage } from './utils.js';

export function checkForNewSkinFormat(skinImg) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = config.minecraft.width;
  tempCanvas.height = config.minecraft.height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(skinImg, 0, 0);

  const imageData = tempCtx.getImageData(16, 48, 16, 16);
  const data = imageData.data;

  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) {
      return true; // New format skin
    }
  }

  return false; // Old format skin
}

export function processMinecraftSkin(skinImg) {
  const hasNewFormat = checkForNewSkinFormat(skinImg);

  Object.entries(canvases).forEach(([garmentType, canvasObj]) => {
    drawTemplate(canvasObj);

    createGarmentTemplate(skinImg, garmentType, hasNewFormat, canvasObj.ctx);
    createGarmentTemplate(skinImg, garmentType, hasNewFormat, canvasObj.skinOnlyCtx);

    addLabels(canvasObj.ctx, config.garments[garmentType]);
  });
}

function drawSkinRegion(ctx, skinImg, region, hasNewFormat, allRegions) {
  const { drawRegion, skinMap, mirrorFromIfOld, flipAxis } = region;

  if (!hasNewFormat && mirrorFromIfOld) {
    const mirrorRegion = allRegions[mirrorFromIfOld];
    const mirrorSkinMap = mirrorRegion.skinMap;

    const mirroredCanvas = createMirroredImage(
      skinImg,
      mirrorSkinMap.x,
      mirrorSkinMap.y,
      mirrorSkinMap.w,
      mirrorSkinMap.h
    );

    ctx.drawImage(
      mirroredCanvas,
      0,
      0,
      mirrorSkinMap.w,
      mirrorSkinMap.h,
      drawRegion.x,
      drawRegion.y,
      drawRegion.w,
      drawRegion.h
    );
  } else if (flipAxis) {
    const flippedCanvas = createFlippedImage(skinImg, skinMap.x, skinMap.y, skinMap.w, skinMap.h, flipAxis);

    ctx.drawImage(flippedCanvas, 0, 0, skinMap.w, skinMap.h, drawRegion.x, drawRegion.y, drawRegion.w, drawRegion.h);
  } else {
    ctx.drawImage(
      skinImg,
      skinMap.x,
      skinMap.y,
      skinMap.w,
      skinMap.h,
      drawRegion.x,
      drawRegion.y,
      drawRegion.w,
      drawRegion.h
    );
  }
}

function createGarmentTemplate(skinImg, garmentType, hasNewFormat, ctx) {
  const garmentConfig = config.garments[garmentType];
  const regions = garmentConfig.regions;

  Object.entries(regions).forEach(([regionName, region]) => {
    if (!hasNewFormat && !region.mirrorFromIfOld) return;

    drawSkinRegion(ctx, skinImg, region, hasNewFormat, regions);
  });
}
