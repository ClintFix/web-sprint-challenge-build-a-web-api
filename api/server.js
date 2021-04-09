const express = require('express');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router')

const server = express();

//Global Middleware
server.use(express.json());

//Routers
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (_,res) => {
    res.send(`<h2>Clint's Sprint Challenge API</h2>`)
})

module.exports = server;
