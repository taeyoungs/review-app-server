import dotenv from 'dotenv';
import '@babel/polyfill';
import app from './app';
import './db';

dotenv.config();

import './models/User';
import './models/Review';

const PORT = process.env.PORT || 8000;

const handleListening = () =>
  console.log(`Server running on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
