import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const ProfileExperience = ({
    experience: { title, company, location, from, to, current, description }
}) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
                {current ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p>
                <strong>Position: </strong>
                {title}
            </p>
            {description && (
                <p>
                    <strong>Description: </strong>
                    {description}
                </p>
            )}
        </div>
    );
};

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired
};

export default ProfileExperience;
