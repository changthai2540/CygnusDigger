import { 
    ADD_IMAGE,
    LOCK_GAME_ID,
    CHANGE_GAME_ID,
    CHANGE_CAPTCHA,
    SET_SERVER,
    SUBMIT_IMAGE_SUCCESS,
    SUBMIT_IMAGE_FAILURE,
    PUT_PROXY,
    REMOVE_PROXY
} from '../actions/index'

const initialState = {
    wait: 0,
    images: [],
    status: {
        success: 0,
        wait_for_submit: 0,
        failed: 0,
    },
    config: {
        slug: null,
        server_id: null,
        game_id: '',
        lock_game_id: false,
    },
    api: {
        captcha: '',
        auto: false,
        captcha_id: 0
    },
    proxies: []
}

export function diggerReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_IMAGE:
            return {
                ...state,
                images: [
                    ...state.images,
                    action.checksum
                ]
            }
        case LOCK_GAME_ID:
            return {
                ...state,
                config: {
                    ...state.config,
                    lock_game_id: action.flag
                }
            }
        case CHANGE_GAME_ID:
            return {
                ...state,
                config: {
                    ...state.config,
                    game_id: action.id
                }
            }
        case CHANGE_CAPTCHA:
            return {
                ...state,
                api: {
                    ...state.api,
                    captcha: action.captcha.toUpperCase(),
                    auto: action.auto,
                    captcha_id: action.captcha_id
                }
            }
        case SET_SERVER:
            return {
                ...state,
                config: {
                    ...state.config,
                    slug: action.slug,
                    server_id: action.id
                }
            }
        case SUBMIT_IMAGE_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    failed: state.status.failed + 1
                },
                images: state.images.slice(1)
            }
        case SUBMIT_IMAGE_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    success: state.status.success + 1
                },
                images: state.images.slice(1),
                wait: Math.floor(Date.now() / 1000) + 61
            }
        case PUT_PROXY:
            return {
                ...state,
                proxies: state.proxies.filter(proxy => proxy.ip === action.ip).length > 0 ?
                    state.proxies.map(proxy => proxy.ip === action.ip ? { ...proxy, last_used: action.last_used } : proxy)
                    :
                    [
                        ...state.proxies,
                        { ip: action.ip, last_used: action.last_used }
                    ]
            }
        case REMOVE_PROXY:
            return {
                ...state,
                proxies: [
                    ...state.proxies.slice(0, action.index),
                    ...state.proxies.slice(action.index + 1)
                ]
            }
        default:
            return state
    }
}
