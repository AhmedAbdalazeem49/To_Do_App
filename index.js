/**
 * Student Tasks
 * [1] Use sweet alert If Input is Empty  "Done"
 * [2] Check If Task Is Exist             "Not Yet"
 * [3] Create Delete All Tasks            "Done"
 * [4] Create Finish All Tasks Button     "Done"
 * [5] Add Tasks To Local Storage         "Not Yet"
 */

// Setting Up Variables
let theInput = document.querySelector(".add-task input");
let plusButton = document.querySelector(".plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let completedTasks = document.querySelector(".completed-task span");
let deleteAll = document.querySelector(".delete-all");
let finishAll = document.querySelector(".finish-all");

// Focus on Input Field when page load
window.onload = function () {
  theInput.focus();
};

// Adding The Task
plusButton.onclick = function () {
  checkAddedTask();
};

function checkAddedTask() {
  if (theInput.value === "") {
    Swal.fire({
      icon: "error",
      title: "The Input Field is Empty",
    });
  } else {
    let noTasksMessage = document.querySelector(".no-tasks-message");

    // check if span with no tasks message is exist
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      // Remove No Task Message
      noTasksMessage.remove();
    }

    // Create main Span
    let mainSpan = document.createElement("span");

    // Create main Span Text
    let spanText = document.createTextNode(theInput.value);

    // Add span Text to the Main Span
    mainSpan.appendChild(spanText);

    // Add Class to main span
    mainSpan.className = "task-box";

    // Create delete button span
    let deleteButton = document.createElement("span");

    // Create delete button span text
    let deleteButtonText = document.createTextNode("Delete");

    // Add delete Button Text to the delete button span
    deleteButton.appendChild(deleteButtonText);

    // Add class to the delete button
    deleteButton.className = "delete";

    // Add delete button to the main span
    mainSpan.appendChild(deleteButton);

    // Add the main Span to the tasks Container
    tasksContainer.appendChild(mainSpan);

    theInput.value = "";

    // Focus on input field again
    theInput.focus();

    // Calculate Task
    calculateTasks();
  }
}
document.addEventListener("click", function (e) {
  // Delete Task
  if (e.target.classList.contains("delete")) {
    // Remove Current Task "Clicked One"
    e.target.parentNode.remove();

    // Calculate Task
    calculateTasks();

    // console.log(tasksContainer.children.length);

    // Check tasks number for each delete
    if (tasksContainer.children.length === 0) {
      createNoTasks();
    }
  }

  // Finish Task

  if (
    e.target.classList.contains("task-box") ||
    e.target.classList.contains("finished")
  ) {
    // Toggle Class "Finished"
    e.target.classList.toggle("finished");

    // Calculate Task
    calculateTasks();
  }
});

// Function To Create No Tasks Message

function createNoTasks() {
  // Create Message span Element
  let msgSpan = document.createElement("span");

  // Create MsgSpanText
  let msgSpanText = document.createTextNode("No Tasks For Now");

  // Add msgSpanText to the msgSpan
  msgSpan.appendChild(msgSpanText);

  // Add class to msgSpan Element
  msgSpan.className = "no-tasks-message";

  // Add msgSpan to the tasksContainer
  tasksContainer.appendChild(msgSpan);
}

// Function to calculate number of tasks "Finished or not"

function calculateTasks() {
  // Calculate All tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // Calculate completed Task
  completedTasks.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

// Function Delete All Tasks
deleteAll.onclick = deleteButton;
function deleteButton() {
  if (tasksContainer.children.length <= 1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "There is no tasks to delete",
    });
  } else {
    Array.from(tasksContainer.children).forEach((task) => {
      task.remove();
    });
    createNoTasks();
    tasksCount.innerHTML = `0`;
  }
}

// Function Finish All
finishAll.onclick = finishButton;

function finishButton() {
  Array.from(tasksContainer.children).forEach((task) => {
    task.classList.add("finished");
  });
  completedTasks.innerHTML = tasksContainer.children.length;
}
