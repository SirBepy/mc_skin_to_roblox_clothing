import { elements, downloadCanvas } from './ui.js';
import { canvases, initCanvases, loadTemplates } from './canvas.js';
import { setupFileUpload, setupDragAndDrop, setupUsernameFeature } from './file-handler.js';

function onDownload(clothingType) {
  if (!canvases[clothingType])
    return console.warn('Could not find canvas with name', clothingType, '\nOnly found:', canvases);
  let username = 'roblox';

  if (elements.usernameInput && elements.usernameInput.value) {
    username = elements.usernameInput.value;
  }

  if (elements.showTemplateCheckbox.checked) {
    downloadCanvas(`${username}_ro_${clothingType}.png`, canvases[clothingType].canvas);
  } else {
    downloadCanvas(`${username}_ro_${clothingType}.png`, canvases[clothingType].skinOnlyCanvas);
  }
}

function setupDownloadButtons() {
  elements.downloadShirtBtn.addEventListener('click', () => onDownload('shirt'));
  elements.downloadPantsBtn.addEventListener('click', () => onDownload('pants'));
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
