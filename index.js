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
        up: { x: 231, y: 8, w: 128, h: 64, label: "UP" },
        right: { x: 165, y: 74, w: 64, h: 128, label: "R" },
        front: { x: 231, y: 74, w: 128, h: 128, label: "FRONT" },
        left: { x: 361, y: 74, w: 64, h: 128, label: "L" },
        back: { x: 427, y: 74, w: 128, h: 128, label: "BACK" },
        down: { x: 231, y: 204, w: 128, h: 64, label: "DOWN" },
      },
      skinMap: {
        front: { sx: 20, sy: 20, sw: 8, sh: 12 },
        back: { sx: 32, sy: 20, sw: 8, sh: 12 },
        rightArm: { sx: 44, sy: 20, sw: 4, sh: 12 },
        leftArmNew: { sx: 36, sy: 52, sw: 4, sh: 12 },
        top: { sx: 20, sy: 16, sw: 8, sh: 4 },
        bottom: { sx: 28, sy: 16, sw: 8, sh: 4 },
      },
      mappings: [
        { region: "front", skin: "front" },
        { region: "back", skin: "back" },
        { region: "right", skin: "rightArm" },
        {
          region: "left",
          skin: "leftArmNew",
          needsNewFormat: true,
          mirrorFrom: "rightArm",
        },
        { region: "up", skin: "top" },
        { region: "down", skin: "bottom" },
      ],
      extraLabels: [],
    },
    pants: {
      regions: {
        rightUpperLeg: { x: 214, y: 258, w: 65, h: 65, label: "U" },
        leftUpperLeg: { x: 307, y: 258, w: 65, h: 65, label: "U" },
        rightLegLeft: { x: 14, y: 372, w: 65, h: 65, label: "L" },
        rightLegBack: { x: 107, y: 372, w: 65, h: 65, label: "B" },
        rightLegRight: { x: 200, y: 372, w: 65, h: 65, label: "R" },
        rightLegFront: { x: 293, y: 372, w: 65, h: 65, label: "F" },
        leftLegFront: { x: 386, y: 372, w: 65, h: 65, label: "F" },
        leftLegLeft: { x: 477, y: 372, w: 65, h: 65, label: "L" },
        leftLegBack: { x: 570, y: 372, w: 65, h: 65, label: "B" },
        leftLegRight: { x: 663, y: 372, w: 65, h: 65, label: "R" },
        rightLowerLeg: { x: 214, y: 484, w: 65, h: 65, label: "D" },
        leftLowerLeg: { x: 307, y: 484, w: 65, h: 65, label: "D" },
      },
      skinMap: {
        rightLegFront: { sx: 4, sy: 20, sw: 4, sh: 12 },
        rightLegBack: { sx: 12, sy: 20, sw: 4, sh: 12 },
        rightLegRight: { sx: 0, sy: 20, sw: 4, sh: 12 },
        rightLegLeft: { sx: 8, sy: 20, sw: 4, sh: 12 },
        rightLegTop: { sx: 4, sy: 16, sw: 4, sh: 4 },
        rightLegBottom: { sx: 8, sy: 16, sw: 4, sh: 4 },
        leftLegFrontNew: { sx: 20, sy: 52, sw: 4, sh: 12 },
        leftLegBackNew: { sx: 28, sy: 52, sw: 4, sh: 12 },
        leftLegRightNew: { sx: 16, sy: 52, sw: 4, sh: 12 },
        leftLegLeftNew: { sx: 24, sy: 52, sw: 4, sh: 12 },
        leftLegTopNew: { sx: 20, sy: 48, sw: 4, sh: 4 },
        leftLegBottomNew: { sx: 24, sy: 48, sw: 4, sh: 4 },
      },
      mappings: [
        { region: "rightLegFront", skin: "rightLegFront" },
        { region: "rightLegBack", skin: "rightLegBack" },
        { region: "rightLegRight", skin: "rightLegRight" },
        { region: "rightLegLeft", skin: "rightLegLeft" },
        { region: "rightUpperLeg", skin: "rightLegTop" },
        { region: "rightLowerLeg", skin: "rightLegBottom" },

        // Left leg mappings with new format specifics
        {
          region: "leftLegFront",
          skin: "leftLegFrontNew",
          needsNewFormat: true,
          mirrorFrom: "rightLegFront",
        },
        {
          region: "leftLegBack",
          skin: "leftLegBackNew",
          needsNewFormat: true,
          mirrorFrom: "rightLegBack",
        },
        {
          region: "leftLegRight",
          skin: "leftLegRightNew",
          needsNewFormat: true,
          mirrorFrom: "rightLegLeft",
        }, // mirrored from left of right leg
        {
          region: "leftLegLeft",
          skin: "leftLegLeftNew",
          needsNewFormat: true,
          mirrorFrom: "rightLegRight",
        }, // mirrored from right of right leg
        {
          region: "leftUpperLeg",
          skin: "leftLegTopNew",
          needsNewFormat: true,
          mirrorFrom: "rightLegTop",
        },
        {
          region: "leftLowerLeg",
          skin: "leftLegBottomNew",
          needsNewFormat: true,
          mirrorFrom: "rightLegBottom",
        },
      ],
      extraLabels: [
        { x: 113, y: 514, text: "RIGHT ARM" },
        { x: 511, y: 514, text: "LEFT ARM" },
      ],
    },
  },
};

