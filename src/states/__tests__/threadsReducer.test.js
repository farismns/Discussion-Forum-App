/**
 * threadsReducer Test
 *
 * Skenario:
 * - should return initial state when action unknown
 * - should handle THREADS_OPTIMISTIC_VOTE with voteType 'up' correctly
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from '../threads/reducer';
import { THREADS_OPTIMISTIC_VOTE } from '../threads/action';

describe('threadsReducer', () => {
  it('should return initial state when action unknown', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle THREADS_OPTIMISTIC_VOTE with voteType up correctly', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: THREADS_OPTIMISTIC_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 'up',
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain('user-1');
    expect(nextState[0].downVotesBy).not.toContain('user-1');
  });
});
