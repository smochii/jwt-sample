import express from 'express';
import { SignOptions } from 'jsonwebtoken';
import Auth from './auth';

/** express instance */
const app: express.Express = express();
/** express router */
const router: express.Router = express.Router();
/** auth */
const auth: Auth = new Auth();
/** response json interface */
interface responseJson {
  message?: string;
  data?: any;
}

/**
 * sign
 * @param req 
 * @param res 
 */
function sign(req: express.Request, res: express.Response) {
  const response: responseJson = {};
  const username = req.body.username;
  if (!username) {
    response.message = 'username input required.';
    return res.status(400).send(response);
  }

  const payload: object = {
    user: req.params.username
  };
  const option: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1m'
  }
  const token = auth.sign(payload, option);

  response.data = { token: token };
  res.status(200).send(response);
}

/**
 * verify
 * @param req 
 * @param res 
 */
async function verify(req: express.Request, res: express.Response) {
  const response: responseJson = {};
  const token = req.body.token;
  if (!token) {
    response.message = 'token input required.';
    return res.status(400).send(response);
  }

  try {
    const decoded = await auth.verify(token);
    response.data = decoded;
    return res.status(200).send(response);
  } catch (e) {
    response.message = 'token verify failed.';
    return res.status(401).send(response);
  }
  
}

// allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
});
//body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// set roter
router.post('/sign', sign);
router.post('/verify', verify);
app.use(router);
app.use(express.static('public'));
// run server
app.listen(3000, () => { console.log('listening on port 3000') });