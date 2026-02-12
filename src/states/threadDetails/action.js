export const SET_THREADS = 'SET_THREADS';
export const SET_LOADING = 'SET_LOADING';

export function setThreads(threads) {
  return {
    type: SET_THREADS,
    payload: threads,
  };
}

export function setLoading(value) {
  return {
    type: SET_LOADING,
    payload: value,
  };
}
