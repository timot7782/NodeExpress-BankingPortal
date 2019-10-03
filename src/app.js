const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const { accounts, users, writeJSON } = require('./data');

// const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), { encoding: 'utf8' });
// const accounts = JSON.parse(accountData);

// const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), { encoding: 'utf8' });
// const users = JSON.parse(userData);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts: accounts });
});

app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});
app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});
app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});
app.get('/transfer', (req, res) => {
  res.render('transfer');
});
app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  if(accounts[from].balance >= parseInt(amount)) {
    accounts[from].balance -= parseInt(amount);
    accounts[to].balance += parseInt(amount);
  }
  writeJSON();
  res.render('transfer', { message: "Transfer Completed" });
});

app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
})
app.post('/payment', (req, res) => {
  const { amount } = req.body;
  accounts.credit.balance -= parseInt(amount);
  accounts.credit.available += parseInt(amount);
  writeJSON();
  res.render('payment', { message: "Payment Successful", account: accounts.credit });
})

app.listen(port, () => console.log(`PS Project Running on port ${port}!`));