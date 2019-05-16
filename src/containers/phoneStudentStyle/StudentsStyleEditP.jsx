import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleEditP.scss';
import { DatePicker, Picker, List, TextareaItem, InputItem } from 'antd-mobile';
import UploadImgs from 'COMPONENTS/uploadImgs';
import axios from 'UTILS/axios';
import moment from 'moment';
import { getHerfInfo, showToast, isOnLine } from '../../utils/method';
import { Modal } from 'antd-mobile';
const alert = Modal.alert;
var height = document.body.clientHeight;
class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceData: [],//原始数据
            // 1家长
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
            show_days: ['3'],
            images: [],
            class_name: '',
            student_name: '',
            isChange: 0,
            canSubmit: true,
        }
    }
    getTitle(){
        // const role_id = getHerfInfo('role_id');
        const nodecheck = getHerfInfo('nodecheck');
        const show_id = getHerfInfo('show_id');
        if(nodecheck == 1 ){
            return '审批'
        }
        if(show_id){
            return '修改'
        }
        return '发布'
        
    }
    componentDidMount() {
        //role_id 是角色信息 102是家长103是班主任 show_id是获取详情用的
        const show_id = getHerfInfo('show_id');
        const role_id = getHerfInfo('role_id');
        // const nodecheck = getHerfInfo('nodecheck');
        // 返回二次确认
        var _this = this;
        window.clickBack = () => {
            const showAlert = (okFn, noFn, title, text, oktext, notext) => {
                const titleStyle = {
                    color: '#333333',
                    fontSize: '5vw',
                    fontFamily: 'PingFang-SC-Bold',
                    lineHeight: '7vw',
                    fontWeight: 'bold'
                }
                const okTextStyle = {
                    color: '#4ea375',
                    fontSize: '5vw',
                    // fontFamily: 'PingFang-SC-Medium'
                }
                const noTextStyle = {
                    color: '#999999',
                    fontSize: '5vw',
                    // fontFamily: 'PingFang-SC-Medium'
                }
                const textStyle = {
                    color: '#5a5a5a',
                    fontSize: '4vw',
                    fontFamily: 'PingFang-SC-Medium'
                }
                const alertInstance = alert(<span style={titleStyle}>{title}</span>, <span style={textStyle}>{text}</span>, [
                    { text: <span style={noTextStyle}>{notext}</span>, onPress: () => noFn() },
                    { text: <span style={okTextStyle}>{oktext}</span>, onPress: () => okFn() },
                ]);
                setTimeout(() => {
                    // 可以调用close方法以在外部close
                    alertInstance.close();
                }, 500000);
            };
            showAlert(() => {
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle?ticket=' + getHerfInfo('ticket') + '&role_id=' + getHerfInfo('role_id') + '&page=' + getHerfInfo('page');
            }, () => { }, '提示', '确定要返回吗？', '确定', '取消');
        }
        document.addEventListener('deviceready', function () {
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showTitle', [_this.getTitle()]);
        }, false);
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
        isOnLine();
        axios('get', '/api/show/classes', {
        }).then((json) => {
            const show_id = getHerfInfo('show_id');
            let myJson = {};
            // 如果是新增进来就默认选择第一个
            if (!show_id) {
                myJson.teacher_student = [json.data[0].classId]
            }
            this.setState({
                teacher_province: json.data.map(item => ({
                    label: item.className,
                    value: item.classId,
                    children: []
                })),
                resourceData: json.data,
                ...myJson
            }, () => {
                //循环请求了
                // json.data.map(item => this.getStudentInfoTeacher(item.classId))
            })
        })
    }
    getDefaultDataTeacher(show_id) {
        isOnLine();
        axios('get', '/api/show/read', {
            show_id
        }).then((json) => {
            // console.log(json);
            this.setState({
                teacher_student: [json.data.class_id],
                title: json.data.title,
                desc: json.data.desc,
                show_time: new Date(json.data.show_time * 1000),
                comment: json.data.comment,
                show_days: [json.data.show_days + ''],
                class_name: json.data.class_name,
                student_name: json.data.student_name,
                images: json.data.images,
                isChange: 1
            })
        })
    }
    //家长获取列表信息
    getStudentInfoParents() {
        isOnLine();
        axios('get', '/api/show/parentchildes', {
        }).then((json) => {
            const show_id = getHerfInfo('show_id');
            let myJson = {};
            // 如果是新增进来就默认选择第一个
            if (!show_id) {
                myJson.parents_student = [json.data[0].studentUserId]
            }
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
                })),
                ...myJson,
                // parents_student
            })
        })
    }
    //获取默认数据
    getDefaultDataParenr(show_id) {
        isOnLine();
        axios('get', '/api/show/read', {
            show_id
        }).then((json) => {
            // console.log(json);
            this.setState({
                parents_student: [json.data.student_id],
                title: json.data.title,
                desc: json.data.desc,
                show_time: new Date(json.data.show_time * 1000),
                class_name: json.data.class_name,
                student_name: json.data.student_name,
                images: json.data.images,
                isChange: 1
            })
        })
    }
    //修改新增
    submitData() {
        // /api/show/parentaddshow
        const role_id = getHerfInfo('role_id');
        const show_id = getHerfInfo('show_id');
        // const nodecheck = getHerfInfo('nodecheck');
        if (role_id == 102) {

            let { show_time, title, desc, parents_student, resourceData, images } = this.state;
            if (parents_student.length == 0) {
                // showToast('请选择孩子')
                return;
            }
            if (!title) {
                showToast('请填写标题名称')
                return;
            }
            if (!show_time) {
                // showToast('请选择时间')
                return;
            }

            if (images.length == 0) {
                showToast('请上传图片')
                return;
            }
            show_time = moment(show_time.valueOf()).format('YYYY-MM-DD');

            let submintData = {
                is_parent: 1,
                title,
                class_id: resourceData.find(item => item.studentUserId == parents_student[0]).classId,
                student_id: resourceData.find(item => item.studentUserId == parents_student[0]).studentUserId,
                teacher_id: resourceData.find(item => item.studentUserId == parents_student[0]).teacherUserId,
                desc,
                show_time,
                class_name: resourceData.find(item => item.studentUserId == parents_student[0]).className,
                student_name: resourceData.find(item => item.studentUserId == parents_student[0]).studentUserName,
                school_id: resourceData.find(item => item.studentUserId == parents_student[0]).schoolId,
                images: JSON.stringify(images),
            }
            if (show_id) {
                submintData.show_id = show_id;
            }
            isOnLine();
            axios('post', '/api/show/parentaddshow', submintData, 'form').then((json) => {
                // 处理提交成功
                if (json.code == 1) {
                    showToast('操作成功');
                    window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle?ticket=' + getHerfInfo('ticket') + '&role_id=' + getHerfInfo('role_id') + '&page=' + getHerfInfo('page');
                } else {
                    showToast(json.msg)
                }
            })
        }
        if (role_id == 103) {
            let { teacher_student, show_time, title, desc, comment, show_days, images, class_name, student_name, resourceData } = this.state;
            show_time = moment(show_time.valueOf()).format('YYYY-MM-DD');
            if (teacher_student.length == 0) {
                // showToast('请选择班级')
                return;
            }
            if (!title) {
                showToast('请填写标题名称')
                return
            }
            if (!show_time) {
                // showToast('请选择时间')
                return;
            }
            if (images.length == 0) {
                showToast('请上传图片')
                return;
            }
            if (!comment) {
                showToast('请填写教师点评')
                return;
            }
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
                images: JSON.stringify(images),
            }
            if (show_id) {
                submintData.show_id = show_id;
            } else {
                submintData.class_name = resourceData.find(item => item.classId == teacher_student[0]).className
            }
            isOnLine();
            axios('post', '/api/show/teacheraddshow', submintData, 'form').then((json) => {
                // 处理提交成功
                // console.log(json);
                if (json.code == 1) {
                    // if (nodecheck) this.check(1);
                    showToast('操作成功');
                    window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle?ticket=' + getHerfInfo('ticket') + '&role_id=' + getHerfInfo('role_id') + '&page=' + getHerfInfo('page');
                } else {
                    showToast(json.msg)
                }
            })
        }
    }
    checkSubmit() {
        const role_id = getHerfInfo('role_id');
        let { show_time, title, parents_student, teacher_student, comment, images } = this.state;
        if (role_id == 102) {
            if (parents_student.length == 0) return false;
            if (!title) return false;
            if (!show_time) return false;
            if (images.length == 0) return false;
        }
        if (role_id == 103) {
            if (teacher_student.length == 0) return false;
            if (!title) return false;
            if (!show_time) return false;
            if (!comment) return false;
            if (images.length == 0) return false;
        }
        return true;
    }

    render() {
        let { show_time, title, desc, comment, show_days, parents_province, teacher_province, class_name, canSubmit } = this.state;
        const role_id = getHerfInfo('role_id');
        // const nodecheck = getHerfInfo('nodecheck');
        // console.log(getHerfInfo('role_id'))
        // console.log(comment)
        return <Fragment>

            <div className={styles['box']} ref={(box) => { this.box = box }} style={{ minHeight: height }}>
                <div className={styles['top']}>
                    {/* 家长 */}
                    {
                        role_id == 102 && <div className={styles['row']}>
                            <Picker
                                data={parents_province}
                                value={this.state.parents_student}
                                onChange={(v) => { this.setOneKV('parents_student', v) }}
                                okText={<div style={{ color: '#4ea375' }}>确定</div>}
                                dismissText={<div style={{ color: '#999999' }}>取消</div>}
                                cols={1}
                                title='选择学生'
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
                                okText={<div style={{ color: '#4ea375' }}>确定</div>}
                                dismissText={<div style={{ color: '#999999' }}>取消</div>}
                                title='选择班级'
                            >
                                <List.Item arrow="horizontal">选择班级</List.Item>
                            </Picker>
                        </div>
                    }
                    {
                        (role_id == 103 && getHerfInfo('show_id')) && <div className={styles['row']}>
                            {/* <InputItem
                                placeholder="请输入标题名称"
                                ref={el => this.inputRef = el}
                                value={class_name}
                                maxLength={30}
                                onChange={(v) => { this.setOneKV('title', v) }}
                                // disabled
                                style={{ textAlign: 'right', color: '#5a5a5a' }}
                            >班级</InputItem> */}
                            <div className={styles['specialIntput']}>
                                <span className={styles['left']}>班级</span>
                                <span className={styles['right']}>{class_name}</span>
                            </div>
                        </div>
                    }

                    <div className={styles['row']}>
                        <DatePicker
                            mode='date'
                            value={show_time}
                            maxDate={new Date(Date.now())}
                            onChange={(date) => { this.setOneKV('show_time', new Date(date.valueOf())) }}
                            okText={<div style={{ color: '#4ea375' }}>确定</div>}
                            dismissText={<div style={{ color: '#bbb' }}>取消</div>}
                            title='选择发生时间'
                        >
                            <List.Item arrow="horizontal">发生时间</List.Item>
                        </DatePicker>
                    </div>
                    <div className={styles['row']} style={{ left: '0px' }}>
                        <InputItem
                            // style={{ overflow: 'scroll' }}
                            placeholder="请输入标题名称"
                            ref={el => this.inputRef = el}
                            extra={<div style={{ color: '#bbb' }} >&nbsp;{(title || '').length > 30 ? 30 : (title || '').length}/30</div>}
                            value={title}
                            maxLength={30}
                            onChange={(v) => { this.setOneKV('title', v.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|\u3030/ig, '')) }}
                        >标题名称</InputItem>
                    </div>
                </div>
                <div className={styles['textAreaWrap']}>
                    <div className={styles['title']}>描述（选填）</div>
                    <TextareaItem
                        // title={'描述（选填）'}
                        style={{ height: '32vw' }}
                        placeholder="请输入描述(选填)"
                        // autoHeight
                        ref={el => this.customFocusInst = el}
                        rows={6}
                        count={200}
                        value={desc}
                        onChange={(v) => { this.setOneKV('desc', v.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|\u3030/ig, '')) }}
                    />
                </div>
                <UploadImgs isChange={this.state.isChange} defaultData={this.state.images} onChange={(images) => { this.setOneKV('images', images) }} />
                {
                    role_id == 103 && <div className={styles['teachersWrap']}>
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
                                okText={<div style={{ color: '#4ea375' }}>确定</div>}
                                dismissText={<div style={{ color: '#999999' }}>取消</div>}
                                title='展示天数'
                            >
                                <List.Item arrow="horizontal">展示天数</List.Item>
                            </Picker>
                        </div>
                        <div className={styles['row']} style={{ paddingRight: '3vw' }}>
                            <InputItem
                                placeholder="请输入教师点评"
                                ref={el => this.inputRef = el}
                                extra={<div style={{ color: '#bbb' }} >{(comment || '').length > 30 ? 30 : (comment || '').length}/30</div>}
                                value={comment}
                                maxLength={30}
                                onChange={(v) => { this.setOneKV('comment', v.replace(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|\u3030/ig, '')) }}
                            >教师点评</InputItem>
                        </div>

                    </div>
                }

                <div className={styles['btnWrap']}>
                    <div
                        className={styles['btn']}
                        // style={{ backgroundColor: `${this.checkSubmit() ? '#48bb7d' : '#dbdbdb'}` }}
                        // style={(this.checkSubmit() && canSubmit) ? { backgroundColor: '#48bb7d', color: 'white' } : { backgroundColor: '#dbdbdb', color: '#bbb' }}
                        style={(this.checkSubmit() && canSubmit) ? { backgroundColor: '#48bb7d', color: 'white' } : { backgroundColor: '#48bb7d', color: 'white' }}
                        onClick={() => {
                            if (canSubmit) {
                                this.setState({
                                    canSubmit: false
                                }, () => {
                                    this.submitData();
                                })
                                setTimeout(() => {
                                    this.setState({ canSubmit: true })
                                }, 3000)
                            }
                        }}>
                        {role_id == 103 ? '发布' : '提交'}
                    </div>
                </div>
            </div>
        </Fragment >
    }
}

export default StudentsStyleP;