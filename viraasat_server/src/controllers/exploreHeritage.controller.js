import Heritage from "../models/Heritage.js";

export const getHeritages = async (req, res) => {
  try {
    const {
      search,
      category,
      state,
      city,
      era,
      featured,
      sort = "newest",
      page = 1,
      limit = 12,
    } = req.query;

    const query = {
      isActive: true,
    };

    // Search
    if (search?.trim()) {
      const regex = new RegExp(search.trim(), "i");

      query.$or = [
        { name: regex },
        { description: regex },
        { city: regex },
        { state: regex },
        { tags: regex },
      ];
    }

    // Filters
    if (category) {
      query.category = category;
    }

    if (state) {
      query.state = state;
    }

    if (city) {
      query.city = city;
    }

    if (era) {
      query.era = era;
    }

    if (featured !== undefined) {
      query.featured = featured === "true";
    }

    // Pagination
    const currentPage = Math.max(Number(page), 1);
    const pageSize = Math.min(Math.max(Number(limit), 1), 50);

    const skip = (currentPage - 1) * pageSize;

    // Sorting
    let sortQuery = {};

    switch (sort) {
      case "rating":
        sortQuery = { rating: -1 };
        break;

      case "name":
        sortQuery = { name: 1 };
        break;

      case "oldest":
        sortQuery = { builtYear: 1 };
        break;

      case "newest":
      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    const [heritages, total] = await Promise.all([
      Heritage.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(pageSize)
        .lean(),

      Heritage.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,

      data: heritages,

      pagination: {
        total,
        page: currentPage,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
        hasNextPage: currentPage < Math.ceil(total / pageSize),
        hasPreviousPage: currentPage > 1,
      },
    });
  } catch (error) {
    console.error("Get heritages error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch heritage places",
    });
  }
};


export const getHeritageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const heritage = await Heritage.findOne({
      slug,
      isActive: true,
    }).lean();

    if (!heritage) {
      return res.status(404).json({
        success: false,
        message: "Heritage place not found",
      });
    }

    res.status(200).json({
      success: true,
      data: heritage,
    });
  } catch (error) {
    console.error("Get heritage by slug error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch heritage place",
    });
  }
};