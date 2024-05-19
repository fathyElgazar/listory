"use strict";
import {
  projectsContainer,
  projectTitle,
  proName,
  userProjectsList,
  allProjectsConatiner,
} from "./index";
import { renderTodoForProject } from "./todos";

let projects = [];
let nextProjectId = 1;
let currentProjectId = null;

const inbox = {
  name: "Inbox",
  todos: [],
};

// Save projects and inbox to localStorage
function saveToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("inbox", JSON.stringify(inbox));
}

// Load projects and inbox from localStorage
function loadFromLocalStorage() {
  const storedProjects = localStorage.getItem("projects");
  const storedInbox = localStorage.getItem("inbox");
  if (storedProjects) {
    projects = JSON.parse(storedProjects);
    nextProjectId = projects.length
      ? Math.max(...projects.map((p) => p.id)) + 1
      : 1;
  }

  if (storedInbox) {
    inbox.todos = JSON.parse(storedInbox).todos;
  }
}

// Construct Projects
function createProject(name) {
  return {
    id: nextProjectId++,
    name,
    todos: [],
  };
}

// Handle project name in the main side
function renderProject() {
  // Ensure projectsContainer is initialized
  if (!projectsContainer) {
    return;
  }

  function handleClick(e) {
    const target = e.target.closest("button");
    if (!target) return;

    const isUserProject = target.classList.contains("projects__user");
    const isDefaultProject = target.classList.contains("projects__default");

    if (isUserProject || isDefaultProject) {
      const projectId = isUserProject ? target.dataset.projectId : null;
      currentProjectId = projectId ? parseInt(projectId) : null; // Update current project, set to null for Inbox
      projectTitle.innerText = target.innerText.trim();
      renderTodoForProject(currentProjectId); // Render todos for selected project or Inbox
    }
    if (e.target.closest(".icon-delete")) {
      deleteProject(e.target.closest(".projects__user"));
      projectTitle.innerText = "Inbox";
      currentProjectId = null; // Reset to Inbox
      renderTodoForProject(null); // Render todos for Inbox
    }
  }

  // Add click event listener to projectsContainer
  allProjectsConatiner.forEach((projectContainer) =>
    projectContainer.addEventListener("click", handleClick),
  );
}

function renderSavedProjects() {
  //  userProjectsList.innerHTML = "";
  projects.forEach((project) => {
    let projectElement = document.createElement("li");
    projectElement.innerHTML = `
      <button class="projects__user" data-project-id="${project.id}">
        <svg class="icon icon-user">
          <use xlink:href="images/sprite.svg#icon-folder"></use>
        </svg>
        ${project.name}
        <svg class="icon icon-delete">
          <use xlink:href="images/sprite.svg#icon-circle-with-minus"></use>
        </svg>
      </button>
    `;
    userProjectsList.appendChild(projectElement);
  });
}

function submitProject() {
  let projectName = proName.value.trim();
  if (!projectName) return;
  const newProject = createProject(projectName);
  projects.push(newProject);
  let project = document.createElement("li");
  project.innerHTML = `
  <button class="projects__user" data-project-id="${newProject.id}">
  <svg class="icon icon-user">
  <use xlink:href="images/sprite.svg#icon-folder"></use>
  </svg>
  ${projectName}
  <svg class="icon icon-delete">
  <use
    xlink:href="images/sprite.svg#icon-circle-with-minus"
  ></use>
</svg>
  </button>
  
  `;

  userProjectsList.appendChild(project);
  proName.value = "";
  saveToLocalStorage();
}

// Handle project submission
function handleProjectSubmission(e) {
  e.preventDefault();
  submitProject();
  renderProject();
}

function deleteProject(projectButton) {
  const projectId = parseInt(projectButton.dataset.projectId);

  // Find the index of the project in the projects array based on its ID
  const projectIndex = projects.findIndex((p) => p.id === projectId);

  if (projectIndex !== -1) {
    // Remove the project from the array
    projects.splice(projectIndex, 1);

    // Remove the corresponding list item from the DOM
    projectButton.parentElement.remove();
  } else {
    // console.error('Project not found');
  }
  saveToLocalStorage();
}

export {
  projects,
  renderProject,
  submitProject,
  handleProjectSubmission,
  currentProjectId,
  inbox,
  saveToLocalStorage,
  loadFromLocalStorage,
  renderSavedProjects,
};
