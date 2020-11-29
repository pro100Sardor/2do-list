
/**********************************************************************************\
  *
  *  Briefly about the contents of the file
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

var todoTasks = [];

var elTodoTaskAddForm = $_('#todoTaskAddForm');
var elTodoTaskInput = $_('#todoTaskInput', elTodoTaskAddForm);
var elTodoList = $_('.todo-list');

var elTodoTaskTemplate = $_('#todoTaskTemplate').content;



/**********************************************************\
 *
 * THE SECOND-PART OF THE FILE WHERE THE FUNCTIONS ARE LOCATED
 *
\**********************************************************/

function addUserInputTasksArray(todoTask) {
  todoTasks.push(todoTask);
}

function addTodoTasksToTasksList(tasks) {
  var elTodoTasksFragment = document.createDocumentFragment();

  tasks.forEach(function (task) {
    var elTask = elTodoTaskTemplate.cloneNode(true);

    $_('.todo-task-text', elTask).textContent = task;

    elTodoTasksFragment.appendChild(elTask);
  });

  elTodoList.innerHTML = '';

  elTodoList.appendChild(elTodoTasksFragment);
}



/**********************************************************\
 *
 * THE THIRD-PART OF THE FILE WHERE THE BUSINESS LOGIC IS LOCATED
 *
\**********************************************************/

elTodoTaskAddForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  var todoTask = elTodoTaskInput.value.trim();
  if (isInputEmpty(todoTask)) {
    return;
  }

  addUserInputTasksArray(todoTask);

  elTodoTaskInput.value = '';

  addTodoTasksToTasksList(todoTasks);
});