import { canvases, drawTemplate, addLabels } from './canvas.js';
import { createMirroredImage, createFlippedImage } from './utils.js';

export function checkForNewSkinFormat(skinImg, skinConfig) {
  if (skinConfig.skinImageSize.height === 32) return false;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = skinConfig.skinImageSize.width;
  tempCanvas.height = skinConfig.skinImageSize.height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(skinImg, 0, 0);

  const imageData = tempCtx.getImageData(16, 48, 16, 16);
  const data = imageData.data;

  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) return true;
  }

  return false;
}

export function processMinecraftSkin(skinImg, skinConfig) {
  const hasNewFormat = checkForNewSkinFormat(skinImg, skinConfig);

  Object.entries(canvases).forEach(([garmentType, canvasObj]) => {
    drawTemplate(canvasObj, skinConfig);

    createGarmentTemplate(skinImg, garmentType, hasNewFormat, canvasObj.ctx, skinConfig);
    createGarmentTemplate(skinImg, garmentType, hasNewFormat, canvasObj.skinOnlyCtx, skinConfig);

    addLabels(canvasObj.ctx, skinConfig.garments[garmentType]);
  });
}

function drawSkinRegion(ctx, skinImg, region, hasNewFormat, allRegions) {
  const { drawRegion, skinMap, mirrorFromIfOld, flipAxis } = region;

  if (!skinMap && mirrorFromIfOld) {
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
  } else if (!hasNewFormat && mirrorFromIfOld) {
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
  } else if (flipAxis && skinMap) {
    const flippedCanvas = createFlippedImage(skinImg, skinMap.x, skinMap.y, skinMap.w, skinMap.h, flipAxis);

    ctx.drawImage(flippedCanvas, 0, 0, skinMap.w, skinMap.h, drawRegion.x, drawRegion.y, drawRegion.w, drawRegion.h);
  } else if (skinMap) {
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

function createGarmentTemplate(skinImg, garmentType, hasNewFormat, ctx, skinConfig) {
  const garmentConfig = skinConfig.garments[garmentType];
  const regions = garmentConfig.regions;

  Object.entries(regions).forEach(([regionName, region]) => {
    if (!hasNewFormat && !region.mirrorFromIfOld && !region.skinMap) return;

    drawSkinRegion(ctx, skinImg, region, hasNewFormat, regions);
  });
}
