import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleEditP.scss';
import { DatePicker, Picker, List, TextareaItem, InputItem } from 'antd-mobile';
import UploadImgs from 'COMPONENTS/uploadImgs';
import axios from 'UTILS/axios';
import moment from 'moment';
class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //家长
            parents_province: [],//所有数据
            parents_student: null,//选的数据 信息都在这里
            //老师

            show_time: new Date(Date.now()),
            title: '',
            desc: '',
            comment: '',
            show_days: '',
        }
    }
    //获取地址栏信息
    getHerfInfo(str) {
        if (window.location.href.split('?').length == 2) {
            return (window.location.href.split('?')[1].split('&').find(item => item.indexOf(str) != -1) || '=').split('=')[1];
        } else {
            return '';
        }
    }
    componentDidMount() {
        this.getStudentInfo();
    }
    setOneKV(k, v) {
        this.setState({ [k]: v })
    }
    getStudentInfo() {

        axios('get', '/api/show/parentchildes', {
        }).then((json) => {
            // console.log(json.data)
            this.setState({
                parents_province: json.data.map(item => ({
                    label: item.studentUserName,
                    value: JSON.stringify({
                        classId: item.classId,
                        studentUserId: item.studentUserId,
                        teacherUserId: item.teacherUserId,
                    })
                }))
            })
        })
    }
    submitData() {
        // /api/show/parentaddshow
        const role_id = this.getHerfInfo('role_id');
        if (role_id == 102) {

            let { show_time, title, desc, parents_student } = this.state;
            if (!parents_student) return;
            if (!title) return;
            if(!show_time) return;
            parents_student = JSON.parse(parents_student[0]);
            show_time = moment(show_time.valueOf()).format('YYYY-MM-DD');
            // console.log();
            // return;
            axios('post', '/api/show/parentaddshow', {
                title,
                class_id: parents_student.classId,
                student_id: parents_student.studentUserId,
                teacher_id: parents_student.teacherUserId,
                desc,
                show_time,
            }, 'form').then((json) => {
                // 处理提交成功
                // console.log(json);
            })
        }
    }

    render() {
        let { show_time, title, desc, comment, show_days, parents_province } = this.state;
        const role_id = this.getHerfInfo('role_id');
        // console.log(this.getHerfInfo('role_id'))
        // province = [

        //     {
        //         label: '春',
        //         value: '春',
        //     },
        //     {
        //         label: '夏',
        //         value: '夏',
        //     },
        // ]
        // province = [
        //     {
        //         label: '北京',
        //         value: '01',
        //         children: [
        //           {
        //             label: '东城区',
        //             value: '01-1',
        //           },
        //           {
        //             label: '西城区',
        //             value: '01-2',
        //           },
        //           {
        //             label: '崇文区',
        //             value: '01-3',
        //           },
        //           {
        //             label: '宣武区',
        //             value: '01-4',
        //           },
        //         ],
        //       },
        // ];

        return <Fragment>
            
            <div className={styles['box']}>
                <div className={styles['top']}>
                    {
                        role_id == 102 && <div className={styles['row']}>
                            <Picker
                                data={parents_province}
                                value={this.state.parents_student}
                                onChange={(v) => { this.setOneKV('parents_student', v) }}
                                cols={1}
                            >
                                <List.Item arrow="horizontal">学生姓名</List.Item>
                            </Picker>
                        </div>
                    }
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
                <div className={styles['btn']} onClick={() => { this.submitData() }}>
                    确定
                </div>
            </div>
        </Fragment >
    }
}

export default StudentsStyleP;