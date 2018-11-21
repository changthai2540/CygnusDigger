import { connect } from 'react-redux'
import CaptchaForm from '../components/captcha_form'
import { changeCaptcha, SUBMIT_IMAGE_REQUEST } from '../actions/index'

const mapStateToProps = state => ({
    captcha: state.api.captcha
})

const mapDispatchToProps = dispatch => ({
    onCaptchaChange: captcha => {
        dispatch(changeCaptcha(captcha))
    },
    onSubmit: () => {
        dispatch({ type: SUBMIT_IMAGE_REQUEST })
    }
})

const CaptchaForm_ = connect(mapStateToProps, mapDispatchToProps)(CaptchaForm)

export default CaptchaForm_
