import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
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
