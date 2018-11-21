import React from 'react'
import styled from 'styled-components'

const Center = styled.div`
margin-left: auto;
margin-right: auto;
width: 30%;
`

export default class StatusBar extends React.Component {
    render() {
        return (
            <Center>
                <table>
                    <thead>
                        <tr>
                            <th>สำเร็จ</th>
                            <th>รอส่ง</th>
                            <th>ล้มเหลว</th>
                            <th>รอพิมพ์</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.success}</td>
                            <td>{this.props.wait_for_submit}</td>
                            <td>{this.props.failed}</td>
                            <td>{this.props.wait_for_input}</td>
                        </tr>
                    </tbody>
                </table>
            </Center>
        )
    }
}
