const router = require('express').Router();
const data = require('./data.json');

router.route('/').get((req,res) => {
   res.send(data);
});


router.route('/:id').get((req,res) => {
    const de = data.transactions;
    console.log(req.params.id);
    var detail = de.filter(array => array.account == req.params.id);
    console.log(detail);

    res.json(detail);
    // Exercise.findById(req.params.id)
    // .then(exercise => res.json(exercise))
    // .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;