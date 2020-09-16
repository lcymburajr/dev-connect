import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../layouts/Spinner';
import DashboardActions from './DashBoardActions';
import Experience from './Experience';
import Education from './Education';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <FontAwesomeIcon icon="user" /> Weclome {user && user.name}
            </p>
            {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />

                    <div className="my-1">
                        <button
                            onClick={() => deleteAccount()}
                            className="btn btn-danger"
                        >
                            <FontAwesomeIcon icon="user-minus" /> Delete My
                            Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <p>
                        You have not yet setup a profile, please add some info.
                    </p>
                    <Link to="create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

const actionCreators = {
    getCurrentProfile,
    deleteAccount
};

export default connect(mapStateToProps, actionCreators)(Dashboard);