// DOM elements
const elements = {
  fileInput: document.getElementById("fileInput"),
  uploadBtn: document.getElementById("uploadBtn"),
  shirtCanvas: document.getElementById("shirtCanvas"),
  pantsCanvas: document.getElementById("pantsCanvas"),
  downloadShirtBtn: document.getElementById("downloadShirtBtn"),
  downloadPantsBtn: document.getElementById("downloadPantsBtn"),
  originalPreview: document.getElementById("original-preview"),
  previewSection: document.getElementById("preview-section"),
  spinner: document.getElementById("spinner"),
  errorMessage: document.getElementById("error-message"),
  outputContainer: document.getElementById("output-container"),
};

// Set up canvas objects
const canvases = {
  shirt: {
    src: "/Template_Shirt.png",
    canvas: elements.shirtCanvas,
    ctx: null,
    template: new Image(),
  },
  pants: {
    src: "/Template_Pants.png",
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
    canvasObj.ctx = canvasObj.canvas.getContext("2d");
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
  const garmentType = canvasObj === canvases.shirt ? "shirt" : "pants";
  const garmentConfig = config.garments[garmentType];

  // Draw template image
  ctx.drawImage(canvasObj.template, 0, 0);

  // Add labels
  addLabels(ctx, garmentConfig);

  // Draw dotted divider line
  ctx.strokeStyle = "#ffffff";
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, garmentType === "shirt" ? 172 : 372);
  ctx.lineTo(585, garmentType === "shirt" ? 172 : 372);
  ctx.stroke();
}

// Add labels to template
function addLabels(ctx, garmentConfig) {
  // Set text style
  ctx.font = "bold 32px sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  // Add region labels
  Object.values(garmentConfig.regions).forEach((region) => {
    const centerX = region.x + region.w / 2;
    const centerY = region.y + region.h / 2;
    ctx.fillText(region.label, centerX, centerY + 10); // +10 for vertical centering
  });

  // Add extra labels if any
  garmentConfig.extraLabels.forEach((label) => {
    ctx.fillText(label.text, label.x, label.y);
  });
}

