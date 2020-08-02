const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/employees', (req, res) => {
  req.db.collection('employes').find().toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data);
  });
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employes').aggregate([ { $sample: { size: 1 } } ]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});

router.get('/employees/:id', (req, res) => {
  req.db.collection('employes').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  });
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employes').insertOne({ firstName: firstName, lastName: lastName }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employes').updateOne({ _id: ObjectId(req.params.id) }, { $set: { firstName: firstName, lastName: lastName }}, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

router.delete('/employees/:id', (req, res) => {
  req.db.collection('employes').deleteOne({ _id: ObjectId(req.params.id) }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});
module.exports = router;