require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const { connect } = require('mongoose');
const { db_token } = process.env;
const UserInfo = require('./schemas/userInfo');
const axios = require('axios');


let connected = false;

async function main() {
    console.log('connecting database');
    await connect(db_token).then(()=> {
        console.log('Connected');
        connected = true;
    }).catch((error) => {
        console.log(error);
        connected = false;
    });
}

app.get('/exchangerate', cors(), async(req, res) => {
    let url = "http://www.floatrates.com/daily/usd.json";
    let result = await axios.get(url);
    console.log(result.data['pkr'].rate);
    const currency = parseFloat(result.data['pkr'].rate);
    res.status(200).send(currency.toString());
});

app.get('/search', cors(), async(req,res) => {
    var response = {
        status: 0,
        data: null
    };
    console.log(req.query.email);
    if (req.query.email !== "") {
        if (connected) {
            let userProfile = await UserInfo.find({ Email: req.query.email })
                .sort({ tStamp: -1 });
            if (userProfile.length === 0) {
                response.status = 404;
            } else {
                response.status = 200;
                response.data = userProfile;
            }
        } else
            response.status = 403;
    }

    res.send(JSON.stringify(response));
});

app.listen(port, ()=> {
    console.log(`server is listening on port ${port}`);
    main();
})