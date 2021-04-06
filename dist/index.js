"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
/** express instance */
const app = express_1.default();
/** express router */
const router = express_1.default.Router();
/** auth */
const auth = new auth_1.default();
/**
 * sign
 * @param req
 * @param res
 */
function sign(req, res) {
    const response = {};
    const username = req.body.username;
    if (!username) {
        response.message = 'username input required.';
        return res.status(400).send(response);
    }
    const payload = {
        user: req.params.username
    };
    const option = {
        algorithm: 'HS256',
        expiresIn: '1m'
    };
    const token = auth.sign(payload, option);
    response.data = { token: token };
    res.status(200).send(response);
}
/**
 * verify
 * @param req
 * @param res
 */
async function verify(req, res) {
    const response = {};
    const token = req.body.token;
    if (!token) {
        response.message = 'token input required.';
        return res.status(400).send(response);
    }
    try {
        const [result, decoded] = await auth.verify(token);
        response.data = decoded;
        return res.status(200).send(response);
    }
    catch (e) {
        response.message = 'token verify failed.';
        return res.status(401).send(response);
    }
}
// allow cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
//body parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// set roter
router.post('/sign', sign);
router.post('/verify', verify);
app.use(router);
// run server
app.listen(3000, () => { console.log('listening on port 3000'); });
//# sourceMappingURL=index.js.map