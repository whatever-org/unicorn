var express = require('express');
var router = express.Router();
var Unicorn = require('../models/unicorn');

router.route('/unicorns')
    .get(function(req, res) {
        Unicorn.find(function(err, unicorns) {
            if (err)
                return res.send(err);
            return res.render('unicorns/index', { unicorns: unicorns })
        });
    })

    .post(function(req, res) {
        var unicorn = new Unicorn();
        unicorn.name = req.body.name;
        unicorn.birthday = req.body.birthday;
        unicorn.weight = req.body.weight;
        unicorn.gender = req.body.gender;
        unicorn.preferedFoods = req.body.preferedFoods;
        unicorn.vampireKilled = req.body.vampireKilled;

        unicorn.save(function(err) {
            if (err)
                return res.send(err);
            return res.json({ message: 'unicorn created.', unicorn: unicorn });
        });
    });


router.route('/unicorns/:unicorn_id')
    .get(function(req, res) {
        Unicorn.findById(req.params.unicorn_id, function(err, unicorn) {
            if (err)
                return res.send(err);
            return res.json(unicorn);
        });
    })

    .put(function(req, res) {
        Unicorn.findById(req.params.unicorn_id, function(err, unicorn) {
            if (err)
                return res.send(err);

            unicorn.name = req.body.name;
            unicorn.birthday = req.body.birthday;
            unicorn.weight = req.body.weight;
            unicorn.gender = req.body.gender;
            unicorn.preferedFoods = req.body.preferedFoods;
            unicorn.vampireKilled = req.body.vampireKilled;

            unicorn.save(function(err) {
                if (err)
                    return res.send(err);
                return res.json({ message: 'unicorn updated.', unicorn: unicorn});
            });
        });
    })

    .delete(function(req, res) {
        Unicorn.remove({
            _id: req.params.unicorn_id
        }, function(err, unicorn) {
            if (err)
                return res.send(err);
            return res.json({ message: 'unicorn deleted.'});
        })
    });

module.exports = router