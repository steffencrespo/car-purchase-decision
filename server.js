const express = require('express');
const app = express();

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

app.get('/', (req, res) => {
	return res.status(200).sendFile('/public/index.html', {root: __dirname });
});

module.exports = {app};
