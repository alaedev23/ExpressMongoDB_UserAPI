import express from 'express'
import cors from 'cors'
import userManagement from './controllers/user.controller.js';
import notaManagement from './controllers/nota.controller.js';
import privateRoute from  './middleware/privateRoute.js';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('GET Request')
})

app.listen(8080, () => {
    console.log('Server is running in port 8080')
})

// User

app.post('/user/login', userManagement.loginUser);

app.post('/user/logout', userManagement.logoutUser);

app.post('/user/register', userManagement.registerUser);

app.post('/user/delete', privateRoute, userManagement.deleteUser);

app.post('/user/update', privateRoute, userManagement.updateUser);

// Notes

app.post('/nota/create', privateRoute, notaManagement.createNota);

app.post('/nota/list', privateRoute, notaManagement.listAuthorNotas);

app.post('/nota/find', privateRoute, notaManagement.findNota);

app.post('/nota/delete', privateRoute, notaManagement.deleteNota);

app.post('/nota/update', privateRoute, notaManagement.updateNota);

// Routes for future versions

app.delete('/', (req, res) => {
    res.send('DELETE Request');
});

app.put('/', (req, res) => {
    res.send('PUT Request');
});