import { type } from "os";
import  CreateDoctor from "./page/CreateDoctor";
import React from 'react'



type routeType = {
    PATH: string,
    COMPONENT: any
}

const routes: routeType[] = [
  {
    COMPONENT: <CreateDoctor />,
    PATH: '/create-doctor'
  },
  {
    COMPONENT: <CreateDoctor />,
    PATH: '/'
  }
]

export default routes