const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');

const {validateActionId, validateAction} = require('../middleware/middleware')

// [GET] - '/' - Get array of all actions 
router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            next(err)
        })
});

// [GET] - '/:id' - Get an action with a specified ID
router.get('/:id', validateActionId, (req, res, next) => {
    const {id} = req.params;
    Actions.get(id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        })
});

// [POST] - '/' - Create new action, returns newly created action
router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        })
});

// [PUT] - '/:id' - Update existing action. Returns updated action.
router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    const {id} = req.params;
    Actions.update(id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            next(err);
        })
});

// [DELETE] - '/:id' - Delete existing action. No response body
router.delete('/:id', validateActionId, (req, res, next) => {
    const {id} = req.params;
    Actions.remove(id)
        .then(() => {
            res.status(200).json({message: 'Action successfully deleted'})
        })
        .catch(err => {
            next(err);
        })
});

//Error Middleware
router.use((err, _, res) => {
    res.status(500).json({
      message: "There has been an error",
      error: err.message
    });
});

module.exports = router;
