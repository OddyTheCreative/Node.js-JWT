import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import authenticate from './middleware.js';

dotenv.config();
const app = express();

app.use(express.json());

const posts = [
  { id: 1, content: 'Isekai', name: 'Alex' },
  { id: 2, content: 'Isekai', name: 'Amy' },
  { id: 3, content: 'SinSekai', name: 'Alex' },
  { id: 4, content: 'Isekai', name: 'Brandon' },
  { id: 5, content: 'Isekai', name: 'Jake' },
];

app.get('/posts', authenticate, (req, res) => {
  res.json(posts.filter((post) => post.name == req.user.name));
});

app.listen(3000);
