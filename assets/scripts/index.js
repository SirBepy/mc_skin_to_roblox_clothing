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
  showTemplateCheckbox: document.getElementById('show_roblox_template'),
};

const canvases = {
  shirt: {
    src: 'images/Template_Shirt.png',
    canvas: elements.shirtCanvas,
    ctx: null,
    template: new Image(),
    skinOnlyCanvas: document.createElement('canvas'),
  },
  pants: {
    src: 'images/Template_Pants.png',
    canvas: elements.pantsCanvas,
    ctx: null,
    template: new Image(),
    skinOnlyCanvas: document.createElement('canvas'),
  },
};

function initCanvases() {
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

  ctx.clearRect(0, 0, canvasObj.canvas.width, canvasObj.canvas.height);
  ctx.drawImage(canvasObj.template, 0, 0);

  addLabels(ctx, garmentConfig);

  ctx.strokeStyle = '#ffffff';
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, garmentType === 'shirt' ? 172 : 372);
  ctx.lineTo(585, garmentType === 'shirt' ? 172 : 372);
  ctx.stroke();

  canvasObj.skinOnlyCtx.clearRect(0, 0, canvasObj.skinOnlyCanvas.width, canvasObj.skinOnlyCanvas.height);
}

function addLabels(ctx, garmentConfig) {
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
    createGarmentTemplate(skinImg, garmentType, hasNewFormat, canvasObj.skinOnlyCtx);

    addLabels(canvasObj.ctx, config.garments[garmentType]);
  });
}

function createFlippedImage(skinImg, srcX, srcY, srcW, srcH, flipAxis) {
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

  elements.downloadShirtBtn.addEventListener('click', () => {
    if (elements.showTemplateCheckbox.checked) {
      downloadCanvas('roblox_shirt.png', canvases.shirt.canvas);
    } else {
      downloadCanvas('roblox_shirt.png', canvases.shirt.skinOnlyCanvas);
    }
  });

  elements.downloadPantsBtn.addEventListener('click', () => {
    if (elements.showTemplateCheckbox.checked) {
      downloadCanvas('roblox_pants.png', canvases.pants.canvas);
    } else {
      downloadCanvas('roblox_pants.png', canvases.pants.skinOnlyCanvas);
    }
  });
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

function setupDragAndDrop() {
  const uploadSection = document.querySelector('.upload-section');

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
    uploadSection.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach((eventName) => {
    uploadSection.addEventListener(eventName, () => {
      uploadSection.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    uploadSection.addEventListener(eventName, () => {
      uploadSection.classList.remove('drag-over');
    });
  });

  uploadSection.addEventListener('drop', handleDrop);
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  if (files.length > 0) {
    elements.fileInput.files = files;
    const event = new Event('change', { bubbles: true });
    elements.fileInput.dispatchEvent(event);
  }
}

function setupUsernameFeature() {
  const usernameInput = document.getElementById('usernameInput');
  const fetchSkinBtn = document.getElementById('fetchSkinBtn');

  fetchSkinBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    if (!username) {
      showError('Please enter a Minecraft username');
      return;
    }

    showSpinner();
    elements.errorMessage.style.display = 'none';

    try {
      const response = await fetch(`https://mineskin.eu/skin/${username}`);
      if (!response.ok) {
        throw new Error('User not found or API error');
      }

      const blob = await response.blob();
      const img = new Image();

      img.onload = function () {
        if (img.width !== config.minecraft.width || img.height !== config.minecraft.height) {
          showError("The skin doesn't appear to be valid.<br>Expected size: 64x64 pixels");
          hideSpinner();
          return;
        }

        elements.originalPreview.src = img.src;
        elements.previewSection.style.display = 'block';

        processMinecraftSkin(img);

        hideSpinner();
        elements.outputContainer.style.display = 'block';
      };

      img.onerror = function () {
        showError('Error loading the skin image');
        hideSpinner();
      };

      img.src = URL.createObjectURL(blob);
    } catch (error) {
      showError(`Failed to fetch skin: ${error.message}`);
      hideSpinner();
    }
  });

  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      fetchSkinBtn.click();
    }
  });
}

function init() {
  initCanvases();
  loadTemplates();
  setupEventListeners();
  setupDragAndDrop();
  setupUsernameFeature();
}

init();
