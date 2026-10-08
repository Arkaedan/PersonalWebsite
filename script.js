// Loaded in <head> so a saved theme is applied before the page paints.
(function () {
  var root = document.documentElement;
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function currentTheme() {
    return root.dataset.theme || (prefersDark.matches ? "dark" : "light");
  }

  var saved = savedTheme();
  if (saved === "light" || saved === "dark") {
    root.dataset.theme = saved;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme-toggle");

    function render() {
      var next = currentTheme() === "dark" ? "light" : "dark";
      button.textContent = next;
      button.setAttribute("aria-label", "Switch to " + next + " mode");
    }

    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      render();
    });

    prefersDark.addEventListener("change", render);
    render();
    button.hidden = false;
  });
})();
