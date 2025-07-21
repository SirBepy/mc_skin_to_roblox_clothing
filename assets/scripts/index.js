import { elements, downloadCanvas } from './ui.js';
import { canvases, initCanvases, loadTemplates } from './canvas.js';
import { setupFileUpload, setupDragAndDrop, setupUsernameFeature } from './file-handler.js';

function setupDownloadButtons() {
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

function init() {
  initCanvases();
  loadTemplates();
  setupFileUpload();
  setupDownloadButtons();
  setupDragAndDrop();
  setupUsernameFeature();
}

init();
