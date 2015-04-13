var express = require('express');
var router = express.Router();
var Unicorn = require('../models/unicorn');

router.route('/')
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
            req.flash('success', 'New unicorn ' + unicorn.name + ' created');
            return res.redirect('/' + unicorn.name);
        });
    });

router.get('/create', function(req, res) {
    return res.render('unicorns/new');
});

router.get('/update/:unicorn_name', function(req, res) {
    Unicorn.findOne({name: req.params.unicorn_name}, function(err, unicorn) {
        if (err)
            return res.send(err);
        return res.render('unicorns/update', { unicorn: unicorn });
    });
});

router.post('/delete', function(req, res) {
    Unicorn.remove({
        _id: req.body.unicorn_id
    }, function(err, unicorn) {
        if (err)
            return res.send(err);
        return res.redirect('/');
    })
});

router.route('/:unicorn_name')
    .get(function(req, res) {
        Unicorn.findOne({name: req.params.unicorn_name}, function(err, unicorn) {
            if (err)
                return res.send(err);
            return res.render('unicorns/show', { unicorn: unicorn });
        });
    })

    .put(function(req, res) {
        Unicorn.findById(req.params.unicorn_name, function(err, unicorn) {
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
                return res.json({ message: 'unicorn updated.', unicorn: unicorn });
            });
        });
    });

module.exports = router