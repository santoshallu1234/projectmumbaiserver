// const express = require('express');

// const router = require("./routes/router");

// //const cors = require("cors");


// const app = express();

 
// //To access the data user inputs in form.
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use(express.static("public"));

// // just for testing purposes start

// // app.set("views", "views");
// // app.set("view engine", "ejs");


// // just for testing purposes end


// // app.use(cors());




// app.use(function (req, res, next) {
//   // make our markdown function available from within ejs templates
//   res.locals.filterUserHTML = function (content) {
//     return sanitizeHTML(markdown.parse(content), {
//       allowedTags: [
//         "p",
//         "br",
//         "ul",
//         "ol",
//         "li",
//         "strong",
//         "bold",
//         "i",
//         "em",
//         "h1",
//         "h2",
//         "h3",
//         "h4",
//         "h5",
//         "h6",
//       ],
//       allowedAttributes: {},
//     });
//   };

  
//   next();
// });

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

// app.use("/", router);

// module.exports = app;
