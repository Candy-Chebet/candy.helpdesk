const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017/';


MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Database connected!');
  const db = client.db('helpdesk');
  app.get('/', (req, res) => {
    const studentTickets = getStudentTickets(); // replace with your code to get student tickets
    res.render('index', { studentTickets: studentTickets });
  });
  
  router.get('/student-tickets', (req, res) => {
    db.collection('student-tickets').find().toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  app.get('/', (req, res) => {
    const studentTickets = getStudentTickets(); 
    res.render('index', { studentTickets: studentTickets });
  });
  
  router.post('/student-tickets', (req, res) => {
    const { name, problem, description, priorityLevel, onOffCampus } = req.body;
    const ticket = {
      name,
      problem,
      description,
      priorityLevel,
      onOffCampus,
    };
    db.collection('student-tickets').insertOne(ticket, (err, result) => {
      if (err) throw err;
      res.send('Ticket created successfully!');
    });
  });

  router.put('/student-tickets/:id', (req, res) => {
    const { name, problem, description, priorityLevel, onOffCampus } = req.body;
    const ticket = {
      name,
      problem,
      description,
      priorityLevel,
      onOffCampus,
    };
    const id = req.params.id;
    db.collection('student-tickets').updateOne(
      { _id: ObjectId(id) },
      { $set: ticket },
      (err, result) => {
        if (err) throw err;
        res.send('Ticket updated successfully!');
      }
    );
  });

  router.delete('/student-tickets/:id', (req, res) => {
    const id = req.params.id;
    db.collection('student-tickets').deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) throw err;
      res.send('Ticket deleted successfully!');
    });
  });

  client.close();
});

module.exports = router;
