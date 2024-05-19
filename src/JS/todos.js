"use strict";
import { format } from "date-fns";
import { mainTodo } from "./index";
import { inbox, projects, saveToLocalStorage } from "./projects";

function renderTodoForProject(projectId) {
  const project = projectId ? projects.find((p) => p.id === projectId) : inbox;
  if (!project) return;

  mainTodo.innerHTML = "";
  project.todos.forEach((todo) => {
    addTodoElement(
      todo.title,
      todo.description,
      todo.notes,
      todo.date,
      todo.priority,
      todo.completed,
    );
  });
}

function addTodoElement(
  title,
  description,
  notes,
  date,
  priority,
  completed = false,
) {
  let classPriority;

  switch (priority) {
    case "High":
      classPriority = "high";
      break;
    case "Medium":
      classPriority = "medium";
      break;
    case "Low":
      classPriority = "low";
      break;
    default:
      classPriority = "medium";
  }

  const newDate = format(new Date(date ? date : new Date()), "MM/dd/yyyy");
  const todoContainer = document.createElement("div");

  todoContainer.innerHTML = `

        <div class="todos ${completed ? "completed" : ""}" id="todos">
          <div class="todos__text">
            <h3 class="todos__text--title" id="todo-title">${title}</h3>
            <p class="todos__text--description" id="todo-description">
              ${description}
            </p>
            <textarea class="todos__text--notes">${notes}</textarea>
          </div>
          <div class="todos__things">
            <p class="todos__things--priority ${classPriority}" >${priority ? priority : "Medium"}</p>
            <p class="todos__things--date">${newDate ? newDate : ""}</p>

            <label class="todos__things--check-container"
              >Done
              <input type="checkbox" ${completed ? "checked" : ""} />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
`;

  mainTodo.insertAdjacentElement("afterbegin", todoContainer);
  markTodo();
}

function markTodo() {
  const todoChecked = document.querySelectorAll('[type="checkbox"]');

  todoChecked.forEach((button) =>
    button.addEventListener("change", (e) => {
      const title = e.target
        .closest(".todos")
        .querySelector(".todos__text--title").textContent;

      if (button.checked) {
        e.target.closest(".todos").classList.add("completed");
      } else {
        e.target.closest(".todos").classList.remove("completed");
      }
      updateTodoCompletedState(title, button.checked);
    }),
  );
}

// Update the completed state in the todo array and localStorage
function updateTodoCompletedState(title, completed) {
  [inbox, ...projects].forEach((project) => {
    project.todos.forEach((todo) => {
      if (todo.title === title) {
        todo.completed = completed;
      }
    });
  });
  saveToLocalStorage();
}

export { markTodo, renderTodoForProject, addTodoElement };
