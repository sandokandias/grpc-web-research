import { Switch, Route } from 'react-router-dom';

import AppPay from './pages/AppPay';

const Routes = () => (
  <Switch>
    <Route path="/app-pay" exact component={AppPay} />
  </Switch>
);

export default Routes;
