const alert = document.querySelector(".alert");
const input = document.querySelector("#grocery-input");
const submitBtn = document.querySelector(".submit-btn");
const ul = document.querySelector(".list");
const clearBtn = document.querySelector(".clear-btn");
const form = document.querySelector("#form1");

let editFlag = false;
let editID = "";
let editElement;

//***** EVENT LISTENERS *****
form.addEventListener("submit", displayItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItems);

//***** FUNCTIONS *****
function displayItem(e) {
  e.preventDefault();
  const value = input.value;
  const id = new Date().getTime();

  if (value && !editFlag) {
    // create item
    createItem(id, value);

    alertFn("success", "Item added");
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value && editFlag) {
    // editElement.children[0].textContent = input.value;
    editElement.textContent = input.value;
    alertFn("success", "Item edited");
    editLocalStorage(editID);
    setBackToDefault();
  } else {
    alertFn("danger", "please enter a value");
  }
}

function clearItems() {
  const listItem = ul.querySelectorAll(".list-item");
  listItem.forEach(function (item) {
    item.remove();
  });
  alertFn("danger", "List cleared");
  setBackToDefault();
  localStorage.clear();
}

function setBackToDefault() {
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Add";
  input.value = "";
  if (ul.children.length === 0) {
    clearBtn.classList.remove("display-block");
  }
}

function alertFn(action, text) {
  alert.classList.add(`alert-${action}`);
  alert.textContent = text;

  setTimeout(function () {
    alert.classList.remove(`alert-${action}`);
    alert.textContent = "";
  }, 1000);
}

function deleteItem(e) {
  const item = e.currentTarget.parentElement.parentElement;
  const id = parseInt(item.dataset.id);
  ul.removeChild(item);
  alertFn("danger", "Item deleted");
  removeFromLocalStorage(id);
  setBackToDefault();
}

function editItem(e) {
  const item = e.currentTarget.parentElement.parentElement;
  const id = parseInt(item.dataset.id);
  const p = e.currentTarget.parentElement.previousElementSibling;
  input.value = p.textContent;
  editElement = p;
  submitBtn.textContent = "Edit";
  editFlag = true;
  editID = id;
}

//***** LOCALSTORAGE *****
// const myText = "myText";
// const myValue = new Date().getTime();
// console.log(myValue);

function editLocalStorage(id) {
  let getIt = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  const filterGet = getIt.filter(function (item) {
    if (item.id === id) {
      item.value = input.value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(filterGet));
}

function removeFromLocalStorage(id) {
  let getIt = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  const filterGet = getIt.filter(function (item) {
    return item.id !== id;
  });
  localStorage.setItem("list", JSON.stringify(filterGet));
}

function addToLocalStorage(id, value) {
  const values = { id, value };
  let getIt = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  getIt.push(values);

  localStorage.setItem("list", JSON.stringify(getIt));
}

// !move

function createItem(id, value) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  const attr = document.createAttribute("data-id");
  attr.value = id;
  listItem.setAttributeNode(attr);
  listItem.innerHTML = `<p>${value}</p><div class="buttons">
    <button class="btn edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button class="btn delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;

  const deleteBtn = listItem.querySelector(".delete-btn");
  const editBtn = listItem.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  ul.appendChild(listItem);
  clearBtn.classList.add("display-block");
}

// ***** SETUP ITEMS *****

function setupItems() {
  let getIt = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  const mapOut = getIt.map(function (item) {
    createItem(item.id, item.value);
  });
}
