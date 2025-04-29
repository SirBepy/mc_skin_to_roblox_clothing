const config = {
  templates: {
    width: 585,
    height: 559,
  },
  minecraft: {
    width: 64,
    height: 64,
  },
  garments: {
    shirt: {
      regions: {
        up: {
          label: 'UP',
          drawRegion: { x: 231, y: 8, w: 128, h: 64 },
          skinMap: { x: 20, y: 16, w: 8, h: 4 },
        },
        right: {
          label: 'R',
          drawRegion: { x: 165, y: 74, w: 64, h: 128 },
          skinMap: { x: 16, y: 20, w: 4, h: 12 },
        },
        front: {
          label: 'FRONT',
          drawRegion: { x: 231, y: 74, w: 128, h: 128 },
          skinMap: { x: 20, y: 20, w: 8, h: 12 },
        },
        left: {
          label: 'L',
          drawRegion: { x: 361, y: 74, w: 64, h: 128 },
          skinMap: { x: 28, y: 20, w: 4, h: 12 },
        },
        back: {
          label: 'BACK',
          drawRegion: { x: 427, y: 74, w: 128, h: 128 },
          skinMap: { x: 32, y: 20, w: 8, h: 12 },
        },
        down: {
          label: 'DOWN',
          drawRegion: { x: 231, y: 204, w: 128, h: 64 },
          skinMap: { x: 28, y: 16, w: 8, h: 4 },
        },

        right_arm_l: {
          label: 'RL',
          drawRegion: { x: 19, y: 355, w: 64, h: 128 },
          skinMap: { x: 40, y: 20, w: 4, h: 12 },
        },
        right_arm_b: {
          label: 'RB',
          drawRegion: { x: 85, y: 355, w: 64, h: 128 },
          skinMap: { x: 44, y: 20, w: 4, h: 12 },
        },
        right_arm_r: {
          label: 'RR',
          drawRegion: { x: 151, y: 355, w: 64, h: 128 },
          skinMap: { x: 48, y: 20, w: 4, h: 12 },
        },
        right_arm_f: {
          label: 'RF',
          drawRegion: { x: 217, y: 355, w: 64, h: 128 },
          skinMap: { x: 52, y: 20, w: 4, h: 12 },
        },
        right_arm_u: {
          label: 'RU',
          drawRegion: { x: 217, y: 289, w: 64, h: 64 },
          skinMap: { x: 44, y: 16, w: 4, h: 4 },
        },
        right_arm_d: {
          label: 'RD',
          drawRegion: { x: 217, y: 485, w: 64, h: 64 },
          skinMap: { x: 48, y: 16, w: 4, h: 4 },
        },

        left_arm_l: {
          label: 'LL',
          drawRegion: { x: 308, y: 355, w: 64, h: 128 },
          skinMap: { x: 32, y: 52, w: 4, h: 12 },
          mirrorFrom: 'right_arm_l',
        },
        left_arm_b: {
          label: 'LB',
          drawRegion: { x: 374, y: 355, w: 64, h: 128 },
          skinMap: { x: 36, y: 52, w: 4, h: 12 },
          mirrorFrom: 'right_arm_b',
        },
        left_arm_r: {
          label: 'LR',
          drawRegion: { x: 440, y: 355, w: 64, h: 128 },
          skinMap: { x: 40, y: 52, w: 4, h: 12 },
          mirrorFrom: 'right_arm_r',
        },
        left_arm_f: {
          label: 'LF',
          drawRegion: { x: 506, y: 355, w: 64, h: 128 },
          skinMap: { x: 44, y: 52, w: 4, h: 12 },
          mirrorFrom: 'right_arm_f',
        },
        left_arm_u: {
          label: 'LU',
          drawRegion: { x: 308, y: 289, w: 64, h: 64 },
          skinMap: { x: 36, y: 48, w: 4, h: 4 },
          mirrorFrom: 'right_arm_u',
        },
        left_arm_d: {
          label: 'LD',
          drawRegion: { x: 308, y: 485, w: 64, h: 64 },
          skinMap: { x: 40, y: 48, w: 4, h: 4 },
          mirrorFrom: 'right_arm_d',
        },
      },
    },
    pants: {
      regions: {
        right_leg_l: {
          label: 'RL',
          drawRegion: { x: 19, y: 355, w: 64, h: 128 },
          skinMap: { x: 0, y: 20, w: 4, h: 12 },
        },
        right_leg_b: {
          label: 'RB',
          drawRegion: { x: 85, y: 355, w: 64, h: 128 },
          skinMap: { x: 4, y: 20, w: 4, h: 12 },
        },
        right_leg_r: {
          label: 'RR',
          drawRegion: { x: 151, y: 355, w: 64, h: 128 },
          skinMap: { x: 8, y: 20, w: 4, h: 12 },
        },
        right_leg_f: {
          label: 'RF',
          drawRegion: { x: 217, y: 355, w: 64, h: 128 },
          skinMap: { x: 12, y: 20, w: 4, h: 12 },
        },
        right_leg_u: {
          label: 'RU',
          drawRegion: { x: 217, y: 289, w: 64, h: 64 },
          skinMap: { x: 4, y: 16, w: 4, h: 4 },
        },
        right_leg_d: {
          label: 'RD',
          drawRegion: { x: 217, y: 485, w: 64, h: 64 },
          skinMap: { x: 8, y: 16, w: 4, h: 4 },
        },

        left_leg_l: {
          label: 'LL',
          drawRegion: { x: 308, y: 355, w: 64, h: 128 },
          skinMap: { x: 16, y: 52, w: 4, h: 12 },
          mirrorFrom: 'right_leg_l',
        },
        left_leg_b: {
          label: 'LB',
          drawRegion: { x: 374, y: 355, w: 64, h: 128 },
          skinMap: { x: 20, y: 52, w: 4, h: 12 },
          mirrorFrom: 'right_leg_b',
        },
        left_leg_r: {
          label: 'LR',
          drawRegion: { x: 440, y: 355, w: 64, h: 128 },
          skinMap: { x: 24, y: 52, w: 4, h: 12 },
          mirrorFrom: 'right_leg_r',
        },
        left_leg_f: {
          label: 'LF',
          drawRegion: { x: 506, y: 355, w: 64, h: 128 },
          skinMap: { x: 28, y: 52, w: 4, h: 12 },
          mirrorFrom: 'right_leg_f',
        },
        left_leg_u: {
          label: 'LU',
          drawRegion: { x: 308, y: 289, w: 64, h: 64 },
          skinMap: { x: 20, y: 48, w: 4, h: 4 },
          mirrorFrom: 'right_leg_u',
        },
        left_leg_d: {
          label: 'LD',
          drawRegion: { x: 308, y: 485, w: 64, h: 64 },
          skinMap: { x: 24, y: 48, w: 4, h: 4 },
          mirrorFrom: 'right_leg_d',
        },
      },
    },
  },
};

