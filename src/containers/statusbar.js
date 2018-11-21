import { connect } from 'react-redux'
import StatusBar from '../components/statusbar'

const mapStateToProps = ({ status, images }) => ({
    ...status,
    wait_for_input: images.length
})

const mapDispatchToProps = dispatch => ({

})

const StatusBar_ = connect(mapStateToProps, mapDispatchToProps)(StatusBar)

export default StatusBar_
