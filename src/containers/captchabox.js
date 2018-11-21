import { connect } from 'react-redux'
import CaptchaBox from '../components/captchabox'

const mapStateToProps = state => ({
    src: state.images.length > 0 ? 'http://playserver.co/index.php/VoteGetImage/' + state.images[0] : null
})

const mapDispatchToProps = dispatch => ({

})

const CaptchaBox_ = connect(mapStateToProps, mapDispatchToProps)(CaptchaBox)

export default CaptchaBox_
