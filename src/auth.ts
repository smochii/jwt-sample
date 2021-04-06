import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import log4js from 'log4js'

/** secret key */
const SECRET_KEY: Secret = '******';
/** logger */
const logger = log4js.getLogger()

export default class Auth {
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
  sign(payload: object, option: SignOptions): string {
    const token: string = jwt.sign(payload, SECRET_KEY, option);
    logger.info(`token:${token}`);
    return token;
  }
  
  /**
   * verify token
   * @param token 
   */
  verify(token: string): Promise<object|undefined> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          logger.error("token verify failed");
          reject('');
        }

        logger.info(`decoded:${JSON.stringify(decoded)}`);
        resolve(decoded);
      });
    })
  }
}