let applications = JSON.parse(localStorage.getItem("applications")) || [];

document.addEventListener("DOMContentLoaded", function() {
   const addApplicationForm = document.querySelector(".add-application");
   if (addApplicationForm) {
      addApplicationForm.addEventListener("submit", function(event) {
         event.preventDefault();

         var company = document.getElementById("company").value;
         var status = document.getElementById("status").value;
         var interest = document.getElementById("interest").value;
         var date = document.getElementById("application-date").value;
         var applicationLink = document.getElementById("application-link").value;
         var details = document.getElementById("additional-details").value;

         const formData = { 
            company: company, 
            status: status, 
            interest: interest, 
            date: date, 
            applicationLink: applicationLink, 
            details: details
         };

         applications.push(formData);

         localStorage.setItem("applications", JSON.stringify(applications));

         alert("Application data saved!");
         addApplicationForm.reset();
   })}
});

function displayApplications() {
   const list = document.getElementById("application-list");

   if (list) {
      list.innerHTML = '';
      applications.forEach((application, index) => {
         list.innerHTML += applicationTemplate(application, index);
      });
   }
}

document.querySelectorAll(".edit-button").forEach((button, index) => {
   button.onclick = () => editApplication(index);
});

document.querySelectorAll(".delete-button").forEach((button, index) => {
   button.onclick = () => deleteApplication(index);
});

document.querySelectorAll(".details-dropdown").forEach(button => {
   button.addEventListener("click", function () {
      const moreDetails = this.nextElementSibling;
      if (moreDetails.style.display === "none") {
         moreDetails.style.display = "block";
      } else {
         moreDetails.style.display = "none";
      }
   });
});

document.addEventListener("DOMContentLoaded", () => {
   const list = document.getElementById("application-list");

   if (list) {
      list.addEventListener("click", (event) => {
         const editButton = event.target.closest(".edit-button");
         const deleteButton = event.target.closest(".delete-button");
         const dropdownButton = event.target.closest(".details-dropdown");

         if (editButton) {
            const index = editButton.dataset.index;
            editApplication(Number(index));
         }

         if (deleteButton) {
            const index = deleteButton.dataset.index;
            deleteApplication(Number(index));
         }

         if (dropdownButton) {
            const moreDetails = dropdownButton.closest('.application-card').querySelector('.more-details');
            moreDetails.style.display = (moreDetails.style.display === "none" ? "block" : "none");
         }
      });
   }
});

function applicationTemplate(application, index) {

   const screenWidth = window.innerWidth;
   let content;
   let interestColorClass = ''; 

   if (application.interest === "High") {
      interestColorClass = "high-interest";
   } else if (application.interest === "Medium") {
      interestColorClass = "medium-interest";
   } else if (application.interest === "Low") {
      interestColorClass = "low-interest";
   }

   if (screenWidth >= 800) {
      content = `
         <p class="interest ${interestColorClass}">${application.interest}</p>
         <p class="company-name">${application.company}</p>
         <p>${application.status}</p>
      `;
   } else {
      content = `
         <p class="company-name">Company: ${application.company}</p>
         <p class="interest ${interestColorClass}">Interest: ${application.interest}</p>
         <p>Status: ${application.status}</p>
      `;
   }

   return `
      <li class="application-item">
         <div class="application-card">
            <div class="main-details">
               ${content}
               <button type="button" class="delete-button" data-index="${index}">
                  <img src="images/delete.png" alt="Delete button">
               </button>
               <button type="button" class="edit-button" data-index="${index}">
                  <img src="images/edit.png" alt="Edit button">
               </button>
               <button type="button" class="details-dropdown">
                  <img src="images/drop-down-arrow.png" alt="Drop down button">
               </button>
            </div>
            <div class="more-details" style="display: none;">
               <p class="detail-title">Application Date</p>
               <p>${application.date}</p>
               <p class="detail-title">Application Link</p>
               <p>${application.applicationLink}</p>
               <p class="detail-title">Additional Details</p>
               <p>${application.details}</p>
            </div>
         </div>
      </li>
   `;
}

