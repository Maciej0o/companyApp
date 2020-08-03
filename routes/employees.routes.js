const express = require('express');
const router = express.Router();
const Employe = require('../models/employe.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employe.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {

  try {
    const count = await Employe.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employe = await Employe.findOne().skip(rand);
    if(!employe) res.status(404).json({ message: 'Not found' });
    else res.json(employe);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.get('/employees/:id', async (req, res) => {

  try {
    const employe = await Employe.findById(req.params.id);
    if(!employe) res.status(404).json({ message: 'Not found' });
    else res.json(employe);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.post('/employees', async (req, res) => {

  try {

    const { firstName, lastName, department } = req.body;
    const newEmploye = new Employe({ firstName: firstName, lastName: lastName, department: department });
    await newEmploye.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const employe = await(Employe.findById(req.params.id));
    if(employe) {
      await Employe.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: department }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/employees/:id', async (req, res) => {

  try {
    const employe = await(Employe.findById(req.params.id));
    if(employe) {
      await Employe.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;
