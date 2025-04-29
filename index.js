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
          skinMap: { x: 44, y: 20, w: 4, h: 12 },
        },
        front: {
          label: 'FRONT',
          drawRegion: { x: 231, y: 74, w: 128, h: 128 },
          skinMap: { x: 20, y: 20, w: 8, h: 12 },
        },
        left: {
          label: 'L',
          drawRegion: { x: 361, y: 74, w: 64, h: 128 },
          skinMap: { x: 36, y: 52, w: 4, h: 12 },
          needsNewFormat: true,
          mirrorFrom: 'right',
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
      },
      extraLabels: [],
    },
    pants: {
      regions: {
        rightUpperLeg: {
          label: 'U',
          drawRegion: { x: 214, y: 258, w: 65, h: 65 },
          skinMap: { x: 4, y: 16, w: 4, h: 4 },
        },
        leftUpperLeg: {
          label: 'U',
          drawRegion: { x: 307, y: 258, w: 65, h: 65 },
          skinMap: { x: 20, y: 48, w: 4, h: 4 },
          needsNewFormat: true,
          mirrorFrom: 'rightUpperLeg',
        },
        rightLegLeft: {
          label: 'L',
          drawRegion: { x: 14, y: 372, w: 65, h: 65 },
          skinMap: { x: 8, y: 20, w: 4, h: 12 },
        },
        rightLegBack: {
          label: 'B',
          drawRegion: { x: 107, y: 372, w: 65, h: 65 },
          skinMap: { x: 12, y: 20, w: 4, h: 12 },
        },
        rightLegRight: {
          label: 'R',
          drawRegion: { x: 200, y: 372, w: 65, h: 65 },
          skinMap: { x: 0, y: 20, w: 4, h: 12 },
        },
        rightLegFront: {
          label: 'F',
          drawRegion: { x: 293, y: 372, w: 65, h: 65 },
          skinMap: { x: 4, y: 20, w: 4, h: 12 },
        },
        leftLegFront: {
          label: 'F',
          drawRegion: { x: 386, y: 372, w: 65, h: 65 },
          skinMap: { x: 20, y: 52, w: 4, h: 12 },
          needsNewFormat: true,
          mirrorFrom: 'rightLegFront',
        },
        leftLegLeft: {
          label: 'L',
          drawRegion: { x: 477, y: 372, w: 65, h: 65 },
          skinMap: { x: 24, y: 52, w: 4, h: 12 },
          needsNewFormat: true,
          mirrorFrom: 'rightLegRight',
        },
        leftLegBack: {
          label: 'B',
          drawRegion: { x: 570, y: 372, w: 65, h: 65 },
          skinMap: { x: 28, y: 52, w: 4, h: 12 },
          needsNewFormat: true,
          mirrorFrom: 'rightLegBack',
        },
        leftLegRight: {
          label: 'R',
          drawRegion: { x: 663, y: 372, w: 65, h: 65 },
          skinMap: { x: 16, y: 52, w: 4, h: 12 },
          needsNewFormat: true,
          mirrorFrom: 'rightLegLeft',
        },
        rightLowerLeg: {
          label: 'D',
          drawRegion: { x: 214, y: 484, w: 65, h: 65 },
          skinMap: { x: 8, y: 16, w: 4, h: 4 },
        },
        leftLowerLeg: {
          label: 'D',
          drawRegion: { x: 307, y: 484, w: 65, h: 65 },
          skinMap: { x: 24, y: 48, w: 4, h: 4 },
          needsNewFormat: true,
          mirrorFrom: 'rightLowerLeg',
        },
      },
      extraLabels: [
        { x: 113, y: 514, text: 'RIGHT ARM' },
        { x: 511, y: 514, text: 'LEFT ARM' },
      ],
    },
  },
};

// DOM elements
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

// Set up canvas objects
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

// Initialize canvases
function initCanvases() {
  Object.values(canvases).forEach((canvasObj) => {
    // Set canvas dimensions
    canvasObj.canvas.width = config.templates.width;
    canvasObj.canvas.height = config.templates.height;

    // Get context and disable smoothing for pixelated rendering
    canvasObj.ctx = canvasObj.canvas.getContext('2d');
    canvasObj.ctx.imageSmoothingEnabled = false;
  });
}

