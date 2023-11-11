const { servicecollection } = require("../../schemas/service.schema");

const getusershippings = async (req, res) => {
  try {
    const { userid } = req.decoded;

    const data = await servicecollection.find({ customerId: userid });

    res.status(200).send({
      success: true,
      message: "all user tasks fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message || "internal server error.",
      message: "internal server error.",
    });
  }
};

const getridershippings = async (req, res) => {
  try {
    const { userid } = req.decoded;

    const data = await servicecollection.find({ riderId: userid });

    res.status(200).send({
      success: true,
      message: "all user tasks fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message || "internal server error.",
      message: "internal server error.",
    });
  }
};

module.exports = { getusershippings, getridershippings };
