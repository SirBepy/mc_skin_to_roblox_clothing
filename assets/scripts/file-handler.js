import { config } from './config.js';
import { elements, showSpinner, hideSpinner, showError } from './ui.js';
import { processMinecraftSkin } from './skin-processor.js';

export function setupFileUpload() {
  elements.uploadBtn.addEventListener('click', () => {
    elements.fileInput.click();
  });

  elements.fileInput.addEventListener('change', handleFileSelect);
}

function handleFileSelect() {
  if (elements.fileInput.files && elements.fileInput.files[0]) {
    const file = elements.fileInput.files[0];

    if (file.type !== 'image/png') {
      showError('Please upload a PNG file');
      return;
    }

    showSpinner();
    elements.errorMessage.style.display = 'none';

    const reader = new FileReader();
    reader.onload = (e) => loadImageFromData(e.target.result);
    reader.readAsDataURL(file);
  }
}

function loadImageFromData(dataUrl) {
  const img = new Image();

  img.onload = function () {
    if (img.width !== config.skinImageSize.width || img.height !== config.skinImageSize.height) {
      showError("The file doesn't appear to be a valid Minecraft skin.<br>Expected size: 64x64 pixels");
      hideSpinner();
      return;
    }

    elements.originalPreview.src = dataUrl;
    elements.previewSection.style.display = 'block';

    processMinecraftSkin(img);

    hideSpinner();
    elements.outputContainer.style.display = 'block';
  };

  img.onerror = function () {
    showError('Error loading the image');
    hideSpinner();
  };

  img.src = dataUrl;
}

export function setupDragAndDrop() {
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

export function setupUsernameFeature() {
  const usernameInput = document.getElementById('usernameInput');
  const fetchSkinBtn = document.getElementById('fetchSkinBtn');

  fetchSkinBtn.addEventListener('click', () => fetchSkinFromUsername(usernameInput.value));

  usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      fetchSkinFromUsername(usernameInput.value);
    }
  });
}

async function fetchSkinFromUsername(username) {
  username = username.trim();
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
      if (img.width !== config.skinImageSize.width || img.height !== config.skinImageSize.height) {
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
}
