// req = get stuff
// res = send stuff back
// next = request to move forward (run before req)
const { verify } = require("jsonwebtoken"); //verify if correct

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken"); // Front End to Backedn store in header rather than using cookies

  if (!accessToken) {
    return;
    res.json({ error: "User not logged in!" }); //check if user has a token
  }

  try {
    const validToken = verify(accessToken, "importantsecret"); //check if the token is real by comparing accessToken from req to secrets from when creating the token
    //const username = validToken.username;
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
