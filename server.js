const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let items = []; // In-memory data storage
let id = 1;

// Create (POST)
app.post('/api/items', (req, res) => {
    const newItem = { id: id++, ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read (GET)
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Update (PUT)
// PUT route for updating an item by ID
app.put('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10); // Get ID from the URL
    const itemIndex = items.findIndex(item => item.id === itemId); // Find the item in the array
  
    if (itemIndex !== -1) {
      // Update the item data with the incoming request body
      items[itemIndex] = { id: itemId, ...req.body };
      res.json(items[itemIndex]); // Respond with the updated item
    } else {
      // Item not found, return a 404 error
      res.status(404).json({ error: 'Item not found' });
    }
  });
// Update (PUT)
app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
      items[itemIndex] = { id: itemId, ...req.body };
      res.json(items[itemIndex]);
  } else {
      res.status(404).json({ error: 'Item not found' });
  }
});

    

// Delete (DELETE)
app.delete('/api/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    items = items.filter(item => item.id !== itemId);
    res.status(204).send();
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));