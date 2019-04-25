import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleEditP.scss';
import { DatePicker, Picker, List, TextareaItem, InputItem } from 'antd-mobile';
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
        console.log(show_time)
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
                        {/* <div className={styles['title']}>
                            标题
                        </div> */}
                        <div className={styles['textareaWrap']}>
                            {/* <TextareaItem
                                placeholder={'请输入标题'}
                                rows={1}
                                count={30}
                                value={title}
                                onChange={(v) => { this.setOneKV('title', v) }}
                            /> */}
                            <InputItem
                                clear
                                placeholder="click the button below to focus"
                                ref={el => this.inputRef = el}
                            >标题</InputItem>
                            <div className={styles['count']}>{title.length > 30 ? 30 : title.length}/30</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    }
}

export default StudentsStyleP;