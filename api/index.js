const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

// Enable CORS for all origins (for development)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Reviews array (starts with some sample data)
const reviews = [
  { Name: 'Tom', Message: 'These guys are great!', Stars: 5 },
  { Name: 'Jane', Message: 'Good service.', Stars: 4 },
  { Name: 'Sam', Message: 'Excellent job!', Stars: 5 },
  { Name: 'Alex', Message: 'Not bad.', Stars: 3 }
];

// Add a new review
app.post('/reviews', (req, res) => {
    const { Name, Message, Stars } = req.body;
    if (!Name || !Message || typeof Stars !== 'number') {
        return res.status(400).json({ error: 'Name, Message, and Stars (number) are required.' });
    }
    const newReview = { Name, Message, Stars };
    reviews.push(newReview);
    res.status(201).json(newReview);
});

// Get all reviews
app.get('/reviews', (req, res) => {
    res.status(200).json(reviews);
});

// Get all reviews with declared stars
app.get('/reviews/stars', (req, res) => {
    let stars = req.query.stars;
    let filtered;
    if (stars) {
        // Support comma-separated values, e.g. ?stars=3,4,5
        const starArr = stars.split(',').map(Number);
        filtered = reviews.filter(r => starArr.includes(r.Stars));
    } else {
        filtered = reviews.filter(r => r.Stars === 5); // default to 5 stars if not specified
    }
    res.status(200).json(filtered);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});