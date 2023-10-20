const express = require('express')
const router = express.Router()

router.get('/empty_test', (req, res) => { 
    res.render('basic/empty_test')
    console.log("route successful")
})

module.exports = router;