// Function to update the display when the window resizes
function updateDisplay() {
   const list = document.getElementById("application-list");

   if (list) {
      list.innerHTML = '';
      applications.forEach((application, index) => {
         list.innerHTML += applicationTemplate(application, index);
      });
   }
}

window.addEventListener("resize", updateDisplay);

function editApplication(index) {
   const application = applications[index];

   let editForm = document.querySelector(".edit-application");
   if (!editForm) {
      editForm = document.createElement("form");
      editForm.classList.add("edit-application");
      editForm.innerHTML = `
         <fieldset>
            <legend>Edit Application</legend>
            <label for="edit-company">Company</label><br>
            <input type="text" name="edit-company" id="edit-company"><br>

            <label for="edit-status">Status</label><br>
            <select id="edit-status" name="edit-status">
               <option value="Accepted" ${application.status === "Accepted" ? "selected" : ""}>Accepted</option>
               <option value="Pending" ${application.status === "Pending" ? "selected" : ""}>Pending</option>
               <option value="Rejected" ${application.status === "Rejected" ? "selected" : ""}>Rejected</option>
            </select><br>

            <label for="edit-interest">Interest</label><br>
            <select id="edit-interest" name="edit-interest">
               <option value="High" ${application.interest === "High" ? "selected" : ""}>High</option>
               <option value="Medium" ${application.interest === "Medium" ? "selected" : ""}>Medium</option>
               <option value="Low" ${application.interest === "Low" ? "selected" : ""}>Low</option>
            </select><br>

            <label for="edit-date">Application Date</label><br>
            <input type="date" name="edit-date" id="edit-date"><br>

            <label for="edit-link">Application Link</label><br>
            <input type="url" name="edit-link" id="edit-link"><br>

            <label for="edit-details">Additional Details</label><br>
            <textarea name="edit-details" id="edit-details"></textarea><br>

            <button type="submit">Save Changes</button>
         </fieldset>
      `

      const list = document.getElementById("application-list");
      if (list) {
         list.insertAdjacentElement('beforebegin', editForm); 
      }
   }

   document.getElementById("edit-company").value = application.company;
   document.getElementById("edit-status").value = application.status;
   document.getElementById("edit-interest").value = application.interest;
   document.getElementById("edit-date").value = application.date;
   document.getElementById("edit-link").value = application.applicationLink;
   document.getElementById("edit-details").value = application.details;

   editForm.onsubmit = function (event) {
      event.preventDefault();

      applications[index] = {
         company: document.getElementById("edit-company").value,
         status: document.getElementById("edit-status").value,
         interest: document.getElementById("edit-interest").value,
         date: document.getElementById("edit-date").value,
         applicationLink: document.getElementById("edit-link").value,
         details: document.getElementById("edit-details").value
      };

      localStorage.setItem("applications", JSON.stringify(applications));

      alert("Application updated!");
      editForm.remove();
      location.reload();
   }
}

function deleteApplication(index) {
   applications.splice(index, 1);
   localStorage.setItem("applications", JSON.stringify(applications));
   location.reload();

   alert("Application deleted")
}

function renderApplications(applicationToRender) {
   const list = document.getElementById("application-list");
   if (list) {
      list.innerHTML = "";

      applicationToRender.forEach((application, index) => {
         list.innerHTML += applicationTemplate(application, index);
      });
   }
}

function filterApplications(query) {
   return applications.filter(application =>
      (application.company || "").toLowerCase().includes(query) ||
      (application.status || "").toLowerCase().includes(query) ||
      (application.interest || "").toLowerCase().includes(query) ||
      (application.date || "").toLowerCase().includes(query) ||
      (application.applicationLink || "").toLowerCase().includes(query) ||
      (application.details || "").toLowerCase().includes(query)
   )
}

const searchForm = document.querySelector(".search-form");
const userSearch = document.querySelector("#search");

if (searchForm) {
   searchForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const searchInput = userSearch.value.trim().toLowerCase();
      const filteredApplications = filterApplications(searchInput);
      const sortedApplications = filteredApplications.sort((a, b) => a.company.localeCompare(b.company));
      renderApplications(sortedApplications);
   });
}

displayApplications();