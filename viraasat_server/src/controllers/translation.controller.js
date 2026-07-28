import Translation from "../models/Translation.js";

/**
 * GET /api/i18n
 *
 * Example:
 * /api/i18n?lang=hi&namespace=common
 *
 * Returns:
 * {
 *   success: true,
 *   language: "hi",
 *   namespace: "common",
 *   translations: {
 *      "navbar.home": "होम",
 *      "navbar.explore": "खोजें"
 *   }
 * }
 */
export const getTranslations = async (req, res) => {
  try {
    // Get requested language
    const language = (
      req.query.lang ||
      req.headers["accept-language"] ||
      "en"
    )
      .split(",")[0]
      .split("-")[0]
      .trim()
      .toLowerCase();

    // Get namespace
    const namespace = req.query.namespace || "common";

    // Fetch translations from MongoDB
    const records = await Translation.find({
      namespace,
    }).lean();

    const translations = {};

    records.forEach((record) => {
      const translatedValue =
        record.translations?.[language] ??
        record.translations?.en ??
        record.key;

      translations[record.key] = translatedValue;
    });

    return res.status(200).json({
      success: true,
      language,
      namespace,
      translations,
    });
  } catch (error) {
    console.error(
      "Get translations error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load translations",
    });
  }
};


/**
 * GET /api/i18n/all
 *
 * Useful for your admin Translation Manager.
 * Returns complete multilingual records.
 */
export const getAllTranslations = async (req, res) => {
  try {
    const namespace = req.query.namespace;

    const filter = namespace
      ? { namespace }
      : {};

    const translations =
      await Translation.find(filter)
        .sort({
          namespace: 1,
          key: 1,
        })
        .lean();

    return res.status(200).json({
      success: true,
      data: translations,
    });
  } catch (error) {
    console.error(
      "Get all translations error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch translations",
    });
  }
};


/**
 * POST /api/i18n
 *
 * Create a new translation key.
 */
export const createTranslation = async (
  req,
  res
) => {
  try {
    const {
      namespace = "common",
      key,
      translations,
      description,
    } = req.body;

    if (!key) {
      return res.status(400).json({
        success: false,
        message: "Translation key is required",
      });
    }

    if (
      !translations ||
      typeof translations !== "object"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Translations must be an object",
      });
    }

    const existing =
      await Translation.findOne({
        namespace,
        key,
      });

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Translation key already exists",
      });
    }

    const translation =
      await Translation.create({
        namespace,
        key,
        translations,
        description,
      });

    return res.status(201).json({
      success: true,
      data: translation,
    });
  } catch (error) {
    console.error(
      "Create translation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create translation",
    });
  }
};


/**
 * PUT /api/i18n/:id
 *
 * Update a translation.
 */
export const updateTranslation = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      namespace,
      key,
      translations,
      description,
    } = req.body;

    const translation =
      await Translation.findById(id);

    if (!translation) {
      return res.status(404).json({
        success: false,
        message: "Translation not found",
      });
    }

    if (namespace !== undefined) {
      translation.namespace = namespace;
    }

    if (key !== undefined) {
      translation.key = key;
    }

    if (translations !== undefined) {
      translation.translations =
        translations;
    }

    if (description !== undefined) {
      translation.description =
        description;
    }

    await translation.save();

    return res.status(200).json({
      success: true,
      data: translation,
    });
  } catch (error) {
    console.error(
      "Update translation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update translation",
    });
  }
};


/**
 * DELETE /api/i18n/:id
 *
 * Delete a translation.
 */
export const deleteTranslation = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const translation =
      await Translation.findByIdAndDelete(id);

    if (!translation) {
      return res.status(404).json({
        success: false,
        message: "Translation not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Translation deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete translation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete translation",
    });
  }
};