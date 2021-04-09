const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

function validateActionId(req, res, next) {
    const {id} = req.params;
    Actions.get(id)
        .then(action => {
            if (!action) {
                res.status(404).json({message: "Action with this ID not found"})
            }
            else {
                req.action = action;
                next();
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

function validateAction(req, res, next) {
    const {project_id, description, notes} = req.body;
    Projects.get(project_id)
        .then(project => {
            if (!project) {
                res.status(404).json({message: "Project with this ID not found"})
            }
            else {
                if (!description || description.length > 128 || !notes) {
                    res.status(400).json({message: "Description (128 chars or less) and Notes Required"});
                }
                else {
                    next();
                }
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

function validateProjectId(req, res, next) {
    const {id} = req.params;
    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({message: "Project with this ID not found"})
            }
            else {
                req.project = project;
                next();
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
}

module.exports = {
    validateActionId,
    validateAction,
    validateProjectId,
}
