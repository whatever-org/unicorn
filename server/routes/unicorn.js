var express = require('express');
var router = express.Router();
var Unicorn = require('../models/unicorn');

router.route('/unicorns')
    .get(function(req, res) {
        Unicorn.find(function(err, unicorns) {
            if (err)
                res.send(err);
            res.render('unicorns/index', { unicorns: unicorns })
        });
    })

    .post(function(req, res) {
        var unicorn = new Unicorn();
        unicorn.name = req.body.name;
        unicorn.author = req.body.author;

        unicorn.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'unicorn created.' });
        });
    });


router.route('/unicorns/:unicorn_id')
    .get(function(req, res) {
        unicorn.findById(req.params.unicorn_id, function(err, unicorn) {
            if (err)
                res.send(err);
            res.json(unicorn);
        });
    })

    .put(function(req, res) {
        unicorn.findById(req.params.unicorn_id, function(err, unicorn) {
            if (err)
                res.send(err);

            unicorn.name = req.body.name;
            unicorn.author = req.body.author;

            unicorn.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'unicorn updated.'});
            });
        });
    })

    .delete(function(req, res) {
        unicorn.remove({
            _id: req.params.unicorn_id
        }, function(err, unicorn) {
            if (err)
                res.send(err);
            res.json({ message: 'unicorn deleted.'});
        })
    });

module.exports = router