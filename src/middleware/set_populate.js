const setPopulate = async (req, res, next) => {
  req.populate = true;
  next();
};

export default setPopulate;
