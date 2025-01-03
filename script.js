const btn = document.querySelector("button");
const ul = document.querySelector("ul");
const input = document.querySelector("input");
const themeSwitch = document.getElementById("theme-switch");

// Dark mode toggle
const toggleDarkMode = () => {
  const isDark = document.body.classList.toggle("darkmode");
  localStorage.setItem("darkmode", isDark ? "active" : null);
};

// Initialize dark mode if previously active
if (localStorage.getItem("darkmode") === "active") {
  document.body.classList.add("darkmode");
}

themeSwitch.addEventListener("click", toggleDarkMode);

// Drag-and-drop functionality
function addDragAndDropHandlers() {
  document.querySelectorAll("li").forEach((item) => {
    item.setAttribute("draggable", "true");

    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.id);
      e.target.classList.add("dragging");
    });

    item.addEventListener("dragend", (e) => {
      e.target.classList.remove("dragging");
    });
  });

  ul.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(ul, e.clientY);

    if (!afterElement) {
      ul.appendChild(draggingItem);
    } else {
      ul.insertBefore(draggingItem, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      return offset < 0 && offset > closest.offset
        ? { offset, element: child }
        : closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Add new task functionality
btn.addEventListener("click", () => {
  const newTodo = input.value.trim();

  if (!newTodo) {
    alert("Please enter a task!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = newTodo;
  li.draggable = true;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => ul.removeChild(li));

  li.appendChild(deleteBtn);
  ul.appendChild(li);
  input.value = "";

  addDragAndDropHandlers();
});

// Initial call to set up drag-and-drop for existing items
addDragAndDropHandlers();
