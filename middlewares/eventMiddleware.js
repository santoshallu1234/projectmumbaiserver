// validateEventMiddleware.js
module.exports = (req, res, next) => {
  // console.log("in the event middleware")

  let {
    eventName,
    eventDescription,
    startDate,
    endDate,
    category,
    location,
    pinCode,
  } = req.body;
  // console.log(req.body);

  // Check if required fields are present
  if (
    !eventName ||
    !eventDescription ||
    !startDate ||
    !endDate ||
    !category ||
    !location ||
    !pinCode
  ) {
    return res.status(400).json({ error: "All event fields are required" });
  }

  // If validation passes, proceed to the next middleware or route handler
  next();
};
