import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import User from "../models/User.js";

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientID || !googleClientSecret) {
    console.warn(
        "Skipping Google OAuth strategy registration: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing."
    );
} else {
    passport.use(

        new GoogleStrategy(

            {

                clientID: googleClientID,

                clientSecret: googleClientSecret,

                callbackURL:
                    "/api/auth/google/callback"

            },

            async (accessToken, refreshToken, profile, done) => {

            try {

                const email = profile.emails[0].value;

                let user = await User.findOne({
                    email
                });

                if (!user) {

                    user = await User.create({

                        name: profile.displayName,

                        email,

                        googleId: profile.id,

                        avatar: profile.photos[0].value,

                        provider: "google"

                    });

                }

                else {

                    // Update Google info if missing

                    if (!user.googleId) {

                        user.googleId = profile.id;

                        user.provider = "google";

                        user.avatar = profile.photos[0].value;

                        await user.save();

                    }

                }

                done(null, user);

            }

            catch (err) {

                done(err, null);

            }

        }

    )

    );
}
