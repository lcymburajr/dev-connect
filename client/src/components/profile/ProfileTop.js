import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const ProfileTop = ({
    profile: {
        status,
        company,
        location,
        website,
        social,
        user: { name, avatar }
    }
}) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img className="round-img my-1" src={avatar} alt="" />
            <h1 className="large">{name}</h1>
            <p className="lead">
                {status} {company && `at ${company}`}
            </p>
            <p>{location && location}</p>
            <div className="icons my-1">
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon
                            icon="globe"
                            className="i fa-2x fa-globe"
                        />
                    </a>
                )}
                {social.twitter && (
                    <a
                        href={social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={['fab', 'twitter']}
                            className="i fa-2x fa-twitter"
                        />
                    </a>
                )}
                {social.facebook && (
                    <a
                        href={social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={['fab', 'facebook']}
                            className="i fa-2x fa-facebook"
                        />
                    </a>
                )}
                {social.linkedin && (
                    <a
                        href={social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={['fab', 'linkedin']}
                            className="i fa-2x fa-linkedin"
                        />
                    </a>
                )}
                {social.youtube && (
                    <a
                        href={social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={['fab', 'youtube']}
                            className="i fa-2x fa-youtube"
                        />
                    </a>
                )}
                {social.instagram && (
                    <a
                        href={social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={['fab', 'instagram']}
                            className="i fa-2x fa-instagram"
                        />
                    </a>
                )}
            </div>
        </div>
    );
};

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileTop;
