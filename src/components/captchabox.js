import React from 'react'
import { Box } from './margin'

const PictureBox = (props) => (
    <Box style={{ paddingTop: '15px' }}>
        <img id="captchabox" src={props.src} style={{ minWidth: '75%', minHeight: '150px' }} alt={ props.src === null ? 'กำลังโหลด' : 'พิมพ์รหัส' } />
    </Box>
)

export default PictureBox