// Check if using new skin format
function checkForNewSkinFormat(skinImg) {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = config.minecraft.width;
  tempCanvas.height = config.minecraft.height;
  const tempCtx = tempCanvas.getContext("2d");
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
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = srcW;
  tempCanvas.height = srcH;
  const tempCtx = tempCanvas.getContext("2d");

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
function drawSkinRegion(
  ctx,
  skinImg,
  skinInfo,
  regionInfo,
  hasNewFormat,
  needsNewFormat,
  mirrorFrom,
  skinMap
) {
  // If this part needs new format and we don't have it, use mirroring
  if (needsNewFormat && !hasNewFormat && mirrorFrom) {
    const mirrorSkinInfo = skinMap[mirrorFrom];

    const mirroredCanvas = createMirroredImage(
      skinImg,
      mirrorSkinInfo.sx,
      mirrorSkinInfo.sy,
      mirrorSkinInfo.sw,
      mirrorSkinInfo.sh
    );

    ctx.drawImage(
      mirroredCanvas,
      0,
      0,
      mirrorSkinInfo.sw,
      mirrorSkinInfo.sh,
      regionInfo.x,
      regionInfo.y,
      regionInfo.w,
      regionInfo.h
    );
  } else {
    // Draw directly from skin
    ctx.drawImage(
      skinImg,
      skinInfo.sx,
      skinInfo.sy,
      skinInfo.sw,
      skinInfo.sh,
      regionInfo.x,
      regionInfo.y,
      regionInfo.w,
      regionInfo.h
    );
  }
}

// Create garment template from skin
function createGarmentTemplate(skinImg, garmentType, hasNewFormat, ctx) {
  const garmentConfig = config.garments[garmentType];
  const skinMap = garmentConfig.skinMap;
  const regions = garmentConfig.regions;

  // Process all mappings
  garmentConfig.mappings.forEach((mapping) => {
    const regionInfo = regions[mapping.region];
    const skinInfo = skinMap[mapping.skin];

    // Skip parts that need new format if we're using old format
    if (mapping.needsNewFormat && !hasNewFormat && !mapping.mirrorFrom) {
      return;
    }

    drawSkinRegion(
      ctx,
      skinImg,
      skinInfo,
      regionInfo,
      hasNewFormat,
      mapping.needsNewFormat,
      mapping.mirrorFrom,
      skinMap
    );
  });
}

// Event handlers
function setupEventListeners() {
  // Upload button click
  elements.uploadBtn.addEventListener("click", function () {
    console.log("=>");
    elements.fileInput.click();
  });

  // File input change
  elements.fileInput.addEventListener("change", function () {
    if (elements.fileInput.files && elements.fileInput.files[0]) {
      const file = elements.fileInput.files[0];

      // Check if file is a PNG
      if (file.type !== "image/png") {
        showError("Please upload a PNG file");
        return;
      }

      showSpinner();
      elements.errorMessage.style.display = "none";

      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          // Verify dimensions
          if (
            img.width !== config.minecraft.width ||
            img.height !== config.minecraft.height
          ) {
            showError(
              "The file doesn't appear to be a valid Minecraft skin.<br>Expected size: 64x64 pixels"
            );
            hideSpinner();
            return;
          }

          // Display original preview
          elements.originalPreview.src = e.target.result;
          elements.previewSection.style.display = "block";

          // Process the image
          processMinecraftSkin(img);

          hideSpinner();
          elements.outputContainer.style.display = "block";
        };

        img.onerror = function () {
          showError("Error loading the image");
          hideSpinner();
        };

        img.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  });

  // Download buttons
  elements.downloadShirtBtn.addEventListener("click", function () {
    downloadCanvas("roblox_shirt_template.png", canvases.shirt.canvas);
  });

  elements.downloadPantsBtn.addEventListener("click", function () {
    downloadCanvas("roblox_pants_template.png", canvases.pants.canvas);
  });
}

// Download canvas as image
function downloadCanvas(filename, canvas) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// UI Utilities
function showSpinner() {
  elements.spinner.style.display = "block";
}

function hideSpinner() {
  elements.spinner.style.display = "none";
}

function showError(message) {
  elements.errorMessage.innerHTML = message;
  elements.errorMessage.style.display = "block";
}

// Initialize the application
function init() {
  console.log("=>>");
  initCanvases();
  loadTemplates();
  setupEventListeners();
}

// Start the application
init();
