import {
  RECEIVE_THREAD_DETAIL,
  OPTIMISTIC_TOGGLE_THREAD_VOTE,
  OPTIMISTIC_TOGGLE_COMMENT_VOTE,
  THREAD_DETAIL_VOTE_FAILED,
} from './action';

function applyVote(entity, userId, voteType) {
  const upVotesBy = entity.upVotesBy || [];
  const downVotesBy = entity.downVotesBy || [];

  switch (voteType) {
  case 'up':
    return {
      ...entity,
      upVotesBy: upVotesBy.includes(userId) ? upVotesBy : [...upVotesBy, userId],
      downVotesBy: downVotesBy.filter((id) => id !== userId),
    };
  case 'down':
    return {
      ...entity,
      upVotesBy: upVotesBy.filter((id) => id !== userId),
      downVotesBy: downVotesBy.includes(userId) ? downVotesBy : [...downVotesBy, userId],
    };
  case 'neutral':
    return {
      ...entity,
      upVotesBy: upVotesBy.filter((id) => id !== userId),
      downVotesBy: downVotesBy.filter((id) => id !== userId),
    };
  default:
    return entity;
  }
}

function threadDetailReducer(state = null, action = {}) {
  switch (action.type) {
  case RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;

  case OPTIMISTIC_TOGGLE_THREAD_VOTE:
    return applyVote(state, action.payload.userId, action.payload.voteType);

  case OPTIMISTIC_TOGGLE_COMMENT_VOTE:
    return {
      ...state,
      comments: state.comments.map((comment) =>
        comment.id === action.payload.commentId
          ? applyVote(comment, action.payload.userId, action.payload.voteType)
          : comment
      ),
    };

  case THREAD_DETAIL_VOTE_FAILED:
    return action.payload.prevState;

  default:
    return state;
  }
}

export default threadDetailReducer;