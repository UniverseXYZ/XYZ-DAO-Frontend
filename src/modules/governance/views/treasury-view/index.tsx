import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TreasuryHoldings from './treasury-holdings';

const TreasuryView: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/governance/treasury/holdings" component={TreasuryHoldings} />
      </Switch>
    </>
  );
};

export default TreasuryView;
