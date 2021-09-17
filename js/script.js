const alert = document.querySelector(".alert");
const input = document.querySelector("#grocery-input");
const submitBtn = document.querySelector(".submit-btn");
const ul = document.querySelector(".ul");
const clearBtn = document.querySelector(".clear-btn");
const form = document.querySelector("#form1");

let editFlag = false;
let editID = "";

//***** EVENT LISTENERS *****
form.addEventListener("submit", displayItem);
clearBtn.addEventListener("click", clearItems);

//***** FUNCTIONS *****
function displayItem(e) {
  e.preventDefault();
  const value = input.value;
  const id = new Date().getTime();

  if (value && !editFlag) {
    // console.log("add item");

    // create item
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    listItem.setAttributeNode(attr);
    listItem.innerHTML = `${value}<div class="buttons">
    <button class="btn edit-btn">
      <i class="fas fa-edit"></i>
    </button>
    <button class="btn delete-btn">
      <i class="fas fa-trash"></i>
    </button>
  </div>`;

    const editBtn = listItem.querySelector(".edit-btn");
    const deleteBtn = listItem.querySelector(".delete-btn");

    ul.appendChild(listItem);
    clearBtn.classList.add("display-block");
    alertFn("success", "Item added");
    // addToLocalHost(value, id);
    setBackToDefault();
    // get buttons
    // add eventlistener to btns
  } else if (value && editFlag) {
    // console.log("edit item");
  } else {
    // console.log("please enter value");
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
//***** LOCALHOST *****
