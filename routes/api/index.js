const router = require('express').Router();


const dept = require('./deptRoutes');
const employee = require('./employeeRoutes');
const role = require('./roleRoutes');

router.use('/dept', dept);
router.use('/employee', employee);
router.use('/role', role);

module.exports = router;