import mongoose from "mongoose";

const translationSchema = new mongoose.Schema(
  {
    namespace: {
      type: String,
      default: "common",
      index: true,
    },

    key: {
      type: String,
      required: true,
      index: true,
    },

    /*
     * Original English text.
     *
     * Useful for automatically generated
     * translations.
     */
    sourceText: {
      type: String,
    },

    /*
     * All language versions.
     *
     * Example:
     *
     * {
     *   en: "Featured Heritage",
     *   hi: "प्रमुख विरासत",
     *   pa: "ਪ੍ਰਮੁੱਖ ਵਿਰਾਸਤ"
     * }
     */
    translations: {
      type: Map,
      of: String,
      default: {},
    },

    /*
     * How this translation was created.
     */
    generatedBy: {
      type: String,
      enum: [
        "manual",
        "ai",
        "system",
      ],
      default: "manual",
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

translationSchema.index(
  {
    namespace: 1,
    key: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "Translation",
  translationSchema
);