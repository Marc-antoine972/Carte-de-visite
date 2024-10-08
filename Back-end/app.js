require('dotenv').config();
const host = process.env.host_back;
const port = parseInt(process.env.port_back);

const cors = require("cors");
const cookie = require("cookie-parser");
const express = require("express");
const app = express();

var corsOptions = {
    origin: process.env.scheme_front + '://' + process.env.host_front + ':' + process.env.port_front,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}
app.use(cors(corsOptions));
app.use(cookie());
app.use(express.json());

//require route
const signUp = require("./route/account/signUp");
const signIn = require("./route/account/signIn");
const logOut = require("./route/account/logOut");
const addCard = require("./route/card/addCard");
const getCards = require("./route/card/getCards");
const delCard = require("./route/card/delCard");
const getCard = require("./route/card/getCard");
const editCard = require("./route/card/editCard");
const uploadProfilePicture = require("./route/card/uploadProfilePicture");
const uploadCompanyLogo = require("./route/card/uploadCompanyLogo");
const getCardsImg = require("./route/card/getCardsImg");


app.post('/signup', signUp);

app.post("/signin", signIn);

app.get("/logout", logOut);

app.post("/addcard", addCard);

app.get("/getCards", getCards);

app.post("/delcard", delCard);

app.post("/getCard", getCard);

app.post("/editCard", editCard);

app.post("/uploadProfilePicture", uploadProfilePicture);

app.post("/uploadCompanyLogo", uploadCompanyLogo);

app.get("/getCardsImg", getCardsImg);


// Middleware d'erreur
app.use((err, req, res, next) => {

    console.error(`Erreur capturée: ${err}`);
    res.status(500).send('Quelque chose a mal tourné!');
});


app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
