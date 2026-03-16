/**
 * threadDetailReducer Test
 *
 * Skenario:
 * - should handle RECEIVE_THREAD_DETAIL
 * - should handle OPTIMISTIC_TOGGLE_COMMENT_VOTE with voteType 'up'
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from '../threadDetails/reducer';
import {
  RECEIVE_THREAD_DETAIL,
  OPTIMISTIC_TOGGLE_COMMENT_VOTE,
} from '../threadDetails/action';

describe('threadDetailReducer', () => {
  it('should handle receive thread detail', () => {
    const threadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Body thread',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: RECEIVE_THREAD_DETAIL,
      payload: { threadDetail },
    };

    const nextState = threadDetailReducer(null, action);

    expect(nextState).toEqual(threadDetail);
  });

  it('should toggle comment vote correctly', () => {
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Komentar pertama',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: OPTIMISTIC_TOGGLE_COMMENT_VOTE,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
        voteType: 'up',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    const updatedComment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(updatedComment.upVotesBy).toContain('user-1');
    expect(updatedComment.downVotesBy).not.toContain('user-1');
  });
});
