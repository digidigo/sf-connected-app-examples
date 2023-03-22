import { connect } from "../../utils/mongodb";
import passport from "../../utils/passport";

import cookie from "cookie";

export default async function handler(req, res) {
  passport.authenticate("salesforce", async function (err, user, info) {
    if (err) {
      res.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/failure`);
      return;
    }

    if (!user) {
      res.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/failure`);
      return;
    }

    console.log("user:", user);

    // Save tokens to MongoDB
    try {
      const db = await connect();
      const collection = db.collection("users");
      await collection.updateOne(
        { userId: user.profile.user_id },
        {
          $set: {
            userId: user.profile.user_id,
            displayName: user.profile.name,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            restUrl: user.profile.urls.rest,
            instanceUrl: user.profile.urls.custom_domain,
          },
        },
        { upsert: true }
      );
    } catch (error) {
      console.error("Error saving tokens to MongoDB:", error);
      res.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/error`);
      return;
    }

    // Set cookies
    const userIdCookie = cookie.serialize("userId", user.profile.user_id, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    const displayNameCookie = cookie.serialize(
      "displayName",
      user.profile.name,
      {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      }
    );

    res.setHeader("Set-Cookie", [userIdCookie, displayNameCookie]);

    res.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  })(req, res);
}
