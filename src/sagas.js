import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects'
import {
    addImage,
    FETCH_IMAGE_REQUEST,
    fetchImageFailure,
    SUBMIT_IMAGE_REQUEST,
    SUBMIT_IMAGE_SUCCESS,
    SUBMIT_IMAGE_FAILURE,
    FETCH_IMAGE_LOOP,
    changeCaptcha
} from './actions/index'
// import Buffer from 'buffer'
const Buffer = require('buffer/').Buffer
import axios from 'axios'
import qs from 'qs'

const axi = axios.create({
    baseURL: 'http://playserver.co/index.php/Vote/',
    timeout: 20000,
})

const getConfig = (state) => state.config

function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve(true), ms))
} 

export function* watcherSaga() {
    yield takeEvery(FETCH_IMAGE_REQUEST, fetchImageSaga)
    yield takeEvery(SUBMIT_IMAGE_REQUEST, submitImageSaga)
    yield takeLatest(FETCH_IMAGE_LOOP, fetchImageLoop)
    yield takeLatest('DIG_LOOP', digLoop)
}

function fetchImage(server_slug) {
    return axi.post('ajax_getpic/' + server_slug)
}

function* fetchImageSaga() {
    let config = yield select(getConfig)
    try {
        const response = yield call(fetchImage, config.slug)
        if(!response.data.success) {
            yield put(fetchImageFailure('Failed to fetch for some reason'))
        } else {
            yield put(addImage(response.data.checksum))
        }
    } catch(error) {
        yield put(fetchImageFailure(error))
    }
}

function* fetchImageLoop() {
    while(true) {
        yield delay(5000)
        yield put({ type: FETCH_IMAGE_REQUEST })
    }
}

const waitTime = state => state.wait

function* digLoop() {
    yield delay(10000)
    while(true) {
        let wait = yield select(waitTime)
        let diff = wait - Math.floor(Date.now() / 1000)
        if(wait === 0)
            diff = 10
        if(diff <= 0)
            diff = 0
        yield delay(diff * 1000)
        yield put({ type: SUBMIT_IMAGE_REQUEST })
    }
}

const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader
    reader.onerror = reject
    reader.onload = () => {
        resolve(reader.result)
    }
    reader.readAsDataURL(blob)
})

function toDataURL(url) {
    let img = document.getElementById('captchabox')
    return fetch(img.src, {
        mode: 'cors'
    }).then(res => res.blob())
        .then(convertBlobToBase64)
}

function submitImage(server_slug, server_id, captcha, gameid, checksum, proxy_ip = null) {
    let proxy = null
    if(proxy_ip !== null)
        proxy = proxy_ip.split(':')
    let config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
    }
    if(proxy != null) {
        config = {
            ...config,
            proxy: {
                host: proxy[0],
                port: parseInt(proxy[1])
            }
        }
    }
    return axi.post('ajax_submitpic/' + server_slug, qs.stringify({
        server_id,
        captcha,
        gameid,
        checksum
    }), config)
}

function sendCaptchaForSolve(dataUrl) {
    return axi.post('http://api.dbcapi.me/api/captcha', qs.stringify({
        username: 'secretdz',
        password: 'asdfasdf',
        captchafile: dataUrl.replace(/data:(?:.+);base64,/, 'base64:')
    }), { 'content-type': 'multipart/form-data' })
}

function getCaptchaStatus(captcha) {
    return axi.get('http://api.dbcapi.me/api/captcha/' + captcha)
}

function reportCaptcha(captcha) {
    return axi.post('http://api.dbcapi.me/api/captcha/' + captcha + '/report', qs.stringify({
        username: 'secretdz',
        password: 'asdfasdf'
    }), { 'content-type': 'multipart/form-data' })
}

const getDataForSend = (state) => ({
    checksum: state.images.length > 0 ? state.images[0] : null,
    captcha: state.api.captcha,
    captcha_id: state.api.captcha_id
})

function* submitImageSaga() {
    let config = yield select(getConfig)
    let data = yield select(getDataForSend)

    if(data.checksum !== '' && data.captcha === '') {
        let base64 = yield call(toDataURL)
        let response = yield call(sendCaptchaForSolve, base64)
        if(typeof(response.data.captcha) != 'undefined' && response.data.status !== 255) {
            let answer = ''
            let captcha = response.data.captcha
            while(true) {
                yield delay(10000)
                let response = yield call(getCaptchaStatus, captcha)
                let { text, is_correct } = response.data
                if(is_correct && text != '' && text != '?') {
                    answer = text
                    break
                }
            }
            yield put(changeCaptcha(answer, true, captcha))
            yield put({ type: SUBMIT_IMAGE_REQUEST })
            yield delay(response.data.wait * 1000)
            yield put({ type: SUBMIT_IMAGE_REQUEST })
        }
    } else if((data.checksum !== ''  && data.captcha !== '')) {
        try {
            const response = yield call(submitImage, config.slug, config.server_id, data.captcha, config.game_id, data.checksum)
            if (response.data.success) {
                yield put({ type : SUBMIT_IMAGE_SUCCESS })
            } else {
                if(!response.data.error_msg.startsWith('ไม่สามารถโหวตได้ เนื่องจาก IP ของคุณ') && !response.data.error_msg.startsWith('ภาพ'))
                    yield call(reportCaptcha, data.captcha_id)
                yield put({ type: SUBMIT_IMAGE_FAILURE })
            }
        } catch (error) {
            yield put({ type: SUBMIT_IMAGE_FAILURE })
            yield call(console.log, error)
        }
        yield put(changeCaptcha(''))
    } else {
        yield put({ type: SUBMIT_IMAGE_FAILURE })
    }
    yield put({ type: FETCH_IMAGE_REQUEST })
}
