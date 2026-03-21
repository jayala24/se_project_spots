export function setButtonText(
  btn,
  isLoading,
  _defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    btn.innerText = loadingText;
    console.log(`Setting text to ${loadingText}`);
  } else {
    btn.innerText = _defaultText;
    console.log(`Setting text to ${_defaultText}`);
  }
}
