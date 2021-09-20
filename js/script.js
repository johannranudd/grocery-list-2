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

//***** FUNCTIONS *****
function displayItem(e) {
  e.preventDefault();
  const value = input.value;
  const id = new Date().getTime();

  if (value && !editFlag) {
    // create item
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
    alertFn("success", "Item added");
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value && editFlag) {
    // editElement.children[0].textContent = input.value;
    editElement.textContent = input.value;
    alertFn("success", "Item edited");
    setBackToDefault();
  } else {
    alertFn("danger", "please enter a value");
  }
}

function deleteItem(e) {
  const item = e.currentTarget.parentElement.parentElement;
  const id = item.dataset.id;
  item.remove();
  alertFn("danger", "Item deleted");
  removeFromLocalStorage(id);
  setBackToDefault();
}

function editItem(e) {
  const item = e.currentTarget.parentElement.parentElement;
  const p = e.currentTarget.parentElement.previousElementSibling;
  input.value = p.textContent;
  editElement = p;
  submitBtn.textContent = "Edit";
  editFlag = true;
  // editLocalStorage();
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

//***** LOCALSTORAGE *****
// const myText = "myText";
// const myValue = new Date().getTime();
// console.log(myValue);

function removeFromLocalStorage(id) {
  let getIt = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  const filteredGetIt = getIt.filter(function (filterItem) {
    return filterItem !== id;
    // console.log(filterItem);
  });
  console.log(filteredGetIt);
}

function addToLocalStorage(id, value) {
  const values = { id, value };
  let getIt = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
  getIt.push(values);

  localStorage.setItem("list", JSON.stringify(getIt));
}

function getLocalStorage(id, value) {
  // const values = { id, value };
  // localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

// getLocalStorage(myValue, myText);
