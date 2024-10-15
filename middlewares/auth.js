require('dotenv').config()

module.exports = (req, res, next) => {
    // console.log("in the auth middleware")

    // console.log(req.body,req.file);
    const Authorization = req.get('Authorization');
    // console.log('Authorization: ' + Authorization)
    // console.log("API KEY: ", process.env.ADMIN_AUTH_KEY)
    if (Authorization == process.env.ADMIN_AUTH_KEY) {

        // If validation passes, proceed to the next middleware or route handler
        next();
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }

  
  };
  