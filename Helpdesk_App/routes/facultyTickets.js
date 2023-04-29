const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017/';


MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Database connected!');
  const db = client.db('helpdesk');

  router.get('/faculty-tickets', (req, res) => {
    db.collection('faculty-tickets').find().toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  router.post('/faculty-tickets', (req, res) => {
    const { name, problem, description, priorityLevel, onOffCampus } = req.body;
    const ticket = {
      name,
      problem,
      description,
      priorityLevel,
      onOffCampus,
    };
    db.collection('faculty-tickets').insertOne(ticket, (err, result) => {
      if (err) throw err;
      res.send('Ticket created successfully!');
    });
  });

  router.put('/faculty-tickets/:id', (req, res) => {
    const { name, problem, description, priorityLevel, onOffCampus } = req.body;
    const ticket = {
      name,
      problem,
      description,
      priorityLevel,
      onOffCampus,
    };
    const id = req.params.id;
    db.collection('faculty-tickets').updateOne(
      { _id: ObjectId(id) },
      { $set: ticket },
      (err, result) => {
        if (err) throw err;
        res.send('Ticket updated successfully!');
      }
    );
  });

  router.delete('/faculty-tickets/:id', (req, res) => {
    const id = req.params.id;
    db.collection('faculty-tickets').deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) throw err;
      res.send('Ticket deleted successfully!');
    });
  });

  client.close();
});

module.exports = router;
