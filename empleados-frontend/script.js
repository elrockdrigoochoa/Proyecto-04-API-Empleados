const registerFormElement = document.querySelector('#empleadoForm');
const searchFormElement = document.querySelector('#searchForm');

const url = 'http://localhost:3000/empleados';

const getEmpleados = async (nameSearched) => {

    const newUrl = !nameSearched ? url : `${url}?name=${nameSearched}`;

    try {
        const response = await fetch(newUrl);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const empleados = await response.json();
        return empleados;

    } catch (error) {
        console.error(error.message);
    }
};

const createEmpleado = async (empleado) => {
    try {

        const options = {
            method: 'POST',
            body: JSON.stringify(empleado),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } else {
            getData();
        }

    } catch (error) {
        console.error(error.message);
    }
};

const generateEmpleadosView = (empleadosArray) => {

    const ulElement = document.querySelector('ul');
    ulElement.innerHTML = '';

    //(empleadosArray[i], i)
    empleadosArray.forEach((element, index) => {
        // console.log(`empleado[${index}]: ${element.name} - ${element.apellido}`); // empleado [0]:
        const liElement = document.createElement('li');
        liElement.innerText = `${element.name} - ${element.apellido}`;
        ulElement.append(liElement);

    });

};

registerFormElement.addEventListener('submit', (event) => {
    // console.log(event); // todas las propiedas de la web api que tiene ese evento
    // console.log(event.target); // el elemento html que lanza el evento
    event.preventDefault();

    const formData = new FormData(event.target);

    const empleado = formData.get('empleadoName');
    const apellido = formData.get('apellido');
    const link = formData.get('curriculumLink');

    const body = { name: empleado, apellido: apellido, curriculum: link };
    createEmpleado(body);

});

searchFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameSearched = document.querySelector('#nameSearched').value;
    getData(nameSearched);
});

const getData = async (nameSearched) => {
    const empleados = await getEmpleados(nameSearched);
    console.log(empleados);
    // generateEmpleadosView(empleados);
};

getData();