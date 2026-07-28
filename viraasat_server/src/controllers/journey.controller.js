import Journey from "../models/Journey.js";


// =====================================================
// GET USER JOURNEYS
// =====================================================

export const getMyJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find({
      user: req.user._id,
    })
      .populate({
        path: "places.heritage",
        select:
          "name slug image images category location city state rating",
      })
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: journeys.length,
      journeys,
    });
  } catch (error) {
    console.error("Get journeys error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch journeys",
    });
  }
};


// =====================================================
// GET SINGLE JOURNEY
// =====================================================

export const getJourneyById = async (req, res) => {
  try {
    const journey = await Journey.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate({
      path: "places.heritage",
      select:
        "name slug image images category location city state rating description",
    });

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: "Journey not found",
      });
    }

    return res.status(200).json({
      success: true,
      journey,
    });
  } catch (error) {
    console.error("Get journey error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch journey",
    });
  }
};


// =====================================================
// CREATE JOURNEY
// =====================================================

export const createJourney = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      startDate,
      endDate,
      places = [],
      source = "manual",
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Journey title is required",
      });
    }

    const journey = await Journey.create({
      user: req.user._id,
      title: title.trim(),
      description: description?.trim() || "",
      location: location?.trim() || "",
      startDate: startDate || null,
      endDate: endDate || null,
      places: places.map((heritage, index) => ({
        heritage,
        order: index,
      })),
      source,
      status: startDate
        ? new Date(startDate) > new Date()
          ? "Upcoming"
          : "Ongoing"
        : "Draft",
    });

    const populatedJourney = await Journey.findById(
      journey._id
    ).populate({
      path: "places.heritage",
      select:
        "name slug image images category location city state rating",
    });

    return res.status(201).json({
      success: true,
      message: "Journey created successfully",
      journey: populatedJourney,
    });
  } catch (error) {
    console.error("Create journey error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create journey",
    });
  }
};


// =====================================================
// DELETE JOURNEY
// =====================================================

export const deleteJourney = async (req, res) => {
  try {
    const journey = await Journey.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: "Journey not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Journey deleted successfully",
    });
  } catch (error) {
    console.error("Delete journey error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete journey",
    });
  }
};


// =====================================================
// TOGGLE PLACE VISITED
// =====================================================

export const toggleJourneyPlace = async (req, res) => {
  try {
    const { journeyId, heritageId } = req.params;

    const journey = await Journey.findOne({
      _id: journeyId,
      user: req.user._id,
    });

    if (!journey) {
      return res.status(404).json({
        success: false,
        message: "Journey not found",
      });
    }

    const place = journey.places.find(
      (item) =>
        item.heritage.toString() === heritageId
    );

    if (!place) {
      return res.status(404).json({
        success: false,
        message: "Place not found in journey",
      });
    }

    place.visited = !place.visited;

    place.visitedAt = place.visited
      ? new Date()
      : null;

    const visitedCount = journey.places.filter(
      (item) => item.visited
    ).length;

    if (
      journey.places.length > 0 &&
      visitedCount === journey.places.length
    ) {
      journey.status = "Completed";
    } else if (visitedCount > 0) {
      journey.status = "Ongoing";
    }

    await journey.save();

    return res.status(200).json({
      success: true,
      message: place.visited
        ? "Place marked as visited"
        : "Place marked as not visited",
      journey,
    });
  } catch (error) {
    console.error(
      "Toggle journey place error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update journey place",
    });
  }
};