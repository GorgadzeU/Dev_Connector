import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private-route/private-route.component';

import Navbar from './components/navbar/navbar.component';
import Landing from './components/landing/landing.component';
import Register from './pages/register.page';
import Login from './pages/login.page';
import Dashboard from './pages/dashboard';
import CreateProfile from './pages/profile-forms/create-profile';
import EditProfile from './pages/profile-forms/edit-profile';
import AddExperience from './pages/profile-forms/add-experience';
import AddEducation from './pages/profile-forms/add-education';
import Profiles from './pages/profiles.page';
import Profile from './pages/profile.page';
import Posts from './pages/posts.page';
import Post from './pages/post.page';
import Alert from './components/alert/alert.component';

import { loadUser } from './redux/auth/auth.actions';
import setAuthToken from './redux/auth/auth.utils';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ loadUser }) {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <Fragment>
      <Navbar />
      <Route path='/' exact component={Landing} />
      <section>
        <Alert />
        <Switch>
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <Route path='/profiles' exact component={Profiles} />
          <Route path='/profile/:id' component={Profile} />
          <PrivateRoute path='/dashboard' exact component={Dashboard} />
          <PrivateRoute
            path='/create-profile'
            exact
            component={CreateProfile}
          />
          <PrivateRoute path='/edit-profile' exact component={EditProfile} />
          <PrivateRoute
            path='/add-experience'
            exact
            component={AddExperience}
          />
          <PrivateRoute path='/add-education' exact component={AddEducation} />
          <PrivateRoute path='/posts' exact component={Posts} />
          <PrivateRoute path='/posts/:id' exact component={Post} />
        </Switch>
      </section>
    </Fragment>
  );
}

export default connect(null, { loadUser })(App);
