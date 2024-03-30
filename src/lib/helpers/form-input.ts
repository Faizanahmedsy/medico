export const restrictPositiveNumbersOnly = (event: any) => {
  // Get the key code of the pressed key
  const keyCode = event.keyCode || event.which;

  // Check if Ctrl key is pressed along with 'a' (Ctrl+A)
  const isCtrlAPressed = (event.ctrlKey || event.metaKey) && keyCode === 65;

  // Allow certain keys: backspace, delete, arrow keys, tab, Ctrl+A, and digits 0-9
  if (
    !(
      (keyCode >= 48 && keyCode <= 57) || // digits 0-9
      keyCode === 8 || // backspace
      keyCode === 9 || // tab
      keyCode === 46 || // delete
      (keyCode >= 37 && keyCode <= 40) || // arrow keys
      isCtrlAPressed
    )
  ) {
    event.preventDefault(); // Prevent input
  }
};
