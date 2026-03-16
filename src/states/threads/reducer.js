import {
  RECEIVE_THREADS,
  ADD_THREAD,
  THREADS_OPTIMISTIC_VOTE,
  THREADS_VOTE_FAILED,
} from './action';

function applyVote(thread, userId, voteType) {
  const upVotesBy = thread.upVotesBy || [];
  const downVotesBy = thread.downVotesBy || [];

  switch (voteType) {
  case 'up':
    return {
      ...thread,
      upVotesBy: upVotesBy.includes(userId) ? upVotesBy : [...upVotesBy, userId],
      downVotesBy: downVotesBy.filter((id) => id !== userId),
    };
  case 'down':
    return {
      ...thread,
      upVotesBy: upVotesBy.filter((id) => id !== userId),
      downVotesBy: downVotesBy.includes(userId) ? downVotesBy : [...downVotesBy, userId],
    };
  case 'neutral':
    return {
      ...thread,
      upVotesBy: upVotesBy.filter((id) => id !== userId),
      downVotesBy: downVotesBy.filter((id) => id !== userId),
    };
  default:
    return thread;
  }
}

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case RECEIVE_THREADS:
    return action.payload.threads;

  case ADD_THREAD:
    return [action.payload.thread, ...threads];

  case THREADS_OPTIMISTIC_VOTE:
    return threads.map((thread) =>
      thread.id === action.payload.threadId
        ? applyVote(thread, action.payload.userId, action.payload.voteType)
        : thread
    );

  case THREADS_VOTE_FAILED:
    return action.payload.prevState;

  default:
    return threads;
  }
}

export default threadsReducer;