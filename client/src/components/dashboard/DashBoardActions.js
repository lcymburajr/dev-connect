import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const DashBoardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="/edit-profile" className="btn btn-light">
                <FontAwesomeIcon
                    icon="user-circle"
                    className="text-primary"
                ></FontAwesomeIcon>{' '}
                Edit Profile
            </Link>
            <Link to="/add-experience" className="btn btn-light">
                <FontAwesomeIcon
                    icon={['fab', 'black-tie']}
                    className="text-primary"
                ></FontAwesomeIcon>{' '}
                Add Experience
            </Link>
            <Link to="/add-education" className="btn btn-light">
                <FontAwesomeIcon
                    icon="graduation-cap"
                    className="text-primary"
                ></FontAwesomeIcon>{' '}
                Add Education
            </Link>
        </div>
    );
};

export default DashBoardActions;
