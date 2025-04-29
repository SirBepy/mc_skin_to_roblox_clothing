document.addEventListener("DOMContentLoaded", function () {
  // Configuration object for easily adjusting dimensions and positions
  const config = {
    templates: {
      width: 585,
      height: 559,
    },
    minecraft: {
      width: 64,
      height: 64,
    },
    shirt: {
      regions: {
        up: { x: 231, y: 8, w: 128, h: 64, label: "UP" },
        right: { x: 165, y: 74, w: 64, h: 128, label: "R" },
        front: {
          x: 231,
          y: 74,
          w: 128,
          h: 128,
          label: "FRONT",
        },
        left: { x: 361, y: 74, w: 64, h: 128, label: "L" },
        back: {
          x: 427,
          y: 74,
          w: 128,
          h: 128,
          label: "BACK",
        },
        down: {
          x: 231,
          y: 204,
          w: 128,
          h: 64,
          label: "DOWN",
        },
      },
      skinMap: {
        front: { sx: 20, sy: 20, sw: 8, sh: 12 },
        back: { sx: 32, sy: 20, sw: 8, sh: 12 },
        rightArm: { sx: 44, sy: 20, sw: 4, sh: 12 },
        leftArmNew: { sx: 36, sy: 52, sw: 4, sh: 12 },
        top: { sx: 20, sy: 16, sw: 8, sh: 4 },
        bottom: { sx: 28, sy: 16, sw: 8, sh: 4 },
      },
    },
    pants: {
      regions: {
        rightUpperLeg: {
          x: 214,
          y: 258,
          w: 65,
          h: 65,

          label: "U",
        },
        leftUpperLeg: {
          x: 307,
          y: 258,
          w: 65,
          h: 65,

          label: "U",
        },
        rightLegLeft: {
          x: 14,
          y: 372,
          w: 65,
          h: 65,

          label: "L",
        },
        rightLegBack: {
          x: 107,
          y: 372,
          w: 65,
          h: 65,

          label: "B",
        },
        rightLegRight: {
          x: 200,
          y: 372,
          w: 65,
          h: 65,

          label: "R",
        },
        rightLegFront: {
          x: 293,
          y: 372,
          w: 65,
          h: 65,

          label: "F",
        },
        leftLegFront: {
          x: 386,
          y: 372,
          w: 65,
          h: 65,

          label: "F",
        },
        leftLegLeft: {
          x: 477,
          y: 372,
          w: 65,
          h: 65,

          label: "L",
        },
        leftLegBack: {
          x: 570,
          y: 372,
          w: 65,
          h: 65,

          label: "B",
        },
        leftLegRight: {
          x: 663,
          y: 372,
          w: 65,
          h: 65,

          label: "R",
        },
        rightLowerLeg: {
          x: 214,
          y: 484,
          w: 65,
          h: 65,

          label: "D",
        },
        leftLowerLeg: {
          x: 307,
          y: 484,
          w: 65,
          h: 65,

          label: "D",
        },
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
      extraLabels: [
        { x: 113, y: 514, text: "RIGHT ARM" },
        { x: 511, y: 514, text: "LEFT ARM" },
      ],
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

  // Set up canvas dimensions
  const canvases = {
    shirt: {
      canvas: elements.shirtCanvas,
      ctx: null,
      template: new Image(),
    },
    pants: {
      canvas: elements.pantsCanvas,
      ctx: null,
      template: new Image(),
    },
  };

  // Initialize canvases
  function initCanvases() {
    // Set canvas dimensions
    canvases.shirt.canvas.width = config.templates.width;
    canvases.shirt.canvas.height = config.templates.height;
    canvases.pants.canvas.width = config.templates.width;
    canvases.pants.canvas.height = config.templates.height;

    // Get contexts
    canvases.shirt.ctx = canvases.shirt.canvas.getContext("2d");
    canvases.pants.ctx = canvases.pants.canvas.getContext("2d");

    // Set image smoothing to false for pixelated rendering
    canvases.shirt.ctx.imageSmoothingEnabled = false;
    canvases.pants.ctx.imageSmoothingEnabled = false;
  }

  // Load template images
  function loadTemplates() {
    // Load shirt template
    canvases.shirt.template.src = "/Template.png";
    canvases.shirt.template.onload = function () {
      drawShirtTemplate();
    };

    // Load pants template
    canvases.pants.template.src = "/Template.png";
    canvases.pants.template.onload = function () {
      drawPantsTemplate();
    };
  }

  // Draw shirt template with labels
  function drawShirtTemplate() {
    const ctx = canvases.shirt.ctx;
    ctx.drawImage(canvases.shirt.template, 0, 0);

    // Draw template regions with colors
    Object.values(config.shirt.regions).forEach((region) => {
      ctx.fillStyle = region.color;
      ctx.fillRect(region.x, region.y, region.w, region.h);
    });

    addShirtLabels();
  }

  // Draw pants template with labels
  function drawPantsTemplate() {
    const ctx = canvases.pants.ctx;
    ctx.drawImage(canvases.pants.template, 0, 0);

    // Draw template regions with colors
    Object.values(config.pants.regions).forEach((region) => {
      ctx.fillStyle = region.color;
      ctx.fillRect(region.x, region.y, region.w, region.h);
    });

    addPantsLabels();
  }

  // Add labels to shirt template
  function addShirtLabels() {
    const ctx = canvases.shirt.ctx;

    // Set text style
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    // Add region labels
    Object.values(config.shirt.regions).forEach((region) => {
      const centerX = region.x + region.w / 2;
      const centerY = region.y + region.h / 2;
      ctx.fillText(region.label, centerX, centerY + 10); // +10 for vertical centering
    });

    // Draw dotted lines
    ctx.strokeStyle = "#ffffff";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, 172);
    ctx.lineTo(585, 172);
    ctx.stroke();
  }

  // Add labels to pants template
  function addPantsLabels() {
    const ctx = canvases.pants.ctx;

    // Set text style
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    // Add region labels
    Object.values(config.pants.regions).forEach((region) => {
      const centerX = region.x + region.w / 2;
      const centerY = region.y + region.h / 2;
      ctx.fillText(region.label, centerX, centerY + 10); // +10 for vertical centering
    });

    // Add extra labels for arm parts
    config.pants.extraLabels.forEach((label) => {
      ctx.fillText(label.text, label.x, label.y);
    });

    // Draw dotted lines
    ctx.strokeStyle = "#ffffff";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, 372);
    ctx.lineTo(585, 372);
    ctx.stroke();
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
    // Reset templates
    drawShirtTemplate();
    drawPantsTemplate();

    // Draw shirt parts from Minecraft skin
    createShirtTemplate(skinImg);

    // Draw pants parts from Minecraft skin
    createPantsTemplate(skinImg);

    // Add template labels back
    addShirtLabels();
    addPantsLabels();
  }

  // Create shirt template from skin
  function createShirtTemplate(skinImg) {
    const ctx = canvases.shirt.ctx;
    const hasNewFormat = checkForNewSkinFormat(skinImg);
    const skinMap = config.shirt.skinMap;

    // Draw FRONT
    ctx.drawImage(
      skinImg,
      skinMap.front.sx,
      skinMap.front.sy,
      skinMap.front.sw,
      skinMap.front.sh,
      config.shirt.regions.front.x,
      config.shirt.regions.front.y,
      config.shirt.regions.front.w,
      config.shirt.regions.front.h
    );

    // Draw BACK
    ctx.drawImage(
      skinImg,
      skinMap.back.sx,
      skinMap.back.sy,
      skinMap.back.sw,
      skinMap.back.sh,
      config.shirt.regions.back.x,
      config.shirt.regions.back.y,
      config.shirt.regions.back.w,
      config.shirt.regions.back.h
    );

    // Draw RIGHT ARM
    ctx.drawImage(
      skinImg,
      skinMap.rightArm.sx,
      skinMap.rightArm.sy,
      skinMap.rightArm.sw,
      skinMap.rightArm.sh,
      config.shirt.regions.right.x,
      config.shirt.regions.right.y,
      config.shirt.regions.right.w,
      config.shirt.regions.right.h
    );

    // Draw LEFT ARM
    if (hasNewFormat) {
      // New skin format - use dedicated left arm texture
      ctx.drawImage(
        skinImg,
        skinMap.leftArmNew.sx,
        skinMap.leftArmNew.sy,
        skinMap.leftArmNew.sw,
        skinMap.leftArmNew.sh,
        config.shirt.regions.left.x,
        config.shirt.regions.left.y,
        config.shirt.regions.left.w,
        config.shirt.regions.left.h
      );
    } else {
      // Old skin format - mirror right arm
      const mirroredArm = createMirroredImage(
        skinImg,
        skinMap.rightArm.sx,
        skinMap.rightArm.sy,
        skinMap.rightArm.sw,
        skinMap.rightArm.sh
      );

      ctx.drawImage(
        mirroredArm,
        0,
        0,
        skinMap.rightArm.sw,
        skinMap.rightArm.sh,
        config.shirt.regions.left.x,
        config.shirt.regions.left.y,
        config.shirt.regions.left.w,
        config.shirt.regions.left.h
      );
    }

    // Draw TOP
    ctx.drawImage(
      skinImg,
      skinMap.top.sx,
      skinMap.top.sy,
      skinMap.top.sw,
      skinMap.top.sh,
      config.shirt.regions.up.x,
      config.shirt.regions.up.y,
      config.shirt.regions.up.w,
      config.shirt.regions.up.h
    );

    // Draw BOTTOM
    ctx.drawImage(
      skinImg,
      skinMap.bottom.sx,
      skinMap.bottom.sy,
      skinMap.bottom.sw,
      skinMap.bottom.sh,
      config.shirt.regions.down.x,
      config.shirt.regions.down.y,
      config.shirt.regions.down.w,
      config.shirt.regions.down.h
    );
  }

  // Create pants template from skin
  function createPantsTemplate(skinImg) {
    const ctx = canvases.pants.ctx;
    const hasNewFormat = checkForNewSkinFormat(skinImg);
    const skinMap = config.pants.skinMap;
    const regions = config.pants.regions;

    // === RIGHT LEG ===
    // Front of right leg
    ctx.drawImage(
      skinImg,
      skinMap.rightLegFront.sx,
      skinMap.rightLegFront.sy,
      skinMap.rightLegFront.sw,
      skinMap.rightLegFront.sh,
      regions.rightLegFront.x,
      regions.rightLegFront.y,
      regions.rightLegFront.w,
      regions.rightLegFront.h
    );

    // Back of right leg
    ctx.drawImage(
      skinImg,
      skinMap.rightLegBack.sx,
      skinMap.rightLegBack.sy,
      skinMap.rightLegBack.sw,
      skinMap.rightLegBack.sh,
      regions.rightLegBack.x,
      regions.rightLegBack.y,
      regions.rightLegBack.w,
      regions.rightLegBack.h
    );

    // Right side of right leg
    ctx.drawImage(
      skinImg,
      skinMap.rightLegRight.sx,
      skinMap.rightLegRight.sy,
      skinMap.rightLegRight.sw,
      skinMap.rightLegRight.sh,
      regions.rightLegRight.x,
      regions.rightLegRight.y,
      regions.rightLegRight.w,
      regions.rightLegRight.h
    );

    // Left side of right leg
    ctx.drawImage(
      skinImg,
      skinMap.rightLegLeft.sx,
      skinMap.rightLegLeft.sy,
      skinMap.rightLegLeft.sw,
      skinMap.rightLegLeft.sh,
      regions.rightLegLeft.x,
      regions.rightLegLeft.y,
      regions.rightLegLeft.w,
      regions.rightLegLeft.h
    );

    // Top of right leg
    ctx.drawImage(
      skinImg,
      skinMap.rightLegTop.sx,
      skinMap.rightLegTop.sy,
      skinMap.rightLegTop.sw,
      skinMap.rightLegTop.sh,
      regions.rightUpperLeg.x,
      regions.rightUpperLeg.y,
      regions.rightUpperLeg.w,
      regions.rightUpperLeg.h
    );

    // Bottom of right leg
    ctx.drawImage(
      skinImg,
      skinMap.rightLegBottom.sx,
      skinMap.rightLegBottom.sy,
      skinMap.rightLegBottom.sw,
      skinMap.rightLegBottom.sh,
      regions.rightLowerLeg.x,
      regions.rightLowerLeg.y,
      regions.rightLowerLeg.w,
      regions.rightLowerLeg.h
    );

    // === LEFT LEG ===
    if (hasNewFormat) {
      // New skin format - use dedicated left leg texture
      // Front of left leg
      ctx.drawImage(
        skinImg,
        skinMap.leftLegFrontNew.sx,
        skinMap.leftLegFrontNew.sy,
        skinMap.leftLegFrontNew.sw,
        skinMap.leftLegFrontNew.sh,
        regions.leftLegFront.x,
        regions.leftLegFront.y,
        regions.leftLegFront.w,
        regions.leftLegFront.h
      );

      // Back of left leg
      ctx.drawImage(
        skinImg,
        skinMap.leftLegBackNew.sx,
        skinMap.leftLegBackNew.sy,
        skinMap.leftLegBackNew.sw,
        skinMap.leftLegBackNew.sh,
        regions.leftLegBack.x,
        regions.leftLegBack.y,
        regions.leftLegBack.w,
        regions.leftLegBack.h
      );

      // Right side of left leg
      ctx.drawImage(
        skinImg,
        skinMap.leftLegRightNew.sx,
        skinMap.leftLegRightNew.sy,
        skinMap.leftLegRightNew.sw,
        skinMap.leftLegRightNew.sh,
        regions.leftLegRight.x,
        regions.leftLegRight.y,
        regions.leftLegRight.w,
        regions.leftLegRight.h
      );

      // Left side of left leg
      ctx.drawImage(
        skinImg,
        skinMap.leftLegLeftNew.sx,
        skinMap.leftLegLeftNew.sy,
        skinMap.leftLegLeftNew.sw,
        skinMap.leftLegLeftNew.sh,
        regions.leftLegLeft.x,
        regions.leftLegLeft.y,
        regions.leftLegLeft.w,
        regions.leftLegLeft.h
      );

      // Top of left leg
      ctx.drawImage(
        skinImg,
        skinMap.leftLegTopNew.sx,
        skinMap.leftLegTopNew.sy,
        skinMap.leftLegTopNew.sw,
        skinMap.leftLegTopNew.sh,
        regions.leftUpperLeg.x,
        regions.leftUpperLeg.y,
        regions.leftUpperLeg.w,
        regions.leftUpperLeg.h
      );

      // Bottom of left leg
      ctx.drawImage(
        skinImg,
        skinMap.leftLegBottomNew.sx,
        skinMap.leftLegBottomNew.sy,
        skinMap.leftLegBottomNew.sw,
        skinMap.leftLegBottomNew.sh,
        regions.leftLowerLeg.x,
        regions.leftLowerLeg.y,
        regions.leftLowerLeg.w,
        regions.leftLowerLeg.h
      );
    } else {
      // Old skin format - mirror right leg parts
      // Front of left leg
      const mirroredFront = createMirroredImage(
        skinImg,
        skinMap.rightLegFront.sx,
        skinMap.rightLegFront.sy,
        skinMap.rightLegFront.sw,
        skinMap.rightLegFront.sh
      );
      ctx.drawImage(
        mirroredFront,
        0,
        0,
        skinMap.rightLegFront.sw,
        skinMap.rightLegFront.sh,
        regions.leftLegFront.x,
        regions.leftLegFront.y,
        regions.leftLegFront.w,
        regions.leftLegFront.h
      );

      // Back of left leg
      const mirroredBack = createMirroredImage(
        skinImg,
        skinMap.rightLegBack.sx,
        skinMap.rightLegBack.sy,
        skinMap.rightLegBack.sw,
        skinMap.rightLegBack.sh
      );
      ctx.drawImage(
        mirroredBack,
        0,
        0,
        skinMap.rightLegBack.sw,
        skinMap.rightLegBack.sh,
        regions.leftLegBack.x,
        regions.leftLegBack.y,
        regions.leftLegBack.w,
        regions.leftLegBack.h
      );

      // Right side of left leg (mirrored from left side of right leg)
      const mirroredRight = createMirroredImage(
        skinImg,
        skinMap.rightLegLeft.sx,
        skinMap.rightLegLeft.sy,
        skinMap.rightLegLeft.sw,
        skinMap.rightLegLeft.sh
      );
      ctx.drawImage(
        mirroredRight,
        0,
        0,
        skinMap.rightLegLeft.sw,
        skinMap.rightLegLeft.sh,
        regions.leftLegRight.x,
        regions.leftLegRight.y,
        regions.leftLegRight.w,
        regions.leftLegRight.h
      );

      // Left side of left leg (mirrored from right side of right leg)
      const mirroredLeft = createMirroredImage(
        skinImg,
        skinMap.rightLegRight.sx,
        skinMap.rightLegRight.sy,
        skinMap.rightLegRight.sw,
        skinMap.rightLegRight.sh
      );
      ctx.drawImage(
        mirroredLeft,
        0,
        0,
        skinMap.rightLegRight.sw,
        skinMap.rightLegRight.sh,
        regions.leftLegLeft.x,
        regions.leftLegLeft.y,
        regions.leftLegLeft.w,
        regions.leftLegLeft.h
      );

      // Top of left leg
      const mirroredTop = createMirroredImage(
        skinImg,
        skinMap.rightLegTop.sx,
        skinMap.rightLegTop.sy,
        skinMap.rightLegTop.sw,
        skinMap.rightLegTop.sh
      );
      ctx.drawImage(
        mirroredTop,
        0,
        0,
        skinMap.rightLegTop.sw,
        skinMap.rightLegTop.sh,
        regions.leftUpperLeg.x,
        regions.leftUpperLeg.y,
        regions.leftUpperLeg.w,
        regions.leftUpperLeg.h
      );

      // Bottom of left leg
      const mirroredBottom = createMirroredImage(
        skinImg,
        skinMap.rightLegBottom.sx,
        skinMap.rightLegBottom.sy,
        skinMap.rightLegBottom.sw,
        skinMap.rightLegBottom.sh
      );
      ctx.drawImage(
        mirroredBottom,
        0,
        0,
        skinMap.rightLegBottom.sw,
        skinMap.rightLegBottom.sh,
        regions.leftLowerLeg.x,
        regions.leftLowerLeg.y,
        regions.leftLowerLeg.w,
        regions.leftLowerLeg.h
      );
    }
  }

  // Event handlers
  function setupEventListeners() {
    // Upload button click
    elements.uploadBtn.addEventListener("click", function () {
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

    // Download shirt button
    elements.downloadShirtBtn.addEventListener("click", function () {
      const link = document.createElement("a");
      link.download = "roblox_shirt_template.png";
      link.href = canvases.shirt.canvas.toDataURL("image/png");
      link.click();
    });

    // Download pants button
    elements.downloadPantsBtn.addEventListener("click", function () {
      const link = document.createElement("a");
      link.download = "roblox_pants_template.png";
      link.href = canvases.pants.canvas.toDataURL("image/png");
      link.click();
    });
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
    initCanvases();
    loadTemplates();
    setupEventListeners();
  }

  // Start the application
  init();
});
