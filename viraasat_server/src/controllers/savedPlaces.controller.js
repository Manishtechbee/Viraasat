import User from "../models/User.js";
import Heritage from "../models/Heritage.js";



// GET SAVED PLACES
export const getSavedPlaces = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: "savedPlaces",
        select:
          "name slug location category rating image images description coordinates",
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const places = user.savedPlaces || [];

    return res.status(200).json({
      success: true,
      count: places.length,
      places,
    });
  } catch (error) {
    console.error("Get saved places error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch saved places",
    });
  }
};


// SAVE PLACE
export const savePlace = async (req, res) => {
  try {
    const { heritageId } = req.params;

    const heritage = await Heritage.findById(heritageId);

    if (!heritage) {
      return res.status(404).json({
        success: false,
        message: "Heritage place not found",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadySaved = user.savedPlaces.some(
      (id) => id.toString() === heritageId
    );

    if (!alreadySaved) {
      user.savedPlaces.push(heritageId);
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Place saved successfully",
      isSaved: true,
    });
  } catch (error) {
    console.error("Save place error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save place",
    });
  }
};


// REMOVE SAVED PLACE
export const removeSavedPlace = async (req, res) => {
  try {
    const { heritageId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.savedPlaces = user.savedPlaces.filter(
      (id) => id.toString() !== heritageId
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Place removed from saved places",
      isSaved: false,
    });
  } catch (error) {
    console.error("Remove saved place error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove saved place",
    });
  }
};