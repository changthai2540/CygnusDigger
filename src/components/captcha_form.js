import React from 'react'
import { Box } from './margin'

export default class CaptchaForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.props.onCaptchaChange(e.target.value)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.onSubmit()
        this.props.onCaptchaChange('')
    }

    render() {
        return (
            <Box>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="captchaform">พิมพ์รหัสในภาพ</label>
                    <input
                        id="captchaform"
                        type="text"
                        placeholder="พิมพ์รหัสในภาพ"
                        value={this.props.captcha}
                        onChange={this.handleChange}
                    />
                    <input
                        type="submit"
                        value={ this.props.captcha === '' ? 'อ่านภาพออโต้' : 'ส่งรหัส' }
                        style={{ width: '100%' }}
                    />
                </form>
            </Box>
        )
    }
}