// Select the button, unordered list, and input field from the HTML document
// to facilitate task management functionality in the To-Do App.

let btn = document.querySelector("button");
let ul = document.querySelector("#task-list");
let input = document.querySelector("input");

btn.addEventListener("click", function () {
  // When the "Add Task" button is clicked, the value from the input field is retrieved,
  // a new list item is created, and it is appended to the task list (ul).

  // A delete button is also created for each new task, allowing users to remove tasks
  // from the list when clicked, enhancing task management.

  // Finally, the input field is cleared to allow for new task entries without manual deletion.
  let newTodo = input.value;
  if (newTodo.trim() === "") return;
  input.value = "";

  let li = document.createElement("li");
  li.innerText = newTodo;
  li.setAttribute("draggable", true);

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", function () {
    ul.removeChild(li);
  });

  li.appendChild(deleteBtn);
  ul.appendChild(li);

  addDragAndDropEvents(li);
});

// Drag-and-drop functionality
function addDragAndDropEvents(task) {
  task.addEventListener("dragstart", () => {
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
  });
}

ul.addEventListener("dragover", (e) => {
  e.preventDefault();
  const dragging = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(ul, e.clientY);
  if (afterElement == null) {
    ul.appendChild(dragging);
  } else {
    ul.insertBefore(dragging, afterElement);
  }
});

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

// Add drag-and-drop events to existing list items
ul.querySelectorAll("li").forEach(addDragAndDropEvents);
