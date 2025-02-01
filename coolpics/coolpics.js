const menuButton = document.querySelector(".menu-button");
const menuItems = document.querySelector("nav ul");

function toggleMenu() {
   menuItems.classList.toggle("hide");
}

function handleResize() {
   if (window.innerWidth >= 1000) {
      menuItems.classList.remove("hide");
   } else {
      menuItems.classList.add("hide");
   }
}

function viewerTemplate(pic, alt) {
   return `<div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${pic}" alt="${alt}">
   </div>`;
}

function closeViewer() {
   document.querySelector(".viewer").remove();
}

function viewHandler(event) {
   // create a variable to hold the element that was clicked on from event.target
   const clickedImage = event.target;

	// get the src attribute from that element and 'split' it on the "-"
   const src = clickedImage.getAttribute("src");
   const parts = src.split("-");

	// construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
   const fileName = `${parts[0]}-full.jpeg`;

	// insert the viewerTemplate into the top of the body element
	// (element.insertAdjacentHTML("afterbegin", htmltoinsert))
   document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fileName, clickedImage.alt));

	// add a listener to the close button (X) that calls a function called closeViewer when clicked
   document.querySelector(".close-viewer").addEventListener("click", closeViewer);
}

handleResize();
window.addEventListener("resize", handleResize);
menuButton.addEventListener("click", toggleMenu);
document.querySelector(".gallery").addEventListener("click", viewHandler)