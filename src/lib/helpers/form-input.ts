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

export const discountValidate = (event: any) => {
  // Get the key code of the pressed key
  const keyCode = event.keyCode || event.which;
  const inputValue = event.target.value;

  // Allow certain keys: digits 0-9, backspace, delete, and arrow keys
  if (
    !(keyCode >= 48 && keyCode <= 57) && // Digits 0-9
    !(keyCode >= 96 && keyCode <= 105) && // Numpad digits 0-9
    keyCode !== 8 && // Backspace
    keyCode !== 46 && // Delete
    (keyCode < 37 || keyCode > 40) // Arrow keys
  ) {
    event.preventDefault(); // Prevent input
  }

  // Prevent leading 0s
  if (inputValue === "0" && keyCode === 48) {
    event.preventDefault(); // Prevent input
  }
};
