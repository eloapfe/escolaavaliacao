const express = require('express');
const routes = express.Router();

const Professor = require('./controller/controllerprofessor');
const Turma = require('./controller/controllerturma');
const Atividade = require('./controller/controlleratividade');

routes.get('/', (req, res) => {
    res.json({ message: 'API de Professores, Turmas e Atividades' });
});

routes.get('/professores', Professor.read); 
routes.post('/register', Professor.register);
routes.post('/login', Professor.login); 

routes.post('/turmas', Turma.create);
routes.get('/turmas', Turma.read);
routes.delete('/turmas/:id', Turma.remove);

routes.post('/atividades', Atividade.create);
routes.get('/atividades', Atividade.read);

module.exports = routes;