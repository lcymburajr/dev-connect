import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import PropTypes from 'prop-types';

const ProfileGithub = ({ username, getGithubRepos, repos, error }) => {
    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos, username]);
    return (
        <Fragment>
            {error !== null ? (
                <h4>No Github profile found</h4>
            ) : repos === null ? (
                <Spinner />
            ) : (
                repos.map((repo) => (
                    <div key={repo.id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className="badge badge-dark">
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li className="badge badge-light">
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </Fragment>
    );
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
    error: PropTypes.object
};

const mapStateToProps = (state) => ({
    repos: state.profile.repos,
    error: state.profile.error
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
