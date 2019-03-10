let express = require('express');
let router = express.Router({});


router.get('/', function(req, res, next) {
    res.render("buy",{user_name:req.query.user_name});
});

module.exports = router;
