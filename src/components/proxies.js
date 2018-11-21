import React from 'react'
import styled from 'styled-components'

const ListButton = styled.button`
margin-left: 5px;
display: inline;
`

class Proxy extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.handleClick(this.props.index)
    }

    render() {
        return (
            <div>
                <span><p style={{ display: 'inline' }}>{ this.props.ip }</p> &nbsp; <ListButton onClick={ this.handleClick }>-</ListButton></span>
            </div>
        )
    }
}

class AddProxy extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.state = { text: '' }
    }

    handleChange(e) {
        this.setState({ text: e.target.value })
    }

    handleClick(e) {
        this.props.action(this.state.text)
    }

    render() {
        return (
            <span><input style={{ maxWidth: '50%' }} type="text" value={this.state.text} onChange={this.handleChange} /><ListButton onClick={this.handleClick}>+</ListButton></span>
        )
    }
}

export default class Proxies extends React.Component {
    render() {
        return (
            <ul style={{ listStyleType: 'none' }}>
                {
                    (this.props.proxies.map(proxy => (
                        <li>
                            <Proxy ip={proxy.ip} index={proxy.index} handleClick={this.props.removeProxy} />
                        </li>
                    )))
                }
                <li>
                    <AddProxy action={this.props.addProxy} />
                </li>
            </ul>
        )
    }
}
