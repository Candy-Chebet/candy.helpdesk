
// routes/evaluations.js
const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    console.log('Database connected!');
    const db = client.db('helpdesk');
    
// Create a new evaluation
router.post('/', (req, res) => {
  const { ticketId, satisfactionRating, issueResolved, timelyResolution, comments } = req.body;
  const evaluation = new Evaluation({ ticketId, satisfactionRating, issueResolved, timelyResolution, comments });
  evaluation.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Get all evaluations
router.get('/', (req, res) => {
  Evaluation.find()
    .populate('ticketId') // Populate the Ticket reference
    .then((evaluations) => {
      res.status(200).json(evaluations);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Get an evaluation by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Evaluation.findById(id)
    .populate('ticketId') // Populate the Ticket reference
    .then((evaluation) => {
      if (evaluation) {
        res.status(200).json(evaluation);
      } else {
        res.status(404).json({ message: 'Evaluation not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Update an evaluation
router.patch('/:id', (req, res) => {
  const id = req.params.id;
  Evaluation.findByIdAndUpdate(id, req.body, { new: true })
    .populate('ticketId') // Populate the Ticket reference
    .then((evaluation) => {
      if (evaluation) {
        res.status(200).json(evaluation);
      } else {
        res.status(404).json({ message: 'Evaluation not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Delete an evaluation
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Evaluation.findByIdAndRemove(id)
    .populate('ticketId') // Populate the Ticket reference
    .then((evaluation) => {
      if (evaluation) {
        res.status(200).json({ message: 'Evaluation deleted' });
      } else {
        res.status(404).json({ message: 'Evaluation not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;

// app.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const evaluationsRouter = require('mongoose');


// Middleware
app.use(express.json());

// Connect to database
mongoose.connect('mongodb://localhost/helpdesk', {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch((err) => console.error('Error connecting to database:', err));

// Routes
app.use('/evaluations', evaluationsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ error: 'Internal server error' });
});

client.close();
});
module.exports = router;
