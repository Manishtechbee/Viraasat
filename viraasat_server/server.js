import "dotenv/config";
import app from "./app.js";
import connectDB from "./src/config/db.js";
import "./src/config/passport.js";
import { seedLanguages } from "./seed/languages.js";
import { seedTranslations } from "./seed/translations.js";

connectDB();
seedLanguages();
seedTranslations();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started at port ${port}`);
});
