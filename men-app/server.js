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

app.delete('/user/delete', privateRoute, userManagement.deleteUser);

app.put('/user/update', privateRoute, userManagement.updateUser);

// Notes

app.put('/nota/create', privateRoute, notaManagement.createNota);

app.get('/nota/list', privateRoute, notaManagement.listAuthorNotas);

// app.get('/nota/find/:notaId', privateRoute, notaManagement.findNota);

app.delete('/nota/delete/:id', privateRoute, notaManagement.deleteNota);

app.put('/nota/update', privateRoute, notaManagement.updateNota);

// app.delete('/', (req, res) => {
//     res.send('DELETE Request');
// });

// app.put('/', (req, res) => {
//     res.send('PUT Request');
// });