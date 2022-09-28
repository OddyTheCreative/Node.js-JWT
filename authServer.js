import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();

app.use(express.json());

let refreshTokens = [];

app.post('/login', (req, res) => {
  const name = req.body.name;
  const height = req.body.height;
  const gender = req.body.gender;
  const user = { name, height, gender };
  const access_token = generateAccessToken(user);
  const refresh_token = jwt.sign(user, process.env.REFRESH_SECRET);

  refreshTokens.push(refresh_token);
  res.json({ access_token, refresh_token });
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const access_token = generateAccessToken({ name: user.name });
    res.json({ access_token });
  });
});

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);

  res.sendStatus(204);
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '20s' });
}

app.listen(4000);
