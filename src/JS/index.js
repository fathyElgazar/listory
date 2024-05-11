import { differenceInQuartersWithOptions } from 'date-fns/fp';
import '../sass/main.scss';
import { de, gd } from 'date-fns/locale';
import { handleProjectSubmission, renderProject } from './projects';

const btnAddTodo = document.getElementById('btn-add-todo');
const formContainer = document.getElementById('form-container');
const btnCloseForm = document.getElementById('close-form');
const projectsContainer = document.querySelector('.user-projects');

function showForm() {
  formContainer.classList.toggle('show');
}

renderProject();
btnAddTodo.addEventListener('click', showForm);

btnCloseForm.addEventListener('click', showForm);

const projectTitle = document.getElementById('project-title');
const btnAddProject = document.getElementById('btn-add-project');
const proName = document.querySelector('.project-input');
const userProjectsList = document.querySelector('.user-projects');

btnAddProject.addEventListener('click', handleProjectSubmission);

proName.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    handleProjectSubmission(e);
  }
});

export {
  projectTitle,
  proName,
  userProjectsList,
  btnAddProject,
  projectsContainer,
};
