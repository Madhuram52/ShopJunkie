const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const searchRoutes = require("./routes/search-routes");
const authRoutes = require("./routes/auth-routes");
const ownerRoutes = require("./routes/owner-routes")
const config = require("./config");
const HttpError = require("./models/http-error")

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/owner", ownerRoutes)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404)
  throw error;
})

// special error handling middlewaare function
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured!' })
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
