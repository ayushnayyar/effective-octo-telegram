const getById = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ _id: req.user._id, email: req.user.email, name: req.user.name });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, user could not be fetched" });
  }
};

export default getById;
