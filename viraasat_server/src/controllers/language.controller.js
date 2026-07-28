import Language from "../models/Language.js";

export const getLanguages = async (req, res) => {
  try {
    const languages = await Language.find({
      isActive: true,
    }).sort({
      order: 1,
    });

    res.status(200).json({
      success: true,
      data: languages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch languages",
    });
  }
};