const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

app.get('/', (req, res) => {
	return res.status(200).sendFile('/public/index.html', {root: __dirname });
});

app.get('/login', (req, res) => {
	return res.status(200).sendFile('/public/login.html', {root: __dirname});
});

app.post('/login', (req, res) => {
	return res.status(200).json(req.body);
});

app.post('/purchaseList', (req, res) => {
	return res.status(200).sendFile('/public/purchase.html', {root: __dirname });
});

app.get('/purchaseList', (req, res) => {
	return res.status(200).sendFile('/public/purchase.html', {root: __dirname });
});

app.put('/purchaseList/:id', (req, res) => {
	return res.status(200).sendFile('/public/purchase.html', {root: __dirname});
});

app.delete('/purchaseList/:id', (req, res) => {
	return res.status(201).end();
});

module.exports = {app};
