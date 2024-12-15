let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let input = document.querySelector("input");

// Dark mode toggle
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const toggleDarkMode = () => {
  const isDark = document.body.classList.toggle("darkmode");
  localStorage.setItem("darkmode", isDark ? "active" : null);
};

if (darkmode === "active") {
  document.body.classList.add("darkmode");
}

themeSwitch.addEventListener("click", toggleDarkMode);

// Drag-and-drop functionality
function addDragAndDropHandlers() {
  let listItems = document.querySelectorAll("li");

  listItems.forEach((item) => {
    item.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", e.target.id);
      e.target.classList.add("dragging");
    });

    item.addEventListener("dragend", function () {
      e.target.classList.remove("dragging");
    });
  });

  ul.addEventListener("dragover", function (e) {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(ul, e.clientY);
    if (afterElement == null) {
      ul.appendChild(draggingItem);
    } else {
      ul.insertBefore(draggingItem, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll("li:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Add new task functionality
btn.addEventListener("click", function () {
  let newTodo = input.value;
  if (newTodo.trim() === "") {
    alert("Please enter a task!");
    return;
  }
  input.value = "";

  let li = document.createElement("li");
  li.innerText = newTodo;
  li.draggable = true;

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function () {
    ul.removeChild(li);
  });

  li.appendChild(deleteBtn);
  ul.appendChild(li);

  addDragAndDropHandlers();
});

addDragAndDropHandlers();
