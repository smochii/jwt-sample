"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const log4js_1 = __importDefault(require("log4js"));
/** secret key */
const SECRET_KEY = '******';
/** logger */
const logger = log4js_1.default.getLogger();
class Auth {
    /**
     * constructor
     */
    constructor() {
        logger.level = 'all';
    }
    /**
     * sign and response token
     * @param payload
     * @param option
     */
    sign(payload, option) {
        const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, option);
        logger.info(`token:${token}`);
        return token;
    }
    /**
     * verify token
     * @param token
     */
    verify(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    logger.error("token verify failed");
                    reject([false, '']);
                }
                logger.info(`decoded:${JSON.stringify(decoded)}`);
                resolve([true, decoded]);
            });
        });
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map