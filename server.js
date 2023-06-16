import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

import router from './routes/index.js';

import connectDB from './config/connection.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use('/api', router);

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
