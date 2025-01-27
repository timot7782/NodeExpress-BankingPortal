const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

// const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), { encoding: 'utf8' });
// const accounts = JSON.parse(accountData);

// const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), { encoding: 'utf8' });
// const users = JSON.parse(userData);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts: accounts });
});


app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});


app.listen(port, () => console.log(`PS Project Running on port ${port}!`));