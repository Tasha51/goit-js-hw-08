
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

let inputsText = {};


const STORAGE_KEY = "feedback-form-state";


initForm();

form.addEventListener('input', throttle(saveMessage), 500);


form.addEventListener("submit", clearInput);



function saveMessage(event) {
    inputsText[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputsText));
    
};


function clearInput(event) {
    event.preventDefault();
    const formData = new FormData(form);
    formData.forEach((name, value) => console.log(name, value));
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
};

function initForm() {
    let parsistedInputsText = localStorage.getItem(STORAGE_KEY);
    if (parsistedInputsText) {
        parsistedInputsText = JSON.parse(parsistedInputsText);
        // console.log(parsistedInputsText);
        Object.entries(parsistedInputsText).forEach(([name, value]) => {
            form.elements[name].value = value;
            inputsText[name] = value;
        });
    };
   
};