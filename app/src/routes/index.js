import React from 'react'
import { LoginScreen, LoggedUserBaseScreen} from '@screens'

export const routes = [
  {
    path: "/",
    exact: true,
    main: () => <LoginScreen />
  },
  {
    path: "/games",
    main: () => <LoggedUserBaseScreen />
  },
  ,
  {
    path: "/orders",
    main: () => <LoggedUserBaseScreen />
  }
];
  