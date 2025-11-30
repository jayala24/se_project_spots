export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    // set loading
    console.log(`Setting text to ${loadingText}`);
  } else {
    // set not loading text
  }
}
