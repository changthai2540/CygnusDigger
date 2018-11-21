export const ADD_IMAGE = 'ADD_IMAGE'

export const addImage = (checksum) => ({
    type: ADD_IMAGE,
    checksum,
})

export const LOCK_GAME_ID = 'LOCK_GAME_ID'

export const lockGameId = (flag) => ({
    type: LOCK_GAME_ID,
    flag
})

export const CHANGE_GAME_ID = 'CHANGE_GAME_ID'

export const changeGameId = (id) => ({
    type: CHANGE_GAME_ID,
    id
})

export const CHANGE_CAPTCHA = 'CHANGE_CAPTCHA'

export const changeCaptcha = (captcha, auto = false, captcha_id = 0) => ({
    type: CHANGE_CAPTCHA,
    captcha,
    auto,
    captcha_id
})

export const SUBMIT_IMAGE_REQUEST = 'SUBMIT_IMAGE_REQUEST'
export const SUBMIT_IMAGE_SUCCESS = 'SUBMIT_IMAGE_SUCCESS'
export const SUBMIT_IMAGE_FAILURE = 'SUBMIT_IMAGE_FAILURE'

export const FETCH_IMAGE_REQUEST = 'FETCH_IMAGE_REQUEST'
export const FETCH_IMAGE_SUCCESS = 'FETCH_IMAGE_SUCCESS'
export const FETCH_IMAGE_FAILURE = 'FETCH_IMAGE_FAILURE'
export const FETCH_IMAGE_LOOP = 'FETCH_IMAGE_LOOP'

export const fetchImageFailure = (error) => ({
    type: FETCH_IMAGE_FAILURE,
    error
})

export const SET_SERVER = 'SET_SERVER'

export const setServer = (slug, id) => ({
    type: SET_SERVER,
    slug,
    id
})

export const PUT_PROXY = 'PUT_PROXY'

export const putProxy = (ip, last_used = 0) => ({
    type: PUT_PROXY,
    ip,
    last_used
})

export const REMOVE_PROXY = 'REMOVE_PROXY'

export const removeProxy = (index) => ({
    type: REMOVE_PROXY,
    index
})
