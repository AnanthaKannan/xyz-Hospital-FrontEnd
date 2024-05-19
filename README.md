## Digital Hospital frontend
This repository houses an application designed for hospital management, 
serving as a tool to efficiently handle and organize hospital data.

## Write you query here:
Email: sreeananthakannan@gmail.com

#### Demo for the application
You run the application [here](http://xyzhospital.surge.sh) http://xyzhospital.surge.sh

#### Run the application in your local
* Install the node js V20.13.1
* Install pnpm `npm i -g pnpm@9.1.1`
* clone the code in your local `git clone https://github.com/AnanthaKannan/digitalHospital-FrontEnd.git`
* Run the command `pnpm install`
* Rename the `example.env` file to `.env` and populate it with the appropriate values 
* update your configuration [here](cypress/config) for cypress
* Run the command to start the application `pnpm run dev`

#### Environment values
1. [VITE_APP_API_URL](https://us-east-1.console.aws.amazon.com/apigateway/main/apis/u2f00s7xt0/stages?api=u2f00s7xt0&region=us-east-1)
2. [VITE_APP_USER_POOL_ID](https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools/us-east-1_zW6IRMaXK/users?region=us-east-1)
3. [VITE_APP_CLIENT_ID](https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools/us-east-1_zW6IRMaXK/app-integration?region=us-east-1)
4. `VITE_APP_REGION` - us-east-1

#### Run cypress
Cypress is a powerful end-to-end testing framework that is often used in conjunction with React.js to ensure the reliability and functionality of web applications. It allows developers to write and execute automated tests for React.js applications in a user-friendly and intuitive manner.
`pnpm run cypress` to run cypres. Basic about [cypress](./CYPRESS.md)

#### Run Backend
we have used back-end service by aws. [here](https://github.com/AnanthaKannan/xyzHospital-backend)
our reference for the backend

## Reference
https://redux-toolkit.js.org/rtk-query/usage/examples
https://www.apollographql.com/docs/react/data/queries/#manual-execution-with-uselazyquery
