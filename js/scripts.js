/**********************************************************************************\
  *
  * Briefly about the contents of the file
  *
  * The code consists of three main sections:
  *
  * 1. the first part is the part that links the DOM elements and stores some global variables
  * [ you can go to this section by searching for the word >>> FIRST-PART <<< ]
  *
  * 2. the second part is the part that contains all the functions in the project
  * [ you can go to this section by searching for the word >>> SECOND-PART <<< ]
  *
  * 3. the third part is the part where the business logic of the project is formed by combining the functions
  * [ you can go to this section by searching for the word >>> THIRD-PART <<< ]
  *
\***********************************************************************************/



/**********************************************************\
 *
 * THE FIRST-PART OF THE FILE THAT IS RELATED TO DOM ELEMENTS AND STORES SOME GLOBAL VARIABLES
 *
\**********************************************************/

var todoTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];

var todoTaskIdCounter = Number(localStorage.getItem('todoTaskIdCounter'));

var elTodoTaskAddForm = $_('#todoTaskAddForm');
var elTodoListItemsStatusCheckbox = $_('#todoListItemsStatusCheckbox', elTodoTaskAddForm);
var elAllTodoTaskComplatedController = $_('#allTodoTaskComplatedController', elTodoTaskAddForm);
var elTodoTaskInput = $_('#todoTaskInput', elTodoTaskAddForm);

var elTodoList = $_('#todoList');

var elTodoTaskCounter = $_('#todoTaskCounter');

var elTodoTaskTemplate = $_('#todoTaskTemplate').content;



/**********************************************************\
 *
 * THE SECOND-PART OF THE FILE WHERE THE FUNCTIONS ARE LOCATED
 *
\**********************************************************/

function updateLocalStorageCounter() {
  localStorage.setItem('todoTaskIdCounter', todoTaskIdCounter);
}

function updateLocalStorageTodoTasks() {
  localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
}

function addUserInputTasksArray(todoTask) {
  todoTasks.push(
    {
      id: ++todoTaskIdCounter,
      content: todoTask,
      completed: false
    }
  );

  updateLocalStorageCounter();
  updateLocalStorageTodoTasks();
  checkAllTasksComplated();

  elTodoTaskInput.value = '';
}

function addTodoTasksToTasksList(tasks) {
  var elTodoTasksFragment = document.createDocumentFragment();

  tasks.forEach(function (task) {
    var elTask = elTodoTaskTemplate.cloneNode(true);

    var elTodoItemStatusCheckbox = $_('.js-todo-item-status-checkbox', elTask);
    elTodoItemStatusCheckbox.checked = task.completed;
    elTodoItemStatusCheckbox.id = `todoTask${task.id}`;

    $_('.js-todo-item-status-controller-label', elTask).setAttribute('for', `todoTask${task.id}`)

    $_('.js-todo-list-item', elTask).dataset.todoListItemId = task.id;
    if (task.completed) {
      $_('.js-todo-task-text', elTask).innerHTML = `<del class="">${task.content}</del>`;
    } else {
      $_('.js-todo-task-text', elTask).innerHTML = task.content;
    }
    elTodoTasksFragment.appendChild(elTask);
  });

  updateLocalStorageTodoTasks();

  elTodoList.innerHTML = '';

  elTodoList.appendChild(elTodoTasksFragment);
}

function determineUncompletedTasksCount() {
  var uncompletedTasksCount = 0;

  todoTasks.forEach(function (todoTask) {
    if (!todoTask.completed) {
      uncompletedTasksCount++
    }
  });

  return uncompletedTasksCount;
}

function checkAllTasksComplated() {
  if (todoTasks.some(todoTask => todoTask.completed === false)) {
    elTodoListItemsStatusCheckbox.checked = false;
  } else if (todoTasks.every(todoTask => todoTask.completed === true)){
    elTodoListItemsStatusCheckbox.checked = true;
  }
}



/**********************************************************\
 *
 * THE THIRD-PART OF THE FILE WHERE THE BUSINESS LOGIC IS LOCATED
 *
\**********************************************************/

addTodoTasksToTasksList(todoTasks);

elTodoTaskCounter.textContent = determineUncompletedTasksCount();

elTodoTaskAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  var todoTask = elTodoTaskInput.value.trim();
  if (isInputEmpty(todoTask)) {
    return;
  }

  addUserInputTasksArray(todoTask);

  elTodoTaskCounter.textContent = determineUncompletedTasksCount();

  addTodoTasksToTasksList(todoTasks);
});


elTodoList.addEventListener('click', (evt) => {
  if (evt.target.matches('.js-todo-item-remove-button')) {

    var elTodoListItemId = evt.target.closest('.js-todo-list-item').dataset.todoListItemId;

    var todoTaskIndex = todoTasks.findIndex( todoTaskIndex => todoTaskIndex.id == elTodoListItemId );

    todoTasks.splice(todoTaskIndex, 1);

    addTodoTasksToTasksList(todoTasks);

    elTodoTaskCounter.textContent = determineUncompletedTasksCount();
  } else if (evt.target.matches('.js-todo-item-status-controller')) {
    var elTodoListItemId = evt.target.closest('.js-todo-list-item').dataset.todoListItemId;

    var todoTaskIndex = todoTasks.findIndex( todoTaskIndex => todoTaskIndex.id == elTodoListItemId );

    if (!(evt.target.parentNode.previousElementSibling.checked)) {
      todoTasks[todoTaskIndex].completed = true;
      checkAllTasksComplated();
    } else {
      todoTasks[todoTaskIndex].completed = false;
      checkAllTasksComplated();
    }

    addTodoTasksToTasksList(todoTasks);

    elTodoTaskCounter.textContent = determineUncompletedTasksCount();
  }
});

elAllTodoTaskComplatedController.addEventListener('click', function (evt) {
  var elTodoItemsStatusControllerLabel = evt.target.closest('.js-todo-items-status-controller-label');
  if (!elTodoItemsStatusControllerLabel.previousElementSibling.checked) {
    todoTasks.forEach(todoTask => {
      todoTask.completed = true;
    });

    addTodoTasksToTasksList(todoTasks);

    elTodoTaskCounter.textContent = determineUncompletedTasksCount();
  } else if (elTodoItemsStatusControllerLabel.previousElementSibling.checked) {
    todoTasks.forEach(todoTask => {
      todoTask.completed = false;
    });

    addTodoTasksToTasksList(todoTasks);

    elTodoTaskCounter.textContent = determineUncompletedTasksCount();
  }
});
