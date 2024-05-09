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
const defaultProjects = document.querySelectorAll('.projects__default');
const userProjects = document.querySelectorAll('.projects__user');
let allProjects = [...defaultProjects, ...userProjects];

// Handle project name in the main side
let projectName = allProjects.forEach((project) => {
  project.addEventListener('click', (e) => {
    projectTitle.innerText = project.innerText;
  });
});

btnAddProject.addEventListener('click', (e) => {
  e.preventDefault();
  submitProject();
});

proName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent default form submission if Enter is pressed within the input field
    submitProject();
  }
});

function submitProject() {
  proName.value.trim();
  if (!proName.value) return;
  console.log(proName.value);
  let project = document.createElement('li');
  project.innerHTML = `
  <button class="projects__user">
  <svg class="icon icon-user">
  <use xlink:href="images/sprite.svg#icon-folder"></use>
  </svg>
  ${proName.value}
  <span class="btn-delete--project">X</span>
  </button>
  
  `;
  userProjectsList.insertAdjacentElement('beforeend', project);
  proName.value = '';
}
