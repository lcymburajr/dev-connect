import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: null
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
                error: null
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false,
                error: null
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false,
                error: null
            };
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === payload.id
                        ? { ...post, likes: payload.likes }
                        : post
                ),
                loading: false,
                error: null
            };
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== payload.id),
                loading: false,
                error: null
            };
        case ADD_COMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false,
                error: null
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(
                        (comment) => comment._id !== payload
                    )
                },
                loading: false,
                error: null
            };
        default:
            return state;
    }
};
