const router = require('express').Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017/';


MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  console.log('Database connected!');
  const db = client.db('helpdesk');

// Create a new solution
router.post('/solutions', async (req, res) => {
  try {
    const solution = new Solution({
      problem: req.body.problem,
      description: req.body.description,
      solution: req.body.solution
    });
    await solution.save();
    res.status(201).json(solution);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all solutions
router.get('/solutions', async (req, res) => {
  try {
    const solutions = await Solution.find();
    res.json(solutions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single solution by ID
router.get('/solutions', getSolution, (req, res) => {
  res.json(res.solution);
});

// Update a solution by ID
router.patch('/solutions', getSolution, async (req, res) => {
  if (req.body.problem != null) {
    res.solution.problem = req.body.problem;
  }
  if (req.body.description != null) {
    res.solution.description = req.body.description;
  }
  if (req.body.solution != null) {
    res.solution.solution = req.body.solution;
  }
  try {
    const updatedSolution = await res.solution.save();
    res.json(updatedSolution);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a solution by ID
router.delete('/solutions', getSolution, async (req, res) => {
  try {
    await res.solution.remove();
    res.json({ message: 'Solution deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single solution by ID
async function getSolution(req, res, next) {
  let solution;
  try {
    solution = await Solution.findById(req.params.id);
    if (solution == null) {
      return res.status(404).json({ message: 'Solution not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.solution = solution;
  next();
}
    client.close();
});
module.exports = router;
