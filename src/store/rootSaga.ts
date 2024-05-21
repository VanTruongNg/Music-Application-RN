import { all, fork } from "redux-saga/effects"
import { fetchSaga, playerSaga } from "./action-saga"

function* rootSaga() {
    yield all([fork(fetchSaga), fork(playerSaga) ])
}

export default rootSaga