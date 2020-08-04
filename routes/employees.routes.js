const express = require('express');
const router = express.Router();

const EmployesController = require('../controllers/employees.controller');

router.get('/employes', EmployesController.getAll);
router.get('/employes/random', EmployesController.getRandom);
router.get('/employes/:id', EmployesController.getById);
router.post('/employes', EmployesController.postNew);
router.put('/employes/:id', EmployesController.edit);
router.delete('/employes/:id', EmployesController.delete);


module.exports = router;
