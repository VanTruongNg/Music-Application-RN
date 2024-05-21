import { call, put, take, takeLatest } from 'redux-saga/effects';
import { playerActions, searchActions } from '../action-slices';
import { createAction } from '@reduxjs/toolkit';
import { ChangeTrackProps, PlayerProps } from 'src/common/player/type';
import { selector } from 'src/common/redux';
import TrackPlayer from 'react-native-track-player';
import { fetchAudioSagaAction } from './FetchAudioSaga';
import { TrackDataFields } from 'src/models/Track';
import { getRecommend } from './api';

export function* setCurrentTrackWorker(
  action: ReturnType<typeof playerControlActionSaga.setCurrentTrack>,
): Generator<any> {
  const { from, info } = action.payload.PlayerProps;
  const trackInfo = { ...info, playFrom: from };

  yield put(playerActions.onSetCurrentTrack(trackInfo));
  if (from === 'search') {
    yield put(playerActions.onResetQueue(trackInfo));
    yield put(searchActions.addSearchRecentList(trackInfo));
  } else if (from !== 'queue') {
    yield put(playerActions.onResetQueue(trackInfo));
  }
}

export function* onChangeCurrentTrackWorker(
  action: ReturnType<typeof playerControlActionSaga.onChangeCurrentTrack>,
): Generator<any> {
  const { option, callback } = action.payload?.ChangeTrackProps;
  const currentTrack: any = yield selector(state => state.player.currentTrack);

  const res: any = yield TrackPlayer.getPlaybackState();
  if (res.state === 'loading' || res.state === 'buffering') {
    return;
  }

  const result = yield handleChangeCurrentTrackInQueue({
    currentTrack,
    option: option,
  });
  const { newTrack, newTrackQueue } = result as any;

  if (Object.keys(newTrack).length !== 0) {
    yield call(TrackPlayer.pause);
    yield put(playerActions.onResetQueue(newTrackQueue));
    yield put(playerActions.onSetCurrentTrack(newTrack));

    if (option === 'next') {
      yield put(
        fetchAudioSagaAction.fetch({
          callback: TrackInfo => {
            callback(TrackInfo);
          },
        }),
      );
    } else {
      yield TrackPlayer.skipToPrevious();
      yield TrackPlayer.setPlayWhenReady(true);
    }
  } else {
  }
}

function* handleChangeCurrentTrackInQueue({
  currentTrack,
  option,
  loadmoreRecommend = false,
}: {
  currentTrack: TrackDataFields;
  option: 'next' | 'previous';
  loadmoreRecommend?: boolean;
}): Generator<any, any, any> {
  const trackQueue: any = yield selector(state => state.player.trackQueue);
  let newTrack = {};
  let newTrackQueue = trackQueue;

  if (newTrackQueue.length === 1 || loadmoreRecommend) {
    const response = yield call(getRecommend, {
      artists: currentTrack?.artists[0]?.id ?? '',
      tracks: currentTrack?.id ?? '',
    });
    const updatedTracks = response.tracks.map((track: any) => ({
      ...track,
      playFrom: 'recommend',
    }));
    newTrackQueue = [currentTrack, ...updatedTracks];
  }

  const trackIdToFind = currentTrack.id;
  const trackIndex = newTrackQueue.findIndex(
    (track: any) => track.id === trackIdToFind,
  );

  if (trackIndex !== -1) {
    if (option === 'next' && trackIndex < newTrackQueue.length - 1) {
      newTrack = newTrackQueue[trackIndex + 1];
    } else if (
      // nếu là bài hát cuối trong playlist
      option === 'next' &&
      trackIndex === newTrackQueue.length - 1
    ) {
      //load tiếp recommend
      if (currentTrack.playFrom === 'recommend') {
        return yield handleChangeCurrentTrackInQueue({
          currentTrack: newTrackQueue[0],
          option: 'next',
          loadmoreRecommend: true,
        });
      }
      // bấm next sẽ reset playlist
      newTrack = newTrackQueue[0];
    } else if (option === 'previous' && trackIndex > 0) {
      newTrack = newTrackQueue[trackIndex - 1];
    }
  }
  return { newTrack, newTrackQueue };
}

const setCurrentTrack = createAction<{ PlayerProps: PlayerProps }>(
  'player/setCurrentTrack',
);

const onChangeCurrentTrack = createAction<{
  ChangeTrackProps: ChangeTrackProps;
}>('player/onChangeCurrentTrackSaga');

export const playerControlActionSaga = {
  setCurrentTrack,
  onChangeCurrentTrack,
};

export function* playerSaga() {
  yield takeLatest(setCurrentTrack.type, setCurrentTrackWorker);
  yield takeLatest(onChangeCurrentTrack.type, onChangeCurrentTrackWorker);
}
