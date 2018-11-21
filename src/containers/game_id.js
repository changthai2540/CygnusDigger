import { connect } from 'react-redux'
import { lockGameId, changeGameId } from '../actions/index'
import GameId from '../components/game_id'

const mapStateToProps = state => ({
    game_id: state.config.game_id,
    lock_game_id: state.config.lock_game_id
})

const mapDispatchToProps = dispatch => ({
    onLockGameId: flag => {
        dispatch(lockGameId(flag))
    },
    onGameIdChange: id => {
        dispatch(changeGameId(id))
    }
})

const gameId = connect(mapStateToProps, mapDispatchToProps)(GameId)

export default gameId
