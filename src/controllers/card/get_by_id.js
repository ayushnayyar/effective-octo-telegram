const getById = async (req, res) => {
  try {
    return res.status(200).json({ account: req.account });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, account could not be fetched" });
  }
};

export default getById;
