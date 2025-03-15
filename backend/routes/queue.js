import express from 'express';
import { Queue } from '../models/Queue.js';

const router = express.Router();

// Get all queue entries
router.get('/', async (req, res) => {
  try {
    const queues = await Queue.find().sort({ priority: 1, checkInTime: 1 });
    res.json(queues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new patient to queue
router.post('/', async (req, res) => {
  const queue = new Queue({
    ...req.body,
    estimatedWaitTime: calculateWaitTime(req.body.priority)
  });

  try {
    const newQueue = await queue.save();
    res.status(201).json(newQueue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update queue status
router.patch('/:id', async (req, res) => {
  try {
    const queue = await Queue.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(queue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

function calculateWaitTime(priority) {
  const baseTime = 30; // Base wait time in minutes
  switch (priority) {
    case 1: return baseTime / 2;
    case 2: return baseTime;
    default: return baseTime * 1.5;
  }
}

export const QueueRouter = router;