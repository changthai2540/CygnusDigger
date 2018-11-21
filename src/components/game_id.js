import React from 'react'
import { Box } from './margin'

class GameId extends React.Component {
    constructor(props) {
        super(props)
        this.handleIdChange = this.handleIdChange.bind(this)
        this.handleLock = this.handleLock.bind(this)
    }

    handleIdChange(e) {
        this.props.onGameIdChange(e.target.value)
    }

    handleLock(e) {
        this.props.onLockGameId(!this.props.lock_game_id)
    }

    render() {
        return (
            <Box>
                <input
                    type="checkbox"
                    value={this.props.lock_game_id}
                    onClick={this.handleLock}
                />
                Lock ID
                <input
                    type="text"
                    value={this.props.game_id}
                    onChange={this.handleIdChange}
                    placeholder="ไอดีเกม"
                    readOnly={this.props.lock_game_id}
                />
            </Box>
        )
    }
}

export default GameId
