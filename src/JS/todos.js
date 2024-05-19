"use strict";
import { format } from "date-fns";
import { mainTodo } from "./index";
import { inbox, projects } from "./projects";

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
    );
  });
}

function addTodoElement(title, description, notes, date, priority) {
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

        <div class="todos" id="todos">
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
              <input type="checkbox" />
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
`;

  mainTodo.insertAdjacentElement("beforeend", todoContainer);
}

export { renderTodoForProject, addTodoElement };
