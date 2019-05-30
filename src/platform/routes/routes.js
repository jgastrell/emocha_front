import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';
// Feature imports
import Orders from '../../core/components/orders';
import Widgets from '../../core/components/widgets';
import CurrentOrder from '../../core/components/currentOrder';
// Layout import
import MainLayout from '../shared/layout';

const PrivateRoutes = props => {
  const [badgeCounter, setBadgeCounter] = useState(0);
  const [currentOrder, setCurrentOrder] = useState([]);

  const mainRoutes = [
    {
      path: "/orders",
      main: Orders,
    },
    {
      path: "/widgets",
      main: Widgets,
    },
    {
      path: "/currentOrder",
      main: CurrentOrder,
    },
  ];

  return (
    <MainLayout {...props} badgeCounter={badgeCounter} >
      <Switch>
        {mainRoutes.map((route, index) => {
          return <Route
                   key={index}
                   render={() => 
                    <route.main
                      currentOrder={currentOrder}
                      badgeCounter={badgeCounter}
                      setCurrentOrder={setCurrentOrder}
                      setBadgeCounter={setBadgeCounter}
                    />}
                   path={route.path}
                 />;
        })}
      </Switch>
    </MainLayout>
  );
};

export default PrivateRoutes;
