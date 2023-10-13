import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from '../config';

// eslint-disable-next-line prefer-destructuring
const poolData:any = config.poolData;

export default new CognitoUserPool(poolData);
