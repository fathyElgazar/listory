import '../sass/main.scss';

const formContainer = document.getElementById('form-container');
const btnAddProject = document.getElementById('btn-add-project');
const btnCloseForm = document.getElementById('close-form');
btnAddProject.addEventListener('click', (e) => {
  formContainer.classList.toggle('show');
});

btnCloseForm.addEventListener('click', (e) => {
  formContainer.classList.toggle('show');
});
