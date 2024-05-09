import { differenceInQuartersWithOptions } from 'date-fns/fp';
import '../sass/main.scss';
import { de } from 'date-fns/locale';

// const formContainer = document.getElementById('form-container');
// const btnCloseForm = document.getElementById('close-form');
// btnAddProject.addEventListener('click', (e) => {
//   formContainer.classList.toggle('show');
// });

// btnCloseForm.addEventListener('click', (e) => {
//   formContainer.classList.toggle('show');
// });

const btnAddProject = document.getElementById('btn-add-project');
const proName = document.querySelector('.project-input');
const projects = document.querySelector('.user-projects');

btnAddProject.addEventListener('click', (event) => {
  event.preventDefault();
  submitProject();
});

proName.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent default form submission if Enter is pressed within the input field
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
  </button>
  
  `;
  projects.insertAdjacentElement('beforeend', project);
  proName.value = '';
}
