import React from 'react';
import {Route, Redirect} from 'react-router';

import {
    App,
    Home,
    Signin,
    Detail,
} from 'containers';
import {
  RequireLogin,
  RequireUnLogin,
} from 'checkers';

const routes = (
  <Route component={App}>

    <Route component={RequireLogin}>
      <Route path="/" component={Home} />
      <Route path="/detail/:id" component={Detail} />
    </Route>

    <Route component={RequireUnLogin}>
      <Route path="/signin" component={Signin} />
    </Route>

    {/*
      使用者亂輸入url, 就一律導回signin頁
    */}

    <Redirect from="*" to="/signin" />

  </Route>
);

export default routes;
