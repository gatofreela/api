import express from "express";
import $callback from "#controllers/dev/callback";
const dev = express.Router();

 // login route with GitHub auth2
dev.get('/auth2',  async (req, res) => {
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=dev,repo,read:org`);
});
 
 // the code to get the token from github 
dev.get("/callback", $callback);

export default dev;