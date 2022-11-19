//Try Again

const form = document.querySelector("#inputForm");

form.addEventListener('submit', (event) => {

    event.preventDefault(); 

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
   document.querySelector(".formWrapper").setAttribute("hidden", true);

    console.log(data);
})