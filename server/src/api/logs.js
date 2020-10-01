const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await LogEntry.find());
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (err) {
    res.status(422);
    next(err);
  }
});

module.exports = router;
