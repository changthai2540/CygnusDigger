import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { diggerReducer } from './reducers/index'
import { watcherSaga } from './sagas'
import { FETCH_IMAGE_LOOP, FETCH_IMAGE_REQUEST, setServer } from './actions/index'

const sagaMiddleware = createSagaMiddleware()

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = createStore(
    diggerReducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
)

sagaMiddleware.run(watcherSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

let dig_url = prompt('ใส่ URL หน้าขุด PlayServer')
if(dig_url !== null) {
    let slug = dig_url.split('/')
    if(dig_url.endsWith('/')) {
        slug = slug[slug.length - 2]
    } else {
        slug = slug[slug.length - 1]
    }
    let id = slug.split('-')
    id = id[id.length - 1]

    document.title = 'CygnusDigger: Digging for ' + slug
    store.dispatch(setServer(slug, id))
    store.dispatch({ type: FETCH_IMAGE_REQUEST })
    // store.dispatch({ type: FETCH_IMAGE_LOOP })
    // store.dispatch({ type: 'DIG_LOOP' })
}