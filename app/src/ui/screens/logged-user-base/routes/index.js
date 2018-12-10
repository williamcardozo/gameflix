import React from 'react'
import { GamesScreen, OrdersScreen} from '@screens'

export const routes = [
  {
    path: "/games",
    exact: true,
    main: () => <GamesScreen />
  },
  {
    path: "/orders",
    main: () => <OrdersScreen />
  }
];
  