const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/save', (req, res) => {
  const text = req.body.text;
  const id = uuidv4();

  let data = {};
  if (fs.existsSync('savedData.json')) {
    data = JSON.parse(fs.readFileSync('savedData.json'));
  }
  data[id] = text;
  fs.writeFileSync('savedData.json', JSON.stringify(data, null, 2));
  
  res.json({ link: `/text/${id}` });
});

app.get('/text/:id', (req, res) => {
  const id = req.params.id;
  if (!fs.existsSync('savedData.json')) return res.send('No data found.');
  
  const data = JSON.parse(fs.readFileSync('savedData.json'));
  if (data[id]) {
    res.send(`<pre>${data[id]}</pre>`);
  } else {
    res.send('Text not found.');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
