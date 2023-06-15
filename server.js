import express from 'express';

import { User } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

import connectDB from './config/connection.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`App listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
})();
