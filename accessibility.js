document.addEventListener("DOMContentLoaded", function () {
  const boldTextCheckbox = document.getElementById("boldText");
  const highContrastCheckbox = document.getElementById("highContrast");
  const darkModeCheckbox = document.getElementById("darkMode");

  // Apply saved settings from localStorage
  if (localStorage.getItem("boldText") === "true") {
    document.body.classList.add("large-bold-text");
    if (boldTextCheckbox) boldTextCheckbox.checked = true;
  }

  if (localStorage.getItem("highContrast") === "true") {
    document.body.classList.add("high-contrast");
    if (highContrastCheckbox) highContrastCheckbox.checked = true;
  }

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    if (darkModeCheckbox) darkModeCheckbox.checked = true;
  }

  // Update localStorage and body class when toggles are changed
  if (boldTextCheckbox) {
    boldTextCheckbox.addEventListener("change", () => {
      document.body.classList.toggle("large-bold-text", boldTextCheckbox.checked);
      localStorage.setItem("boldText", boldTextCheckbox.checked);
    });
  }

  if (highContrastCheckbox) {
    highContrastCheckbox.addEventListener("change", () => {
      document.body.classList.toggle("high-contrast", highContrastCheckbox.checked);
      localStorage.setItem("highContrast", highContrastCheckbox.checked);
    });
  }

  if (darkModeCheckbox) {
    darkModeCheckbox.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode", darkModeCheckbox.checked);
      localStorage.setItem("darkMode", darkModeCheckbox.checked);
    });
  }
});
