import passport from "../../utils/passport";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const action = req.query.action;
    if (action === "login") {
      passport.authenticate("salesforce")(req, res);
    } else if (action === "logout") {
      res.status(200).json();
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
