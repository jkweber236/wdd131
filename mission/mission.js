const themeSelector = document.getElementById("theme-selector");
const logo = document.getElementById("logo");
const body = document.body;

function changeTheme() {
   
   const selectedTheme = themeSelector.value;
   if (selectedTheme == "dark") {
      body.classList.add("dark");
      logo.src = "byui-logo_white.png";
   } else {
      body.classList.remove("dark");
      logo.src = "byui-logo.webp";
   }
}

themeSelector.addEventListener("change", changeTheme);