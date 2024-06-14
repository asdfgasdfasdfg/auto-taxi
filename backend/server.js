const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/autonomousTaxiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const technologySchema = new mongoose.Schema({
  description: String,
});

const Technology = mongoose.model('Technology', technologySchema);

app.get('/api/technology', async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.json(technologies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
