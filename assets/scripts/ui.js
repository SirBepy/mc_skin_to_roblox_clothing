export const elements = {
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

export function showSpinner() {
  elements.spinner.style.display = 'block';
}

export function hideSpinner() {
  elements.spinner.style.display = 'none';
}

export function showError(message) {
  elements.errorMessage.innerHTML = message;
  elements.errorMessage.style.display = 'block';
}

export function downloadCanvas(filename, canvas) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
