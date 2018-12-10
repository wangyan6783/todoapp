import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import TodosPage from './components/todos-page';

const routes = (
  <div>
    <Route path='/(:filter)' component={App}>
      <IndexRoute component={TodosPage} />
    </Route>
  </div>
);

export default routes;
