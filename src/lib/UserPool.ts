import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from '../config';

const { poolData } = config;

export default new CognitoUserPool(poolData);
