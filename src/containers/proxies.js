import { connect } from 'react-redux'
import Proxies from '../components/proxies'
import { removeProxy, putProxy } from '../actions/index'

const mapStateToProps = state => ({
    proxies: state.proxies.map((proxy, index) => ({
        ip: proxy.ip,
        index
    })),
})

const mapDispatchToProps = dispatch => ({
    removeProxy: index => dispatch(removeProxy(index)),
    addProxy: ip => dispatch(putProxy(ip)),
})

const Proxies_ = connect(mapStateToProps, mapDispatchToProps)(Proxies)

export default Proxies_
