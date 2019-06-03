import React, { Component } from 'react';
import SelectsBlock from './SelectsBlock.jsx';
import styles from './AttendanceManageP.scss';

class AttendanceManageP extends Component {
    state = {
        data: [],
    }

    

    render() {
        const {data} = this.state;

        return (
            <div className={styles.container}>
                <SelectsBlock></SelectsBlock>
                {data}
            </div>
        );
    }
}

export default AttendanceManageP;