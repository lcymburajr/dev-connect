import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import PublicRoute from '../routing/PublicRoute';

// Components
import Dashboard from '../dashboard/Dashboard';
import Register from '../auth/Register';
import CreateProfile from '../profile-form/CreateProfile';
import EditProfile from '../profile-form/EditProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import AddExperience from '../profile-form/AddExperience';
import AddEducation from '../profile-form/AddEducation';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Login from '../auth/Login';
import Alert from '../layouts/Alert';
import NotFound from '../layouts/NotFound';

const Routes = () => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <PublicRoute exact path="/register" component={Register} />
                <PublicRoute exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                />
                <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                />
                <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                />
                <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/post/:id" component={Post} />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;
