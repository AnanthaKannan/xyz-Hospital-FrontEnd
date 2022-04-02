import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config  from '../config';

const poolData:any = config.poolData;

export default new CognitoUserPool(poolData);
