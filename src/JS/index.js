import { differenceInQuartersWithOptions } from "date-fns/fp";
import "../sass/main.scss";
import { de, gd } from "date-fns/locale";
import {
  handleProjectSubmission,
  renderProject,
  currentProjectId,
  projects,
} from "./projects";
import { addTodoElement } from "./todos";

// Related to form todo
const btnAddTodo = document.getElementById("btn-add-todo");
const formContainer = document.getElementById("form-container");
const btnCloseForm = document.getElementById("close-form");
const btnSubmitTodo = document.getElementById("btn-submit-todo");

// Related to projects
const projectsContainer = document.querySelector(".user-projects");
const projectTitle = document.getElementById("project-title");
const btnAddProject = document.getElementById("btn-add-project");
const proName = document.querySelector(".project-input");
const userProjectsList = document.querySelector(".user-projects");

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

  if (!todoTitle.value.trim()) return;

  const currentProject = projects.find((p) => p.id === currentProjectId);

  if (currentProject) {
    const newTodo = {
      title: todoTitle.value.trim(),
      description: todoDescription.value.trim(),
      notes: todoNotes.value.trim(),
    };
    currentProject.todos.push(newTodo);

    addTodoElement(todoTitle.value, todoDescription.value, todoNotes.value);
  }
  showForm();
  todoTitle.value = todoDescription.value = "";
  todoNotes = "Notes:";
});

export {
  projectTitle,
  proName,
  userProjectsList,
  btnAddProject,
  projectsContainer,
  mainTodo,
};
