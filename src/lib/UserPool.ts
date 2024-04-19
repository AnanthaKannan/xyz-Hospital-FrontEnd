import { CognitoUserPool, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { toast } from 'react-toastify';

import config from '../config';

const poolData:any = config.poolData;
const UserPool = new CognitoUserPool(poolData);
export default UserPool

export const forgotPassword = (email) => {
  const cognitoUser = new CognitoUser({ Username: email, Pool: UserPool });
  cognitoUser.forgotPassword({
    onSuccess(data:any) {
      console.log(`CodeDeliveryData from forgotPassword:${data}`);
      toast.success('Verification Code has been sent to your email');
    },
    onFailure(err:any) {
      console.log(`error: ${err}`);
      toast.error(err.message);
    },
  });
};

export function getSessionService() {
  const cognitoUser = UserPool.getCurrentUser();
  return new Promise<CognitoUserSession>((resolve, reject) => {
    if (!cognitoUser) {
      reject(new Error("No user found"));
      return;
    }
    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err) {
        reject(err);
        return;
      }
      if (!session) {
        reject(new Error("No session found"));
        return;
      }
      resolve(session);
    })
  })
}

export const refreshTokenService = async() => {
  const cognitoUserSession = await getSessionService();
  console.log('cognitoUserSession', cognitoUserSession)
  return new Promise(async (resolve, reject) => {
    const refreshToken: any  = cognitoUserSession.getRefreshToken();
    const cognitoUser = new CognitoUser({
      Username: localStorage.getItem('CognitoIdentityServiceProvider.7b9nc4bje1pmfkgqtrqu70od78.LastAuthUser'),
      Pool: UserPool,
      Storage: window.localStorage
    });
    cognitoUser.refreshSession(refreshToken, (err, result) => {
      console.log({err, result})
      if (err) {
        reject(err)
        return
      }
      resolve(result);
    });
  });
}