// Load template images
function loadTemplates() {
  Object.values(canvases).forEach((canvasObj) => {
    canvasObj.template.src = canvasObj.src;
    canvasObj.template.onload = function () {
      drawTemplate(canvasObj);
    };
  });
}

// Draw template with labels
function drawTemplate(canvasObj) {
  const ctx = canvasObj.ctx;
  const garmentType = canvasObj === canvases.shirt ? 'shirt' : 'pants';
  const garmentConfig = config.garments[garmentType];

  // Draw template image
  ctx.drawImage(canvasObj.template, 0, 0);

  // Add labels
  addLabels(ctx, garmentConfig);

  // Draw dotted divider line
  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, garmentType === 'shirt' ? 172 : 372);
  ctx.lineTo(585, garmentType === 'shirt' ? 172 : 372);
  ctx.stroke();
}

// Add labels to template
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

  garmentConfig.extraLabels.forEach((label) => {
    ctx.fillText(label.text, label.x, label.y);
  });
}

// Check if using new skin format
function checkForNewSkinFormat(skinImg) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = config.minecraft.width;
  tempCanvas.height = config.minecraft.height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.drawImage(skinImg, 0, 0);

  // Check for non-transparent pixels in left arm/leg area
  const imageData = tempCtx.getImageData(16, 48, 16, 16);
  const data = imageData.data;

  for (let i = 3; i < data.length; i += 4) {
    if (data[i] > 0) {
      return true; // New format skin
    }
  }

  return false; // Old format skin
}

// Create mirrored image for old skin format
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

// Process Minecraft skin and create Roblox templates
function processMinecraftSkin(skinImg) {
  const hasNewFormat = checkForNewSkinFormat(skinImg);

  // Process garments
  Object.entries(canvases).forEach(([garmentType, canvasObj]) => {
    // Reset template
    drawTemplate(canvasObj);

    // Create the garment template
    createGarmentTemplate(skinImg, garmentType, hasNewFormat, canvasObj.ctx);

    // Add labels back
    addLabels(canvasObj.ctx, config.garments[garmentType]);
  });
}

// Draw a region from skin
function drawSkinRegion(ctx, skinImg, region, hasNewFormat, allRegions) {
  const { drawRegion, skinMap, needsNewFormat, mirrorFrom } = region;

  if (needsNewFormat && !hasNewFormat && mirrorFrom) {
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

// Create garment template from skin
function createGarmentTemplate(skinImg, garmentType, hasNewFormat, ctx) {
  const garmentConfig = config.garments[garmentType];
  const regions = garmentConfig.regions;

  // Process all regions
  Object.entries(regions).forEach(([regionName, region]) => {
    // Skip parts that need new format if we're using old format and there's no mirror source
    if (region.needsNewFormat && !hasNewFormat && !region.mirrorFrom) {
      return;
    }

    drawSkinRegion(ctx, skinImg, region, hasNewFormat, regions);
  });
}

// Event handlers
function setupEventListeners() {
  // Upload button click
  elements.uploadBtn.addEventListener('click', function () {
    elements.fileInput.click();
  });

  // File input change
  elements.fileInput.addEventListener('change', function () {
    if (elements.fileInput.files && elements.fileInput.files[0]) {
      const file = elements.fileInput.files[0];

      // Check if file is a PNG
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
          // Verify dimensions
          if (img.width !== config.minecraft.width || img.height !== config.minecraft.height) {
            showError("The file doesn't appear to be a valid Minecraft skin.<br>Expected size: 64x64 pixels");
            hideSpinner();
            return;
          }

          // Display original preview
          elements.originalPreview.src = e.target.result;
          elements.previewSection.style.display = 'block';

          // Process the image
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

  // Download buttons
  elements.downloadShirtBtn.addEventListener('click', function () {
    downloadCanvas('roblox_shirt_template.png', canvases.shirt.canvas);
  });

  elements.downloadPantsBtn.addEventListener('click', function () {
    downloadCanvas('roblox_pants_template.png', canvases.pants.canvas);
  });
}

// Download canvas as image
function downloadCanvas(filename, canvas) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// UI Utilities
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

// Initialize the application
function init() {
  initCanvases();
  loadTemplates();
  setupEventListeners();
}

// Start the application
init();
