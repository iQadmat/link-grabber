import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
  databaseURL:
    "https://link-grabber-app-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "links");

const userInput = document.querySelector("#user-input");
const saveLink = document.querySelector("#save-link");
const clearAll = document.querySelector("#clear-all");
const outputInput = document.querySelector("#links");

saveLink.addEventListener("click", () => {
  // Storing URLs in the Database
  push(referenceInDB, userInput.value);

  // Appending the URL
  outputInput.innerHTML += `<li><a href="${userInput.value}" target="_blank">${userInput.value}</a></li>`;

  // Clearing out UserInputField
  userInput.value = "";
});

clearAll.addEventListener("dblclick", () => {
  remove(referenceInDB);
  outputInput.innerHTML = "";
});

function renderLinks(array) {
  array.forEach((link) => {
    outputInput.innerHTML += `<li><a href="${link}" target="_blank">${link}</a></li>`;
  });
}

onValue(referenceInDB, function (snapshot) {
  if (snapshot.exists()) {
    const links = Object.values(snapshot.val());
    renderLinks(links);
  }
});
