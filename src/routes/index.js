const { Router } = require('express');
// const { authHandler } = require('../middleware/auth');
const personRouter = require('./persons/person.controller')

const router = Router();

router.use('/persons', personRouter)

module.exports = router