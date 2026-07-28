import Translation from "../models/Translation.js";
import Language from "../models/Language.js";
import {
  translateTextsWithAI,
} from "../services/translationAI.service.js";

export const translateMissingTexts = async (
  req,
  res
) => {
  try {
    const {
      language,
      texts,
    } = req.body;

    if (!language) {
      return res.status(400).json({
        success: false,
        message:
          "Target language is required",
      });
    }

    if (
      !Array.isArray(texts) ||
      texts.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "texts must be a non-empty array",
      });
    }

    /*
     * Verify requested language exists.
     */

    const targetLanguage =
      await Language.findOne({
        code: language,
        isActive: true,
      }).lean();

    if (!targetLanguage) {
      return res.status(400).json({
        success: false,
        message:
          "Unsupported language",
      });
    }

    /*
     * Remove duplicates.
     */

    const uniqueTexts = Array.from(
      new Map(
        texts.map((item) => [
          item.key,
          item,
        ])
      ).values()
    );

    /*
     * Check MongoDB.
     */

    const keys = uniqueTexts.map(
      (item) => item.key
    );

    const existing =
      await Translation.find({
        namespace: "auto",
        key: {
          $in: keys,
        },
      }).lean();

    const existingMap = new Map(
      existing.map((item) => [
        item.key,
        item,
      ])
    );

    /*
     * Only send missing translations to AI.
     */

    const missing = uniqueTexts.filter(
      (item) => {
        const record =
          existingMap.get(item.key);

        return !(
          record?.translations?.[language]
        );
      }
    );

    let generated = [];

    if (missing.length > 0) {
      generated =
        await translateTextsWithAI({
          sourceLanguage: "en",
          targetLanguage: language,
          texts: missing,
        });
    }

    /*
     * Save AI translations.
     */

    for (const item of generated) {
      const original =
        uniqueTexts.find(
          (text) =>
            text.key === item.key
        );

      if (!original) continue;

      await Translation.findOneAndUpdate(
        {
          namespace: "auto",
          key: item.key,
        },

        {
          $set: {
            sourceText:
              original.text,

            [`translations.${language}`]:
              item.translatedText,

            generatedBy: "ai",
          },

          $setOnInsert: {
            namespace: "auto",
            key: item.key,
          },
        },

        {
          upsert: true,
          new: true,
        }
      );
    }

    /*
     * Return all requested translations.
     */

    const records =
      await Translation.find({
        namespace: "auto",
        key: {
          $in: keys,
        },
      }).lean();

    const translations = {};

    records.forEach((record) => {
      const value =
        record.translations?.[language];

      if (value) {
        translations[record.key] =
          value;
      }
    });

    return res.status(200).json({
      success: true,
      language,
      translations,
      generatedCount:
        generated.length,
      cachedCount:
        uniqueTexts.length -
        missing.length,
    });
  } catch (error) {
    console.error(
      "Automatic translation error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate translations",
    });
  }
};