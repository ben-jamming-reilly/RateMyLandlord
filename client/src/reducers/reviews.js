import {
  GET_REVIEWS,
  LIKE_REVIEW,
  UNLIKE_REVIEW,
  ADD_REVIEW,
  UPDATE_REVIEW,
  LOADING_REVIEWS,
} from "../actions/types";

const initialState = {
  review: {},
  reviews: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false,
      };
    case ADD_REVIEW:
      return {
        ...state,
        review: payload,
        reviews: [payload, ...state.reviews],
        loading: false,
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        review: payload,
        reviews: [
          payload,
          ...state.reviews.reviews.filter((r) => r.user_id !== payload.user_id),
        ],
        loading: false,
      };
    case LIKE_REVIEW:
      return {
        ...state,
        reviews: [
          state.reviews.reviews.map((r) =>
            payload.user_id == r.user_id
              ? { ...r, num_likes: r.num_likes++ }
              : r
          ),
        ],
        loading: false,
      };
    case UNLIKE_REVIEW:
      return {
        ...state,
        loading: false,
      };
    case LOADING_REVIEWS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
