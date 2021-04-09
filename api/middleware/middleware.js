const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

//ACTIONS MIDDLEWARE
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

module.exports = {
    validateActionId,
}
