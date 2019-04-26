import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleEditP.scss';
import { DatePicker, Picker, List, TextareaItem, InputItem } from 'antd-mobile';
import UploadImgs from 'COMPONENTS/uploadImgs'

class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_time: new Date(Date.now()),
            title: '',
            desc: '',
            comment: '',
            show_days: '',
        }
    }

    componentDidMount() {
    }
    setOneKV(k, v) {
        this.setState({ [k]: v })
    }
    render() {
        let { show_time, title, desc, comment, show_days } = this.state;
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
                <div className={styles['textAreaWrap']}>
                    <TextareaItem
                        placeholder="请输入描述(选填)"
                        autoHeight
                        ref={el => this.customFocusInst = el}
                        rows={6}
                        count={200}
                        value={desc}
                        onChange={(v) => { this.setOneKV('desc', v) }}
                    />
                </div>
                <div className={styles['teachersWrap']}>
                    <div className={styles['row']}>
                        <InputItem
                            placeholder="请输入标题名称"
                            ref={el => this.inputRef = el}
                            extra={<div>{comment.length > 30 ? 30 : comment.length}/30</div>}
                            value={comment}
                            maxLength={30}
                            onChange={(v) => { this.setOneKV('comment', v) }}
                        >教师点评</InputItem>
                    </div>
                    <div className={styles['row']}>
                        <Picker
                            data={[
                                {
                                    label: '1天',
                                    value: '1',
                                },
                                {
                                    label: '2天',
                                    value: '2',
                                },
                                {
                                    label: '3天',
                                    value: '3',
                                },
                                {
                                    label: '4天',
                                    value: '4',
                                },
                            ]}
                            cols={1}
                            value={show_days}
                            onChange={(v) => { this.setOneKV('show_days', v) }}
                        >
                            <List.Item arrow="horizontal">展示天数</List.Item>
                        </Picker>
                    </div>
                </div>
                <UploadImgs />
                <div className={styles['btn']}>
                    确定
                </div>
            </div>
        </Fragment >
    }
}

export default StudentsStyleP;