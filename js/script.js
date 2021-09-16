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

    console.log(listItem);
    // add class
    // item innerHTML
    // create attr
    // set attr value
    // set artNode to item
    // get buttons
    // add eventlistener to btns
    // append to ul
    // display alert
    // add to local host
    // setBackToDefault
  } else if (value && editFlag) {
    // console.log("edit item");
  } else {
    // console.log("please enter value");
    alertFn("danger", "please enter a value");
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
