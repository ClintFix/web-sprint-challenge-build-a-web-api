const express = require('express');
const router = express.Router();

const Actions = require('./actions-model');

const {validateActionId} = require('../middleware/middleware')

// [GET] - '/' - Get array of all actions 
router.get('/', (req, res, next) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            next(err)
        })
})

//Error Middleware
router.use((err, req, res, next) => {
    res.status(500).json({
      message: "There has been an error",
      error: err.message
    });
  })

  module.exports = router;
