const { Router } = require('express');
const router = Router();

const getDogs = require('../controllers/getDogs');
const getDogsByName = require('../controllers/getDogsByName');
const getDogsById = require('../controllers/getDogsById');
const getTemperaments = require('../controllers/getTemperaments');
const getTemperamentsByName = require('../controllers/getTemperamentsByName');
const postDogs = require('../controllers/postDogs');
const getDogsByExactName = require('../controllers/getDogsByExactName');
const deleteDogs = require('../controllers/deleteDogs');
const deleteTemperaments = require('../controllers/deleteTemperaments');

router.get('/dogs', getDogs);
router.get('/temperaments', getTemperaments);
router.get('/temperaments/query', getTemperamentsByName);
router.get('/dogs/query', getDogsByName);
router.get('/dogs/queryExact', getDogsByExactName);
router.get('/dogs/:id', getDogsById);
router.post('/dogs', postDogs);
router.delete('/dogs/queryExact', deleteDogs);
router.delete('/temperaments/queryExact', deleteTemperaments);

module.exports = router;