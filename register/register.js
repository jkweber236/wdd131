import { participantTemplate, successTemplate } from './templates.js';

let participantCount = 1;

document.addEventListener("DOMContentLoaded", () => {
   const form = document.querySelector("form");

   const addButton = document.querySelector("#add");

   addButton.addEventListener("click", () => {
      participantCount++;
      const participantHTML = participantTemplate(participantCount);

      addButton.insertAdjacentHTML("beforebegin", participantHTML);
   });

   form.addEventListener("submit", submitForm);
});

function submitForm(event) {
   event.preventDefault();

   const total = totalFees();
   const adultName = document.querySelector("#adult_name").value;

   const summaryElement = document.querySelector("#summary");
   summaryElement.innerHTML = successTemplate({
      name: adultName,
      participants: participantCount,
      totalFees: total
   });

   document.querySelector("form").style.display = "none";
   summaryElement.style.display = "block";
}

function totalFees() {
   // the selector below lets us grab any element that has an id that begins with "fee"
   let feeElements = document.querySelectorAll("[id^=fee]");
   console.log(feeElements);
   // querySelectorAll returns a NodeList. It's like an Array, but not exactly the same.
   // The line below is an easy way to convert something that is list-like to an actual Array so we can use all of the helpful Array methods...like reduce
   // The "..." is called the spread operator. It "spreads" apart the list, then the [] we wrapped it in inserts those list items into a new Array.
   feeElements = [...feeElements];
   // sum up all of the fees. Something like Array.reduce() could be very helpful here :) Or you could use a Array.forEach() as well.
   const total = feeElements.reduce((sum, feeElement) => {
   // Remember that the text that was entered into the input element will be found in the .value of the element.
      const fee = Number(feeElement.value);
      return sum + (fee || 0);
   }, 0);
   // once you have your total make sure to return it!
   return total;
}