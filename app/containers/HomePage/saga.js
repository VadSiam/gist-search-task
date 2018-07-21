/**
 * Gets the repositories of the user from Github
 */

import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS, LOAD_FORKS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Gist repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/gists`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);

    const withForks = yield all(
      repos.map(item => call(request, item.forks_url)),
    );

    const constrRepos = repos.map((elem, idx) => {
      /* eslint-disable */
      elem.forks = withForks[idx];
      return elem;
    });


    yield put(reposLoaded(constrRepos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}


export function* getForks(payload) {
  console.log('work', payload);
}

export function* githubData() {
  yield takeLatest(LOAD_REPOS, getRepos);
}

export function* forkData() {
  yield takeLatest(LOAD_FORKS, getForks);
}
