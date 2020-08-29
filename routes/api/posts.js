const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is a POsts route');
});

module.exports = router;
