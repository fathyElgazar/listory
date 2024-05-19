import { differenceInQuartersWithOptions } from "date-fns/fp";
import "../sass/main.scss";
import { de, gd } from "date-fns/locale";
import {
  handleProjectSubmission,
  renderProject,
  currentProjectId,
  projects,
  inbox,
} from "./projects";
import { addTodoElement } from "./todos";

// Related to form todo
const btnAddTodo = document.getElementById("btn-add-todo");
const formContainer = document.getElementById("form-container");
const btnCloseForm = document.getElementById("close-form");
const btnSubmitTodo = document.getElementById("btn-submit-todo");

// Related to projects
const projectsContainer = document.querySelectorAll(".projects");
const projectTitle = document.getElementById("project-title");
const btnAddProject = document.getElementById("btn-add-project");
const proName = document.querySelector(".project-input");
const userProjectsList = document.querySelector(".user-projects");
const allProjectsConatiner = [...projectsContainer];

// Related to todos:
const mainTodo = document.getElementById("todo-container");

function showForm() {
  formContainer.classList.toggle("show");
}

renderProject();
btnAddTodo.addEventListener("click", showForm);

btnCloseForm.addEventListener("click", showForm);

btnAddProject.addEventListener("click", handleProjectSubmission);

proName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleProjectSubmission(e);
  }
});

btnSubmitTodo.addEventListener("click", (e) => {
  e.preventDefault();

  let todoTitle = document.getElementById("input-todo-title");
  let todoDescription = document.getElementById("input-todo-description");
  let todoNotes = document.querySelector(".todo-form__textarea");
  let todoDate = document.getElementById("date").value;
  let todoPriority = document.querySelector('[name="priority"]:checked');
  const radioButtons = document.querySelectorAll(
    'input[type="radio"][name="priority"]',
  );

  if (!todoTitle.value.trim()) return;

  if (!todoDate) {
    todoDate = new Date();
  }

  if (!todoPriority) {
    todoPriority = "Medium";
  } else todoPriority = todoPriority.value;

  const currentProject = currentProjectId
    ? projects.find((p) => p.id === currentProjectId)
    : inbox;

  if (currentProject) {
    const newTodo = {
      title: todoTitle.value.trim(),
      description: todoDescription.value.trim(),
      notes: todoNotes.value.trim(),
      priority: todoPriority,
      date: todoDate,
    };
    currentProject.todos.push(newTodo);
    addTodoElement(
      todoTitle.value,
      todoDescription.value,
      todoNotes.value,
      todoDate,
      todoPriority,
    );
  }
  console.log(currentProject);
  showForm();
  todoTitle.value = todoDescription.value = "";
  todoNotes.value = "Notes!";
  todoDate.value = "";
  todoPriority = "";

  // Reset Radio buttons
  radioButtons.forEach((button) => {
    button.checked = false;
  });
});

export {
  projectTitle,
  proName,
  userProjectsList,
  btnAddProject,
  projectsContainer,
  mainTodo,
  allProjectsConatiner,
};
