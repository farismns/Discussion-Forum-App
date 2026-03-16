/**
 * asyncToggleUpVoteThread Thunk Test
 *
 * Skenario:
 * - should dispatch optimistic action and call API
 * - should dispatch rollback when API fails
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { asyncToggleUpVoteThread, THREADS_OPTIMISTIC_VOTE, THREADS_VOTE_FAILED } from '../threads/action';
import { upVoteThread } from '../../utils/api';

// Mock the API module
vi.mock('../../utils/api', () => ({
  upVoteThread: vi.fn(),
  getThreads: vi.fn(),
  getAllUsers: vi.fn(),
  createThread: vi.fn(),
  downVoteThread: vi.fn(),
  neutralVoteThread: vi.fn(),
}));

// Mock react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('asyncToggleUpVoteThread thunk', () => {
  const fakeThreads = [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      upVotesBy: [],
      downVotesBy: [],
    },
  ];

  const fakeAuthUser = { id: 'user-1', name: 'User Test' };

  let dispatch;
  let getState;

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi.fn(() => ({
      auth: { authUser: fakeAuthUser },
      threads: fakeThreads,
    }));
    vi.clearAllMocks();
  });

  it('should dispatch optimistic action and call API', async () => {
    upVoteThread.mockResolvedValueOnce({});

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    // Should dispatch the optimistic vote action
    expect(dispatch).toHaveBeenCalledWith({
      type: THREADS_OPTIMISTIC_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 'up',
      },
    });

    // Should call the API
    expect(upVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should dispatch rollback when API fails', async () => {
    upVoteThread.mockRejectedValueOnce(new Error('Network error'));

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    // Should dispatch optimistic action first
    expect(dispatch).toHaveBeenCalledWith({
      type: THREADS_OPTIMISTIC_VOTE,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 'up',
      },
    });

    // Should dispatch rollback with previous state
    expect(dispatch).toHaveBeenCalledWith({
      type: THREADS_VOTE_FAILED,
      payload: { prevState: fakeThreads },
    });
  });
});
