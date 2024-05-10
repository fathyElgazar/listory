import { differenceInQuartersWithOptions } from 'date-fns/fp';
import '../sass/main.scss';
import { de, gd } from 'date-fns/locale';

let projects = [];
// const formContainer = document.getElementById('form-container');
// const btnCloseForm = document.getElementById('close-form');
// btnAddProject.addEventListener('click', (e) => {
//   formContainer.classList.toggle('show');
// });

// btnCloseForm.addEventListener('click', (e) => {
//   formContainer.classList.toggle('show');
// });
const projectTitle = document.getElementById('project-title');
const btnAddProject = document.getElementById('btn-add-project');
const proName = document.querySelector('.project-input');
const userProjectsList = document.querySelector('.user-projects');

// Get all projects
function getProjects() {
  const defaultProjects = document.querySelectorAll('.projects__default');
  let userProjects = document.querySelectorAll('.projects__user');
  let allProjects = [...defaultProjects, ...userProjects];
  return allProjects;
}

// Handle project name in the main side
function renderProject() {
  let projects = getProjects();
  let projectName = projects.forEach((project) => {
    project.addEventListener('click', (e) => {
      projectTitle.innerText = project.innerText;
    });
  });
}

renderProject();

// Handle project submission
function handleProjectSubmission(e) {
  e.preventDefault();
  submitProject();
  renderProject();
}

btnAddProject.addEventListener('click', handleProjectSubmission);

proName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    // Prevent default form submission if Enter is pressed within the input field
    handleProjectSubmission(e);
  }
});

function submitProject() {
  proName.value.trim();
  if (!proName.value) return;
  let project = document.createElement('li');
  project.innerHTML = `
  <button class="projects__user">
  <svg class="icon icon-user">
  <use xlink:href="images/sprite.svg#icon-folder"></use>
  </svg>
  ${proName.value}
  <svg class="icon icon-delete">
  <use
    xlink:href="images/sprite.svg#icon-circle-with-minus"
  ></use>
</svg>
  </button>
  
  `;
  userProjectsList.insertAdjacentElement('beforeend', project);
  proName.value = '';
}
