"use strict";
import {
  projectsContainer,
  projectTitle,
  proName,
  userProjectsList,
} from "./index";
import { renderTodoForProject } from "./todos";
let projects = [];
let nextProjectId = 1;
let currentProjectId = null;

// Get all projects
function getProjects() {
  const defaultProjects = document.querySelectorAll(".projects__default");
  let allProjects = [...defaultProjects];
  return allProjects;
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
    if (e.target.classList.contains("projects__user")) {
      const projectId = e.target.dataset.projectId;
      currentProjectId = parseInt(projectId);
      projectTitle.innerText = e.target.innerText.trim();
      renderTodoForProject(currentProjectId);
    } else if (e.target.closest(".icon-delete")) {
      deleteProject(e.target.closest(".projects__user"));
      projectTitle.innerText = "Inbox"; // To be edited to the project itself
    }
  }

  // Add click event listener to projectsContainer
  projectsContainer.addEventListener("click", handleClick);

  // Get all projects
  let projects = getProjects();

  // Add click event listeners to individual project elements
  projects.forEach((project) => {
    project.addEventListener("click", (e) => {
      projectTitle.innerText = project.innerText;
    });
  });
}

// renderProject();

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
  userProjectsList.insertAdjacentElement("beforeend", project);
  proName.value = "";
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
}

export {
  projects,
  getProjects,
  renderProject,
  submitProject,
  handleProjectSubmission,
  currentProjectId,
};