const elements = {
  fileInput: document.getElementById('fileInput'),
  uploadBtn: document.getElementById('uploadBtn'),
  shirtCanvas: document.getElementById('shirtCanvas'),
  pantsCanvas: document.getElementById('pantsCanvas'),
  downloadShirtBtn: document.getElementById('downloadShirtBtn'),
  downloadPantsBtn: document.getElementById('downloadPantsBtn'),
  originalPreview: document.getElementById('original-preview'),
  previewSection: document.getElementById('preview-section'),
  spinner: document.getElementById('spinner'),
  errorMessage: document.getElementById('error-message'),
  outputContainer: document.getElementById('output-container'),
};

const canvases = {
  shirt: {
    src: '/Template_Shirt.png',
    canvas: elements.shirtCanvas,
    ctx: null,
    template: new Image(),
  },
  pants: {
    src: '/Template_Pants.png',
    canvas: elements.pantsCanvas,
    ctx: null,
    template: new Image(),
  },
};

function initCanvases() {
  Object.values(canvases).forEach((canvasObj) => {
    canvasObj.canvas.width = config.templates.width;
    canvasObj.canvas.height = config.templates.height;

    canvasObj.ctx = canvasObj.canvas.getContext('2d');
    canvasObj.ctx.imageSmoothingEnabled = false;
  });
}

