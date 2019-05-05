import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleEditP.scss';
import { DatePicker, Picker, List, TextareaItem, InputItem } from 'antd-mobile';
import UploadImgs from 'COMPONENTS/uploadImgs';
import axios from 'UTILS/axios';
import moment from 'moment';
import { getHerfInfo, showToast } from '../../utils/method';
class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceData: [],//原始数据
            //家长
            parents_province: [],//可供选择器使用数据
            parents_student: [],//选的数据 信息都在这里
            //老师
            teacher_province: [],//可供选择器使用数据
            // teacher_class: [],  //级联操作第一级
            teacher_student: [],//选的数据 信息都在这里 级联操作第二级

            show_time: new Date(Date.now()),
            title: '',
            desc: '',
            comment: '',
            show_days: ['7'],
            images: [],
            class_name: '',
            student_name: '',

        }
    }
    componentDidMount() {
        window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showTitle', ['发布']);
        //role_id 是角色信息 102是家长 show_id是获取详情用的
        const show_id = getHerfInfo('show_id');
        const role_id = getHerfInfo('role_id');
        //隐藏发布按钮
        if (role_id == 102) {
            this.getStudentInfoParents();
            show_id && this.getDefaultDataParenr(show_id);
        }
        if (role_id == 103) {
            this.getClassInfo();
            show_id && this.getDefaultDataTeacher(show_id);
        }
    }
    setOneKV(k, v) {
        this.setState({ [k]: v })
    }
    //老师获取列表信息
    getClassInfo() {
        axios('get', '/api/show/classes', {
        }).then((json) => {
            this.setState({
                teacher_province: json.data.map(item => ({
                    label: item.className,
                    value: item.classId,
                    children: []
                })),
                resourceData: json.data
            }, () => {
                //循环请求了
                // json.data.map(item => this.getStudentInfoTeacher(item.classId))
            })
        })
    }
    // getStudentInfoTeacher(class_id) {
    //     axios('get', '/api/show/classstudents', {
    //         class_id,
    //     }).then((json) => {
    //         this.setState({
    //             teacher_province: this.state.teacher_province.map(item => {
    //                 if (item.value == class_id) {
    //                     return {
    //                         ...item,
    //                         children: json.data.map(_item => ({
    //                             label: _item.userName,
    //                             value: _item.userId
    //                         }))
    //                     }
    //                 } else {
    //                     return { ...item }
    //                 }
    //             })
    //         })
    //     })
    // }
    getDefaultDataTeacher(show_id) {
        axios('get', '/api/show/read', {
            show_id
        }).then((json) => {
            // console.log(json);
            this.setState({
                teacher_student: [json.data.class_id],
                title: json.data.title,
                desc: json.data.desc,
                show_time: new Date(json.data.updatetime * 1000),
                comment: json.data.comment,
                show_days: [json.data.show_days + ''],
                class_name: json.data.class_name,
                student_name: json.data.student_name
            })
        })
    }
    //家长获取列表信息
    getStudentInfoParents() {
        axios('get', '/api/show/parentchildes', {
        }).then((json) => {
            // console.log(json.data)
            this.setState({
                resourceData: json.data,
                parents_province: json.data.map(item => ({
                    label: item.studentUserName,
                    // value: JSON.stringify({
                    //     classId: item.classId,
                    //     studentUserId: item.studentUserId,
                    //     teacherUserId: item.teacherUserId,
                    // })
                    value: item.studentUserId,
                }))
            })
        })
    }
    //获取默认数据
    getDefaultDataParenr(show_id) {
        axios('get', '/api/show/read', {
            show_id
        }).then((json) => {
            // console.log(json);
            this.setState({
                parents_student: [json.data.student_id],
                title: json.data.title,
                desc: json.data.desc,
                show_time: new Date(json.data.updatetime * 1000),
                class_name: json.data.class_name,
                student_name: json.data.student_name
            })
        })
    }
    //修改新增
    submitData() {
        // /api/show/parentaddshow
        const role_id = getHerfInfo('role_id');
        const show_id = getHerfInfo('show_id');
        const nodecheck = getHerfInfo('nodecheck');
        if (role_id == 102) {

            let { show_time, title, desc, parents_student, resourceData, images } = this.state;
            if (parents_student.length == 0) return;
            if (!title) return;
            if (!show_time) return;
            show_time = moment(show_time.valueOf()).format('YYYY-MM-DD');

            let submintData = {
                title,
                class_id: resourceData.find(item => item.studentUserId == parents_student[0]).classId,
                student_id: resourceData.find(item => item.studentUserId == parents_student[0]).studentUserId,
                teacher_id: resourceData.find(item => item.studentUserId == parents_student[0]).teacherUserId,
                desc,
                show_time,
                class_name: resourceData.find(item => item.studentUserId == parents_student[0]).className,
                student_name: resourceData.find(item => item.studentUserId == parents_student[0]).studentUserName,
                images,
            }
            if (show_id) {
                submintData.show_id = show_id;
            }
            axios('post', '/api/show/parentaddshow', submintData, 'form').then((json) => {
                // 处理提交成功
                if (json.code == 1) {
                    window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle?ticket=' + getHerfInfo('ticket');
                } else {
                    showToast(json.msg)
                }
            })
        }
        if (role_id == 103) {
            let { teacher_student, show_time, title, desc, comment, show_days, images, class_name, student_name, resourceData } = this.state;
            show_time = moment(show_time.valueOf()).format('YYYY-MM-DD');
            if (teacher_student.length == 0) return;
            if (!title) return;
            if (!show_time) return;
            if (!comment) return;
            let submintData = {
                title,
                desc,
                show_time,
                class_name,
                student_name,
                class_id: teacher_student[0],
                student_id: teacher_student[1],
                show_days: show_days[0],
                comment,
                images,
            }
            console.log(resourceData);
            if (show_id) {
                submintData.show_id = show_id;
            } else {
                submintData.class_name = resourceData.find(item => item.classId == teacher_student[0]).className
            }
            axios('post', '/api/show/teacheraddshow', submintData, 'form').then((json) => {
                // 处理提交成功
                // console.log(json);
                if (json.code == 1) {
                    if (nodecheck) this.check(1);
                    window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle?ticket=' + getHerfInfo('ticket');
                } else {
                    showToast(json.msg)
                }
            })
        }
    }
    //审核: 1同意 2驳回
    check(n) {
        axios('post', '/api/show/audit', {
            show_id: getHerfInfo('show_id'),
            audit_status: n
        }, 'form').then((json) => {
            // console.log(json);
            if (json.code == 1) {
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle?ticket=' + getHerfInfo('ticket');
            } else {
                showToast(json.msg)
            }
        })
    }
    //检测能否提交
    checkSubmit() {
        const role_id = getHerfInfo('role_id');
        let { show_time, title, parents_student, teacher_student, comment } = this.state;
        if (role_id == 102) {
            if (parents_student.length == 0) return false;
            if (!title) return false;
            if (!show_time) return false;
        }
        if (role_id == 103) {
            if (teacher_student.length == 0) return false;
            if (!title) return false;
            if (!show_time) return false;
            if (!comment) return false;
        }
        return true;
    }
    render() {
        let { show_time, title, desc, comment, show_days, parents_province, teacher_province, class_name } = this.state;
        const role_id = getHerfInfo('role_id');
        // console.log(getHerfInfo('role_id'))
        // console.log(comment)
        return <Fragment>

            <div className={styles['box']}>
                <div className={styles['top']}>
                    {/* 家长 */}
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
                    {/* 老师 */}
                    {
                        (role_id == 103 && !getHerfInfo('show_id')) && <div className={styles['row']}>
                            <Picker
                                data={teacher_province}
                                value={this.state.teacher_student}
                                onChange={(v) => { this.setOneKV('teacher_student', v) }}
                                // onPickerChange={(v) => { console.log(v) }}
                                cols={1}
                            >
                                <List.Item arrow="horizontal">选择班级</List.Item>
                            </Picker>
                        </div>
                    }
                    {
                        (role_id == 103 && getHerfInfo('show_id')) && <div className={styles['row']}>
                            <InputItem
                                placeholder="请输入标题名称"
                                ref={el => this.inputRef = el}
                                value={class_name}
                                maxLength={30}
                                onChange={(v) => { this.setOneKV('title', v) }}
                                disabled
                            >班级</InputItem>
                        </div>
                    }

                    <div className={styles['row']}>
                        <DatePicker
                            value={show_time}
                            onChange={(date) => { this.setOneKV('show_time', new Date(date.valueOf())) }}
                            okText={<div style={{ color: '#4ea375' }}>确定</div>}
                            dismissText={<div style={{ color: '#4ea375' }}>取消</div>}
                        >
                            <List.Item arrow="horizontal">发生时间</List.Item>
                        </DatePicker>
                    </div>
                    <div className={styles['row']}>
                        <InputItem
                            placeholder="请输入标题名称"
                            ref={el => this.inputRef = el}
                            extra={<div>{(title || '').length > 30 ? 30 : (title || '').length}/30</div>}
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
                {
                    role_id == 103 && <div className={styles['teachersWrap']}>
                        <div className={styles['row']}>
                            <InputItem
                                placeholder="请输入标题名称"
                                ref={el => this.inputRef = el}
                                extra={<div>{(comment || '').length > 30 ? 30 : (comment || '').length}/30</div>}
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
                                    }, {
                                        label: '3天',
                                        value: '3',
                                    }, {
                                        label: '7天',
                                        value: '7',
                                    }, {
                                        label: '15天',
                                        value: '15',
                                    }, {
                                        label: '30天',
                                        value: '30',
                                    }
                                ]}
                                cols={1}
                                value={show_days}
                                onChange={(v) => { this.setOneKV('show_days', v) }}
                            >
                                <List.Item arrow="horizontal">展示天数</List.Item>
                            </Picker>
                        </div>
                    </div>
                }
                <UploadImgs onChange={(images) => { this.setOneKV('images', images) }} />
                <div
                    className={styles['btn']}
                    style={{ backgroundColor: `${this.checkSubmit() ? '#48bb7d' : '#dbdbdb'}` }}
                    onClick={() => {
                        this.submitData();
                    }}>
                    确定
                </div>
            </div>
        </Fragment >
    }
}

export default StudentsStyleP;