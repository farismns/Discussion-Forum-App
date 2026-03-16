const BASE_URL = 'https://forum-api.dicoding.dev/v1';

// ========================
// TOKEN HELPER
// ========================

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function removeAccessToken() {
  localStorage.removeItem('accessToken');
}

// ========================
// FETCH WITH TOKEN
// ========================

async function fetchWithToken(url, options = {}) {
  const token = getAccessToken();

  if (!token) {
    throw new Error('Access token not found');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data;
}

// ========================
// FETCH WITHOUT TOKEN
// ========================

async function fetchWithoutToken(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }

  return json.data;
}

// ========================
// USERS
// ========================

async function register({ name, email, password }) {
  const data = await fetchWithoutToken(`${BASE_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

  return data.user;
}

async function login({ email, password }) {
  const data = await fetchWithoutToken(`${BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  return data.token;
}

async function getAllUsers() {
  const data = await fetchWithoutToken(`${BASE_URL}/users`);
  return data.users;
}

async function getOwnProfile() {
  const data = await fetchWithToken(`${BASE_URL}/users/me`);
  return data.user;
}

// ========================
// THREADS
// ========================

async function getThreads() {
  const data = await fetchWithoutToken(`${BASE_URL}/threads`);
  return data.threads;
}

async function getThreadDetail(id) {
  const data = await fetchWithoutToken(`${BASE_URL}/threads/${id}`);
  return data.detailThread;
}

async function createThread({ title, body, category }) {
  const data = await fetchWithToken(`${BASE_URL}/threads`, {
    method: 'POST',
    body: JSON.stringify({ title, body, category }),
  });

  return data.thread;
}

// ========================
// COMMENTS
// ========================

async function createComment({ threadId, content }) {
  const data = await fetchWithToken(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });

  return data.comment;
}

// ========================
// THREAD VOTES
// ========================

async function upVoteThread(id) {
  return fetchWithToken(`${BASE_URL}/threads/${id}/up-vote`, {
    method: 'POST',
  });
}

async function downVoteThread(id) {
  return fetchWithToken(`${BASE_URL}/threads/${id}/down-vote`, {
    method: 'POST',
  });
}

async function neutralVoteThread(id) {
  return fetchWithToken(`${BASE_URL}/threads/${id}/neutral-vote`, {
    method: 'POST',
  });
}

// ========================
// COMMENT VOTES
// ========================

async function upVoteComment(threadId, commentId) {
  return fetchWithToken(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, { method: 'POST' });
}

async function downVoteComment(threadId, commentId) {
  return fetchWithToken(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, { method: 'POST' });
}

async function neutralVoteComment(threadId, commentId) {
  return fetchWithToken(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, { method: 'POST' });
}

// ========================
// LEADERBOARDS
// ========================

async function getLeaderboards() {
  const data = await fetchWithoutToken(`${BASE_URL}/leaderboards`);
  return data.leaderboards;
}

export {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  register,
  login,
  getAllUsers,
  getOwnProfile,
  getThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  getLeaderboards,
};
