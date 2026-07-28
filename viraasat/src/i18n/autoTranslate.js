import i18n from "./i18n";

const API_URL = import.meta.env.VITE_API_URL;

const registeredTexts = new Map();

let queue = [];
let timer = null;
let requestInProgress = false;

/*
|--------------------------------------------------------------------------
| Register text discovered by Vite plugin
|--------------------------------------------------------------------------
*/

export const registerTranslation = (
  key,
  text
) => {
  if (!key || !text) return;

  registeredTexts.set(key, text);

  /*
   * If current language isn't English,
   * make sure this text gets translated.
   */
  if (
    i18n.isInitialized &&
    i18n.language !== "en"
  ) {
    queueTranslation(key, text);
  }
};

/*
|--------------------------------------------------------------------------
| Queue translation
|--------------------------------------------------------------------------
*/

const queueTranslation = (
  key,
  text
) => {
  const language = i18n.language;

  if (!language || language === "en") {
    return;
  }

  /*
   * Check actual resource instead of i18n.t().
   */
  const existing =
    i18n.getResource(
      language,
      "auto",
      key
    );

  if (existing) {
    return;
  }

  /*
   * Prevent duplicates.
   */
  const alreadyQueued = queue.some(
    (item) => item.key === key
  );

  if (alreadyQueued) {
    return;
  }

  queue.push({
    key,
    text,
  });

  scheduleRequest();
};

/*
|--------------------------------------------------------------------------
| Batch requests
|--------------------------------------------------------------------------
*/

const scheduleRequest = () => {
  if (timer) {
    return;
  }

  timer = setTimeout(() => {
    timer = null;

    processQueue();
  }, 150);
};

/*
|--------------------------------------------------------------------------
| Send translations to backend
|--------------------------------------------------------------------------
*/

const processQueue = async () => {
  if (
    requestInProgress ||
    queue.length === 0
  ) {
    return;
  }

  const language = i18n.language;

  if (!language || language === "en") {
    queue = [];
    return;
  }

  const items = [...queue];

  queue = [];

  requestInProgress = true;

  try {
    console.log(
      "🌐 Translating batch:",
      language,
      items.length
    );

    const response = await fetch(
      `${API_URL}/i18n/auto/translate`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          language,
          texts: items,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Translation request failed"
      );
    }

    const translations =
      data.translations || {};

    /*
     * Add everything to i18next.
     *
     * addResource() emits the "added" event
     * which react-i18next can listen to.
     */
    Object.entries(translations).forEach(
      ([key, value]) => {
        i18n.addResource(
          language,
          "auto",
          key,
          value,
          
        );
      }
    );

    console.log(
      "✅ Batch translated:",
      data
    );
  } catch (error) {
    console.error(
      "❌ Automatic translation failed:",
      error
    );

    /*
     * Put failed items back into queue
     * so they can be retried later.
     */
    queue = [
      ...items,
      ...queue,
    ];
  } finally {
    requestInProgress = false;

    if (queue.length > 0) {
      scheduleRequest();
    }
  }
};

/*
|--------------------------------------------------------------------------
| Translate text
|--------------------------------------------------------------------------
*/

export const translateText = (
  key,
  fallbackText
) => {
  /*
   * Always register the text.
   */
  registerTranslation(
    key,
    fallbackText
  );

  const language = i18n.language;

  /*
   * English = original text.
   */
  if (language === "en") {
    return fallbackText;
  }

  const translated =
    i18n.getResource(
      language,
      "auto",
      key
    );

  /*
   * Translation already available.
   */
  if (translated) {
    return translated;
  }

  /*
   * Translation isn't available yet.
   */
  return fallbackText;
};

/*
|--------------------------------------------------------------------------
| Change language
|--------------------------------------------------------------------------
*/

export const preloadAutoTranslations = async (
  language
) => {
  if (
    !language ||
    language === "en"
  ) {
    return;
  }

  const texts = Array.from(
    registeredTexts.entries()
  ).map(([key, text]) => ({
    key,
    text,
  }));

  if (texts.length === 0) {
    return;
  }

  /*
   * Find which strings are missing.
   */
  const missing = texts.filter(
    ({ key }) => {
      return !i18n.getResource(
        language,
        "auto",
        key
      );
    }
  );

  if (missing.length === 0) {
    console.log(
      "⚡ All automatic translations already cached"
    );

    return;
  }

  console.log(
    `🌐 Preloading ${missing.length} translations for ${language}`
  );

  try {
    const response = await fetch(
      `${API_URL}/i18n/auto/translate`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          language,
          texts: missing,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Translation preload failed"
      );
    }

    Object.entries(
      data.translations || {}
    ).forEach(([key, value]) => {
      i18n.addResource(
        language,
        "auto",
        key,
        value
      );
    });

    console.log(
      "⚡ Automatic translations preloaded",
      data
    );
  } catch (error) {
    console.error(
      "❌ Translation preload failed:",
      error
    );
  }
};

/*
|--------------------------------------------------------------------------
| Get all registered texts
|--------------------------------------------------------------------------
*/

export const getRegisteredTranslations =
  () => {
    return Array.from(
      registeredTexts.entries()
    ).map(([key, text]) => ({
      key,
      text,
    }));
  };