const express = require('express');

const router = require("./routes/router");

const cors = require("cors");


const app = express();

 
//To access the data user inputs in form.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

// just for testing purposes start

// app.set("views", "views");
// app.set("view engine", "ejs");


// just for testing purposes end

const allowedOrigins = ['http://localhost:8081'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // Allow requests with no origin (mobile apps) or from allowed origins (web clients)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true
};
app.use(cors(corsOptions));




app.use(function (req, res, next) {
  // make our markdown function available from within ejs templates
  res.locals.filterUserHTML = function (content) {
    return sanitizeHTML(markdown.parse(content), {
      allowedTags: [
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "strong",
        "bold",
        "i",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
      ],
      allowedAttributes: {},
    });
  };

  
  next();
});


// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type", 'Authorization');
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use("/", router);


module.exports = app;
