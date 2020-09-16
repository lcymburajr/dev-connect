import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/post';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommentItem = ({
    auth,
    postId,
    comment: { _id, text, name, avatar, user, date },
    deleteComment
}) => {
    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt="" />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button
                        onClick={() => deleteComment(postId, _id)}
                        type="button"
                        className="btn btn-danger"
                    >
                        <FontAwesomeIcon icon="times" />
                    </button>
                )}
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);