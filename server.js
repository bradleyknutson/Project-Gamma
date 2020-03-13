/* eslint-disable no-console */
require(`dotenv`).config();
const express = require("express");
const mongoose = require(`mongoose`);
const morgan = require("morgan");
const path = require(`path`);
const passport = require(`passport`);
const flash = require(`connect-flash`);
const app = express();

const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require(`express-session`)({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//Routes
const authRouter = require(`./routes/api/authRouter`);
const eventRouter = require(`./routes/api/eventRouter`);
const userRouter = require(`./routes/api/userRouter`);
app.use(`/auth`, authRouter);
app.use(`/event`, eventRouter);
app.use(`/user`, userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get(`*`, function(req, res) {
    res.sendFile(path.join(__dirname, `build`, `index.html`));
  });
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  app.listen(PORT, () => {
      console.log(`Now listening on PORT ${PORT}/`);
  });
}).catch(err => {
  if(err) throw err;
});

module.exports = app;
