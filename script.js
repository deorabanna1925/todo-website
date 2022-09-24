const body = document.body;

const todo = document.querySelector(".todo");
const doing = document.querySelector(".doing");
const done = document.querySelector(".done");

var savedState = false;

loadState();

function addTask() {
  const task = prompt("Enter a task");
  if (task === null) return;
  const card = document.createElement("div");
  card.classList.add("card");
  var taskText = document.createElement("p");
  taskText.classList.add("task");
  taskText.textContent = task;
  card.appendChild(taskText);
  var time = document.createElement("p");
  time.classList.add("time");
  time.textContent = new Date().toLocaleString();
  var buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");
  var doingButton = document.createElement("button");
  doingButton.classList.add("doing-button");
  doingButton.textContent = "Doing";
  doingButton.title = "Move to Doing";
  doingButton.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
      doing.appendChild(card);
      doingButton.remove();
      time.textContent = new Date().toLocaleString();
    }
  });
  var doneButton = document.createElement("button");
  doneButton.classList.add("done-button");
  doneButton.textContent = "Done";
  doneButton.title = "Move to Done";
  doneButton.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
    done.appendChild(card);
    doingButton.remove();
    doneButton.remove();
    time.textContent = new Date().toLocaleString();
    }
  });
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  deleteButton.title = "Delete";
  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
    card.remove();
    }
  });
  buttonsDiv.appendChild(doingButton);
  buttonsDiv.appendChild(doneButton);
  buttonsDiv.appendChild(deleteButton);
  card.appendChild(time);
  card.appendChild(buttonsDiv);
  todo.appendChild(card);
}

function saveState() {
  localStorage.setItem("todo", todo.innerHTML);
  localStorage.setItem("doing", doing.innerHTML);
  localStorage.setItem("done", done.innerHTML);
}

function loadState() {
  todo.innerHTML = localStorage.getItem("todo");
  doing.innerHTML = localStorage.getItem("doing");
  done.innerHTML = localStorage.getItem("done");
}

setInterval(() => {
  if (savedState === false) {
    savedState = true;
    saveState();
    console.log("saved");
  }
}, 5000);

body.addEventListener("DOMSubtreeModified", () => {
  savedState = false;
});
