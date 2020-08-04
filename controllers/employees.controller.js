const Employe = require('../models/employe.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Employe.find().populate('department'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employe.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employe = await await Employe.findOne()
      .populate('department')
      .skip(rand);
    if (!employe) res.status(404).json({ message: 'Not found' });
    else res.json(employe);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const employe = await (await Employe.findById(req.params.id)).populated(
      'department'
    );
    if (!employe) {
      res.status(500).json({ message: 'Not found' });
    } else res.json(employe);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postNew = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const newEmploye = new Employe({
      firstName: firstName,
      lastName: lastName,
      department: department
    });
    await newEmploye.save();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.edit = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const employe = await Employe.findById(req.params.id);
    if (employe) {
      await Employe.updateOne(
        { _id: req.params.id },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            department: department
          }
        }
      );
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (employe) {
      await Employe.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};