function loadTemplates() {
  Object.values(canvases).forEach((canvasObj) => {
    canvasObj.template.src = canvasObj.src;
    canvasObj.template.onload = function () {
      drawTemplate(canvasObj);
    };
  });
}

function drawTemplate(canvasObj) {
  const ctx = canvasObj.ctx;
  const garmentType = canvasObj === canvases.shirt ? 'shirt' : 'pants';
  const garmentConfig = config.garments[garmentType];

  ctx.drawImage(canvasObj.template, 0, 0);

  addLabels(ctx, garmentConfig);

  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, garmentType === 'shirt' ? 172 : 372);
  ctx.lineTo(585, garmentType === 'shirt' ? 172 : 372);
  ctx.stroke();
}

function addLabels(ctx, garmentConfig) {
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

function checkForNewSkinFormat(skinImg) {
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

function createMirroredImage(skinImg, srcX, srcY, srcW, srcH) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = srcW;
  tempCanvas.height = srcH;
  const tempCtx = tempCanvas.getContext('2d');

  tempCtx.translate(srcW, 0);
  tempCtx.scale(-1, 1);
  tempCtx.drawImage(skinImg, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

  return tempCanvas;
}

function processMinecraftSkin(skinImg) {
  const hasNewFormat = checkForNewSkinFormat(skinImg);

  Object.entries(canvases).forEach(([garmentType, canvasObj]) => {
    drawTemplate(canvasObj);

    createGarmentTemplate(skinImg, garmentType, hasNewFormat, canvasObj.ctx);

    addLabels(canvasObj.ctx, config.garments[garmentType]);
  });
}

function drawSkinRegion(ctx, skinImg, region, hasNewFormat, allRegions) {
  const { drawRegion, skinMap, mirrorFrom } = region;

  if (!hasNewFormat && mirrorFrom) {
    const mirrorRegion = allRegions[mirrorFrom];
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
    if (!hasNewFormat && !region.mirrorFrom) return;

    drawSkinRegion(ctx, skinImg, region, hasNewFormat, regions);
  });
}

function setupEventListeners() {
  elements.uploadBtn.addEventListener('click', function () {
    elements.fileInput.click();
  });

  elements.fileInput.addEventListener('change', function () {
    if (elements.fileInput.files && elements.fileInput.files[0]) {
      const file = elements.fileInput.files[0];

      if (file.type !== 'image/png') {
        showError('Please upload a PNG file');
        return;
      }

      showSpinner();
      elements.errorMessage.style.display = 'none';

      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          if (img.width !== config.minecraft.width || img.height !== config.minecraft.height) {
            showError("The file doesn't appear to be a valid Minecraft skin.<br>Expected size: 64x64 pixels");
            hideSpinner();
            return;
          }

          elements.originalPreview.src = e.target.result;
          elements.previewSection.style.display = 'block';

          processMinecraftSkin(img);

          hideSpinner();
          elements.outputContainer.style.display = 'block';
        };

        img.onerror = function () {
          showError('Error loading the image');
          hideSpinner();
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });

  elements.downloadShirtBtn.addEventListener('click', () => downloadCanvas('roblox_shirt.png', canvases.shirt.canvas));
  elements.downloadPantsBtn.addEventListener('click', () => downloadCanvas('roblox_pants.png', canvases.pants.canvas));
}

function downloadCanvas(filename, canvas) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function showSpinner() {
  elements.spinner.style.display = 'block';
}

function hideSpinner() {
  elements.spinner.style.display = 'none';
}

function showError(message) {
  elements.errorMessage.innerHTML = message;
  elements.errorMessage.style.display = 'block';
}

function init() {
  initCanvases();
  loadTemplates();
  setupEventListeners();
}

init();
