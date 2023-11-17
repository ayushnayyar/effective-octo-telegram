const getById = async (req, res) => {
  try {
    return res.status(200).json({ transaction: req.transaction });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong, transaction could not be fetched",
    });
  }
};

export default getById;
