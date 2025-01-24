import { logger } from "#functions/logger";
import axios from "axios";

const $callback = async (req, res) => {
  
  const { code } = req.query;

  if (!code) {
    return res.status(404).send('GitHub authorization code not found');
  };
  
  await axios.post('https://github.com/login/oauth/access_token', null, {
    params: {
     client_id: process.env.GITHUB_CLIENT_ID,
     client_secret: process.env.GITHUB_CLIENT_SECRET,
     code: code,
    },
    headers: {
      accept: 'application/json',
    },
  }).then(async ({ data }) => {
  
    if (data?.error) {
      return res.redirect("/dev/auth2");
    };
   
   const url = process.env.URL_REDIRECT + `?token_type=${data.token_type}&token=${data.access_token}`;
   
   return res.redirect(url);
     
  }).catch((err) => {
    logger.error(err.message);
    return res.status(500).send(err.message)
  });
  
};


export default $callback;