let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let input = document.querySelector("input");

btn.addEventListener("click", function () {

    // When the "Add Task" button is clicked, the value from the input field is retrieved,
    // a new list item is created, and it is appended to the task list (ul).

    // A delete button is also created for each new task, allowing users to remove tasks 
    // from the list when clicked, enhancing task management.

    // Finally, the input field is cleared to allow for new task entries without manual deletion.
    let newTodo = input.value;
    input.value = "";

    let li = document.createElement("li");
    li.innerText = newTodo;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function () {
        ul.removeChild(li);
    });

    li.appendChild(deleteBtn);
    ul.appendChild(li);
});

// Select the button, unordered list, and input field from the HTML document 
// to facilitate task management functionality in the To-Do App.

btn.addEventListener("click", function () {

});

