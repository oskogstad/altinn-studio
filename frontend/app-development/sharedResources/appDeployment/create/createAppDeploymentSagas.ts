import type { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from 'app-shared/utils/networking';
import type { PayloadAction } from '@reduxjs/toolkit';
import { appDeploymentsUrl } from '../../../utils/urlHelper';
import type { ICreateAppDeployment } from '../types';
import { AppDeploymentActions } from '../appDeploymentSlice';

function* createAppDeploymentSaga(action: PayloadAction<ICreateAppDeployment>): SagaIterator {
  const { envName, tagName } = action.payload;
  try {
    const data = {
      tagName,
      envName,
    };

    const result = yield call(post, appDeploymentsUrl, data);

    yield put(
      AppDeploymentActions.createAppDeploymentFulfilled({
        envName,
        result,
      })
    );
  } catch (error) {
    yield put(
      AppDeploymentActions.createAppDeploymentRejected({
        envName,
        error,
      })
    );
  }
}

export function* watchCreateAppDeploymentSaga(): SagaIterator {
  yield takeLatest(AppDeploymentActions.createAppDeployment, createAppDeploymentSaga);
}
