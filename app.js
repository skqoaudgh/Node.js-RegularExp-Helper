const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index.ejs', {result: {}});
});

app.post('/', (req, res) => {
    const reg = new RegExp(req.body.reg,'g');
    const str = req.body.str;

    if(reg.length == 0) {
        return res.render('index.ejs', {result: {error: 1, message: 'No regular expresson was entered.'}});
    }
    if(str.length == 0) {
        return res.render('index.ejs', {result: {error: 1, message: 'No string was entered.'}});
    }

    const match = reg.exec(str);
    if(!match) {
        return res.render('index.ejs', {result: {error: 1, message: 'None of the text was matched.'}});
    }
    else {
        const result = str.slice(0,match.index) + '<span>' + str.slice(match.index,reg.lastIndex) + '</span>' + str.slice(reg.lastIndex, str.length);
        return res.render('index.ejs', {result: {error: 0, message: result}});
    }
});


app.listen(3000, () => {
    console.log('the express server is opened on port 3000.');
});