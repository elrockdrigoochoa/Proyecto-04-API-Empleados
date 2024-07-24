const express = require('express');
const colors = require('colors');
const cors = require('cors');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('servidor ok!');
});

app.get('/hellow', (req, res) => {
    res.send('<h1> Hola desde express! </h1>');
});

const empleados = [
    { id: 1, name: 'Juan', apellido: 'Perez', curriculum: '' },
    { id: 2, name: 'Maria', apellido: 'Ramirez', curriculum: '' },
    { id: 3, name: 'Raul', apellido: 'Zaragoza', curriculum: '' },
    { id: 4, name: 'Javier', apellido: 'Rojas', curriculum: '' },
    { id: 4, name: 'Valeria', apellido: 'Ochoa', curriculum: '' },
    { id: 6, name: 'Mauricio', apellido: 'Rangel', curriculum: '' },
];

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
};

app.use(cors(corsOptions));
app.use(express.json());

// GET: Obtener todos los empleados
app.get('/empleados', (req, res) => {

    const name = req.query.name;
    console.log(name)
    console.log(name === undefined)

    if (name === undefined) {
        res.json(empleados);
    }

    // const filteredEmpleadosByName = empleados.filter((empleados) => {
    //     return empleados.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    // });

    // res.json(filteredEmpleadosByName);
});

// GET: Obtener un empleado en especifico
// request params: parametros que se mandan en la url y se utilizan para selecionar recursos. Enmedio de la url. Ejemplo: api/pokemon/125/algo
// quey params: son parametros que se utilizar como parametro para filtrar informacion. Ejemplo: api/pokemon?page=1&tamanio=100
app.get('/empleados/:id', (req, res) => {
    const id = req.params.id;
    console.log('req.query.page: ', req.query.page);
    const empleadosFounded = songs.find(element => element.id === parseInt(id));
    res.json(empleadosFounded);
});

// POST: Crear un nuevo empleado
app.post('/empleados', (req, res) => {
    // console.log('req: ', req);
    // console.log('req.body: ', req.body);
    const newEmpleado = { ...req.body, id: empleados.length + 1 };
    songs.push(newEmpleado);
    res.status(201).json({ message: 'Empleado agregado correctamente', empleado: newEmpleado });
});

// PATCH: Modificaciones de algunas propiedades del objeto
app.patch('/empleados/:id', (req, res) => {
    const id = req.params.id;
    const newBody = req.body;
    const positionFounded = empleados.findIndex(element => element.id === parseInt(id));
    // ... spread operator, se utiliza para hacer destructuring
    const newEmpleado = { ...empleados[positionFounded], ...newBody };
    empleados[positionFounded] = newEmpleado;
    res.status(200).json({ id });
});

// PUT: Modificar todas las propiedades de un objeto
app.put('/empleados/:id', (req, res) => {
    const id = req.params.id;
    const newBody = req.body;
    const foundedPosition = empleados.findIndex(element => element.id === parseInt(id));
    empleados[foundedPosition] = newBody;
    res.status(200).json({ id });
});

// DELETE: Eliminar objeto
app.delete('/empleados/:id', (req, res) => {
    const id = req.params.id;
    const foundedPosition = empleados.findIndex(element => element.id === parseInt(id));
    empleados.splice(foundedPosition, 1);
    res.status(200).json({ id });
});

app.listen(port, () => {
    console.log(`servidor iniciado... en el puerto ${port}`.rainbow);
});