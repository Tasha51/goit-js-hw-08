
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = "feedback-form-state";

initForm();

form.addEventListener('input', throttle(saveMessage), 500);

form.addEventListener("submit", clearInput);

function saveMessage(event) {

    let parsistedInputsText = localStorage.getItem(STORAGE_KEY);
    parsistedInputsText = parsistedInputsText ? JSON.parse(parsistedInputsText) : {};

     parsistedInputsText[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify( parsistedInputsText));
};


function clearInput(event) {
    event.preventDefault();
   
    const formData = new FormData(form);
    
    const formDataObj = {};

    formData.forEach((value, name) => (formDataObj[name] = value));
    console.log(formDataObj);

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

function initForm() {
    let parsistedInputsText = localStorage.getItem(STORAGE_KEY);
    if (parsistedInputsText) {
        parsistedInputsText = JSON.parse(parsistedInputsText);
        Object.entries(parsistedInputsText).forEach(([name, value]) => {
            form.elements[name].value = value;
            
        });
    };
   
};