import { config } from './config.js';
import { elements } from './ui.js';

export const canvases = {
  shirt: {
    src: 'images/Template_Shirt.png',
    canvas: null,
    ctx: null,
    template: new Image(),
    skinOnlyCanvas: document.createElement('canvas'),
  },
  pants: {
    src: 'images/Template_Pants.png',
    canvas: null,
    ctx: null,
    template: new Image(),
    skinOnlyCanvas: document.createElement('canvas'),
  },
};

export function initCanvases() {
  canvases.shirt.canvas = elements.shirtCanvas;
  canvases.pants.canvas = elements.pantsCanvas;

  Object.values(canvases).forEach((canvasObj) => {
    canvasObj.canvas.width = config.templates.width;
    canvasObj.canvas.height = config.templates.height;
    canvasObj.ctx = canvasObj.canvas.getContext('2d');
    canvasObj.ctx.imageSmoothingEnabled = false;

    canvasObj.skinOnlyCanvas.width = config.templates.width;
    canvasObj.skinOnlyCanvas.height = config.templates.height;
    canvasObj.skinOnlyCtx = canvasObj.skinOnlyCanvas.getContext('2d');
    canvasObj.skinOnlyCtx.imageSmoothingEnabled = false;
  });
}

export function loadTemplates() {
  Object.values(canvases).forEach((canvasObj) => {
    canvasObj.template.src = canvasObj.src;
    canvasObj.template.onload = function () {
      drawTemplate(canvasObj);
    };
  });
}

export function drawTemplate(canvasObj, skinConfig = null) {
  const ctx = canvasObj.ctx;
  const garmentType = canvasObj === canvases.shirt ? 'shirt' : 'pants';
  const garmentConfig = skinConfig ? skinConfig.garments[garmentType] : null;

  ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
  ctx.drawImage(canvasObj.template, 0, 0);

  if (garmentConfig) addLabels(ctx, garmentConfig);

  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, garmentType === 'shirt' ? 172 : 372);
  ctx.lineTo(585, garmentType === 'shirt' ? 172 : 372);
  ctx.stroke();

  canvasObj.skinOnlyCtx.clearRect(0, 0, canvasObj.skinOnlyCanvas.width, canvasObj.skinOnlyCanvas.height);
}

export function addLabels(ctx, garmentConfig) {
  if (!window.debugMode) return;
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';

  Object.values(garmentConfig.regions).forEach((region) => {
    const { x, y, w, h } = region.drawRegion;
    const centerX = x + w / 2;
    const centerY = y + h / 2;
    ctx.fillText(region.label, centerX, centerY + 10);
  });
}
