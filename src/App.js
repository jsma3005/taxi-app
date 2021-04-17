import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import AboutOrder from './components/AboutOrder/AboutOrder';
import Navbar from './components/Navbar/Navbar';
import Auth from './pages/Auth/Auth';
import Main from './pages/Main/Main';
import Orders from './pages/Orders/Orders';
import UserCabinet from './pages/UserCabinet/UserCabinet';
import {CurrentUserProvider} from './contexts/currentUser';
import { FilteredOrderProvider } from './contexts/filteredOrder';

function App() {
  return (
    <Router>
      <CurrentUserProvider>
        <FilteredOrderProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Auth} />
            <Route path="/register" component={Auth} />
            <Route path="/orders" component={Orders} />
            <Route path="/order/:uid/:id" component={AboutOrder} />
            <Route path="/user/cabinet" component={UserCabinet} />
            <Redirect to="/" />
          </Switch>
        </FilteredOrderProvider>
      </CurrentUserProvider>
    </Router>
  );
}

export default App;