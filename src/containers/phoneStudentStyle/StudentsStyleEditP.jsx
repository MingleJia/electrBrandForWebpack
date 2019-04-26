import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleEditP.scss';
import { DatePicker, Picker, List, TextareaItem, InputItem } from 'antd-mobile';
import UploadImgs from 'COMPONENTS/uploadImgs'
class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_time: new Date(Date.now()),
            title: ''
        }
    }

    componentDidMount() {
    }
    setOneKV(k, v) {
        this.setState({ [k]: v })
    }
    render() {
        let { show_time, title } = this.state;
        // console.log(show_time)
        return <Fragment>
            <div className={styles['box']}>
                <div className={styles['top']}>
                    <div className={styles['row']}>
                        <Picker data={[
                            {
                                label: '春',
                                value: '春',
                            },
                            {
                                label: '夏',
                                value: '夏',
                            },
                        ]} cols={1} className="forss">
                            <List.Item arrow="horizontal">学生姓名</List.Item>
                        </Picker>
                    </div>
                    <div className={styles['row']}>
                        <DatePicker
                            value={show_time}
                            onChange={(date) => { this.setOneKV('show_time', new Date(date.valueOf())) }}
                        >
                            <List.Item arrow="horizontal">发生时间</List.Item>
                        </DatePicker>
                    </div>
                    <div className={styles['row']}>
                        <InputItem
                            placeholder="请输入标题名称"
                            ref={el => this.inputRef = el}
                            extra={<div>{title.length > 30 ? 30 : title.length}/30</div>}
                            value={title}
                            maxLength={30}
                            onChange={(v) => { this.setOneKV('title', v) }}
                        >标题</InputItem>
                    </div>
                </div>
                <UploadImgs />
            </div>
        </Fragment >
    }
}

export default StudentsStyleP;