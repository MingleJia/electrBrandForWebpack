import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleP.scss';
// import axios from 'UTILS/axios';
import { Tabs, Badge } from 'antd-mobile';
import InfoItem from '../../components/phone_infoItem/InfoItem';
import axios from 'UTILS/axios';
import defaultImg from '../../assets/phone/defaultImg.png';
// import loadingImg from '../../assets/phone/ld.gif';
import { getHerfInfo, isOnLine, showToast } from '../../utils/method';
import { Icon } from 'antd';
// var lock = true;
class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: getHerfInfo('ticket'),//客户端给我用来获取信息
            roleId: null,//角色id 102家长
            type: 0, //0:待审批 1:已同意 2:已驳回 showing:展示中  用来请求数据用的
            dataList: [],
            loading: false,
            idx: 1,//请求第几波数据
            isOver: false,
            page: 0, //用来记录返回操作tab
            badgeNum: 0, //待审批数量
            canCommit: 0, //能否发布
            canUpdate: 0, //能否修改
        }
    }
    getType() {
        if (getHerfInfo('role_id') == 103) {
            if (getHerfInfo('page') == 0) {
                return 'showing'
            }
            if (getHerfInfo('page') == 1) {
                return '0'
            }
            if (getHerfInfo('page') == 2) {
                return '1'
            }
            if (getHerfInfo('page') == 3) {
                return '2'
            }
        }
        if (getHerfInfo('role_id') == 102) {
            if (getHerfInfo('page') == 1) {
                return '1'
            }
            if (getHerfInfo('page') == 2) {
                return '2'
            }
        }
        return '0'
    }
    componentDidMount() {
        // console.log(height)
        document.title = '学生风采';
        this.release();
        if (getHerfInfo('role_id')) {
            this.setState({
                page: getHerfInfo('page'),
                type: this.getType(),
                roleId: getHerfInfo('role_id'),
            }, () => {
                this.getList();
            })
        } else {
            this.getInfo();
        }
    }
    //获取待审批数量
    getBadgeNum() {
        axios('post', '/api/show/noauditcount', {
        }, 'form').then((json) => {
            this.setState({
                badgeNum: json.data
            })
        })
    }
    //获取家长能否修改和能否发布
    canCommit() {
        axios('get', '/api/show/canCommit', {
        }, 'form').then((json) => {
            this.setState({
                canCommit: json.code
            })
        })
    }
    canUpdate(id) {
        axios('get', '/api/show/canUpdate', {
            show_id: id
        }, 'form').then((json) => {
            this.setState({
                canUpdate: json.code
            })
        })
    }
    getShowBadgeNum(n) {
        if (!n) return '';
        if (n <= 0) return '';
        if (n > 99) return '99+';
        return n + '';
    }
    release() {
        // document.title = '学生风采'
        var _this = this;
        //路由变化函数
        window.addEventListener('hashchange', function () {
            if (window.location.href.indexOf('edit') != -1) {
                window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[]]);
                return;
            } else {
                window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
                    {
                        groupid: 1, //标题栏右侧按钮，一级按钮（groupid相同且数量大于1代表有二级子菜单，否则只是一个普通按钮）
                        groupOrder: 0, //标题栏右侧按钮，一级按钮显示顺序，0表示靠右边显示，从右向左依次递增
                        id: 1, //一级按钮或二级按钮唯一标识，用于点击按钮后回传给H5数据，H5根据唯一标识识别做了什么操作
                        order: 0, //二级子菜单（下拉菜单）显示顺序
                        count: 0, //未读数量显示
                        icon: "", //按钮图片
                        isShowNum: false, //未读数量是否显示
                        title: _this.state.roleId == 102 ? '发布' : '发布' //按钮标题
                    }
                ]]);
            }
        }, false);
        document.addEventListener('deviceready', function () {
            // window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showTitle', ['学生风采']);
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
                {
                    groupid: 1, //标题栏右侧按钮，一级按钮（groupid相同且数量大于1代表有二级子菜单，否则只是一个普通按钮）
                    groupOrder: 0, //标题栏右侧按钮，一级按钮显示顺序，0表示靠右边显示，从右向左依次递增
                    id: 1, //一级按钮或二级按钮唯一标识，用于点击按钮后回传给H5数据，H5根据唯一标识识别做了什么操作
                    order: 0, //二级子菜单（下拉菜单）显示顺序
                    count: 0, //未读数量显示
                    icon: "", //按钮图片
                    isShowNum: false, //未读数量是否显示
                    title: _this.state.roleId == 102 ? '发布' : '发布' //按钮标题
                }
            ]]);
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'customBack', ['custom']);
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'customClose', ['custom']);
        }, false);
        //点击返回 (此方法必须customClose执行后)
        window.clickMenu = (info) => {
            if (info.id == 1) {
                if (_this.state.canCommit == 0) {
                    showToast('当无法发布，请等待审批');
                    return
                }
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle/edit?isUpload=1&role_id=' + _this.state.roleId + '&ticket=' + _this.state.ticket + '&page=' + _this.state.page;
            }
        }
        // 点击关闭(此方法必须customBack执行后)
        window.clickBack = () => {
            if (window.location.href.indexOf('edit') == -1) {
                window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'close', [null]);
            } else {
                window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'back', [null]);
            }
        }
        window.clickClose = () => {
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'close', [null]);
        }
    }
    getInfo() {
        isOnLine();
        this.setState({ loading: true })
        axios('post', '/api/show/auth', {
        }, 'form').then((json) => {
            if (json.code == 0) {
                this.setState({ loading: false })
                window.cordova.exec(function () { }, function () { }, "LeTalkCorePlugin", "showToast", [{ "content": json.msg }])
            }
            this.setState({
                roleId: json.data.roleId,
                type: json.data.roleId == 102 ? 0 : 'showing',
                page: 0
            }, () => {
                this.getList()
            }
            )
        })
    }
    //获取列表和未审批数量
    getList() {
        isOnLine();
        this.setState({ loading: true });
        if (this.state.roleId == 103) {
            this.getBadgeNum();
        }
        if (this.state.roleId == 102) {
            this.canCommit();
        }
        axios('get', '/api/show/lists', {
            is_teacher: this.state.roleId == 102 ? 0 : 1,
            audit_status: this.state.type,
            page: this.state.idx,
        }).then((json) => {
            // console.log(json)
            this.setState({
                // dataList: json.data.data,
                dataList: [
                    ...this.state.dataList,
                    ...json.data.data
                ],
                loading: false,
                isOver: json.data.data.length < 10 ? true : false
            }, () => {
                if (this.state.roleId) {
                    let id = json.data.data[0] ? json.data.data[0].id : ''
                    this.canUpdate(id);
                }
            })
        })
    }
    /**
     * 
     * @param {外部div} name string 
     */
    onTouchMove(name) {
        let offsetHeight = this[name].offsetHeight;
        let scrollHeight = this[name].scrollHeight;
        let scrollTop = this[name].scrollTop;
        if (offsetHeight + scrollTop > scrollHeight - 300 && !this.state.isOver && this.state.loading == false) {
            this.setState({
                idx: this.state.idx + 1
            }, () => {
                this.getList();
            })
        }
    }
    /**
     * 
     * @param {外部div的名字} name string
     * @param {底部div的名字} name2 string
     */
    // gotoBottom(name, name2) {
    //     let offsetHeight = this[name].offsetHeight;
    //     let scrollHeight = this[name].scrollHeight;
    //     let scrollTop = this[name].scrollTop;
    //     if (!this[name2]) return;
    //     // 底部的东西的高
    //     let scrollHeightBottomDiv = this[name2].scrollHeight;
    //     // console.log(offsetHeight, scrollHeight, scrollTop);
    //     // console.log(scrollHeightBottomDiv);
    //     if (offsetHeight + scrollTop > scrollHeight - scrollHeightBottomDiv && lock) {
    //         this.goToBottomTimer = setInterval(() => {
    //             offsetHeight = this[name].offsetHeight;
    //             scrollHeight = this[name].scrollHeight;
    //             scrollTop = this[name].scrollTop;
    //             this[name].scrollTop -= 1;
    //             lock = false;

    //             if (scrollTop + offsetHeight + scrollHeightBottomDiv - 5 <= scrollHeight) {
    //                 lock = true;
    //                 clearInterval(this.goToBottomTimer);
    //             }


    //         }, 1)
    //     }
    // }
    changeURLArg(url, arg, arg_val) {
        var pattern = arg + '=([^&]*)';
        var replaceText = arg + '=' + arg_val;
        if (url.match(pattern)) {
            var tmp = '/(' + arg + '=)([^&]*)/gi';
            tmp = url.replace(eval(tmp), replaceText);
            return tmp;
        } else {
            if (url.indexOf('?') != -1) {
                return url + '&' + replaceText;
            } else {
                return url + '?' + replaceText;
            }
        }
    }
    onChange = (tab) => {
        document.title = '学生风采';
        // document.addEventListener('deviceready', function () {
        //     window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showTitle', ['学生风采']);
        // })
        this.setState({
            page: tab.page,
            type: tab.value,
            dataList: [],
            idx: 1
        }, () => {
            window.location.href = this.changeURLArg(this.changeURLArg(window.location.href, 'page', this.state.page), 'role_id', this.state.roleId)
            this.getList();
        })
        // console.log(tab, index)
    }
    //跟新列表
    upload() {
        this.setState({
            dataList: []
        }, () => {
            this.getList();
        })
    }

    render() {
        let { roleId, type, dataList, loading, isOver, page, idx, badgeNum, canUpdate } = this.state;
        const tabs = this.state.roleId == 102 ? [
            { title: '待审批', value: 0, page: 0 },
            { title: '已同意', value: 1, page: 1 },
            { title: '已驳回', value: 2, page: 2 },
        ] : [
                { title: '展示中', value: 'showing', page: 0 },
                { title: <Badge text={this.getShowBadgeNum(badgeNum)}>待审批</Badge>, value: 0, page: 1, },
                { title: '已同意', value: 1, page: 2 },
                { title: '已驳回', value: 2, page: 3 },
            ];
        return <Fragment>
            {/* <DeleteDialog/> */}
            {

                (loading && idx == 1) && <div className={styles['loading']}>
                    {/* <img src={loadingImg} alt="" /> */}
                    <Icon className={styles['loadingIcon']} type="loading" style={{ color: '#48bb7d' }} />
                </div>
            }
            <div
                className={styles['box']}
            >
                {/* 老师 */}
                {
                    roleId == 103 && <Tabs
                        tabBarUnderlineStyle={{ border: '1px #4ea375 solid' }}
                        tabBarActiveTextColor={'#4ea375'}
                        // onTabClick={(tab, index) => { console.log(tab, index) }}
                        swipeable={true}
                        onChange={this.onChange}
                        tabs={tabs}
                        initialPage={JSON.parse(this.state.page || 0)}
                        distanceToChangeTab={1.9}
                        // page={this.state.page}
                        animated={true}
                        useOnPan={false}>
                        {/* 展示中 */}
                        {
                            roleId == 103 && <div
                                ref={(container) => { this.container = container }}
                                onScroll={() => { this.onTouchMove('container') }}
                                // onTouchEnd={() => { this.gotoBottom('container', 'bottomdiv') }}
                                className={styles['tabItem']}>


                                <div className={styles['scroll']}>
                                    {
                                        dataList.length > 0
                                            ?
                                            dataList.map(
                                                (item, index) =>
                                                    <InfoItem
                                                        key={index}
                                                        upload={() => { this.upload() }}
                                                        roleId={roleId}
                                                        showTop={false}
                                                        type={type}
                                                        title={item.title}
                                                        show_time={item.show_time}
                                                        show_days={item.show_days}
                                                        desc={item.desc}
                                                        id={item.id}
                                                        images={item.images}
                                                        comment={item.comment}
                                                        class_name={item.class_name}
                                                        student_name={item.student_name}
                                                        ticket={this.state.ticket}
                                                        isShowApprovalTime={true}
                                                        approvalTime={item.audit_time}
                                                        page={page}
                                                    />
                                            )
                                            :
                                            (
                                                loading
                                                    ?
                                                    null
                                                    :
                                                    <div className={styles['noData']}>
                                                        <div className={styles['defaultShow']}>
                                                            <img src={defaultImg} alt="" />
                                                            <p>暂无数据</p>
                                                        </div>
                                                    </div>
                                            )
                                    }
                                    {(dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv) => { this.bottomdiv = bottomdiv }}>
                                        {
                                            loading
                                                ?
                                                < Icon className={styles['loadingIcon']} type="loading" style={{ color: '#48bb7d' }} />
                                                :
                                                (isOver ? '没有更多了' : '')
                                        }
                                    </div>}
                                </div>
                            </div>
                        }
                        {/* 待审批 */}
                        <div
                            ref={(container2) => { this.container2 = container2 }}
                            onScroll={() => { this.onTouchMove('container2') }}
                            // onTouchEnd={() => { this.gotoBottom('container2', 'bottomdiv2') }}
                            className={styles['tabItem']}
                        >
                            <div className={styles['scroll']}>
                                {
                                    dataList.length > 0
                                        ?
                                        dataList.map(
                                            (item, index) =>
                                                <InfoItem
                                                    showTop={true}
                                                    student_name={item.student_name}
                                                    class_name={item.class_name}
                                                    key={index}
                                                    upload={() => { this.upload() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                    ticket={this.state.ticket}
                                                    isShowApprovalTime={false}
                                                    images={item.images}
                                                    page={page}
                                                />
                                        )
                                        :
                                        (
                                            loading
                                                ?
                                                null
                                                :
                                                (
                                                    loading
                                                        ?
                                                        null
                                                        :
                                                        <div className={styles['noData']}>
                                                            <div className={styles['defaultShow']}>
                                                                <img src={defaultImg} alt="" />
                                                                <p>暂无数据</p>
                                                            </div>
                                                        </div>
                                                )
                                        )
                                }
                                {(dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv) => { this.bottomdiv = bottomdiv }}>
                                    {
                                        loading
                                            ?
                                            < Icon className={styles['loadingIcon']} type="loading" style={{ color: '#48bb7d' }} />
                                            :
                                            (isOver ? '没有更多了' : '')
                                    }
                                </div>}
                            </div>
                        </div>
                        {/* 已经同意 */}
                        <div
                            ref={(container3) => { this.container3 = container3 }}
                            onScroll={() => { this.onTouchMove('container3') }}
                            // onTouchEnd={() => { this.gotoBottom('container3', 'bottomdiv3') }}
                            className={styles['tabItem']}>
                            <div className={styles['scroll']}>
                                {
                                    dataList.length > 0
                                        ?
                                        dataList.map(
                                            (item, index) =>
                                                <InfoItem
                                                    showTop={false}
                                                    student_name={item.student_name}
                                                    class_name={item.class_name}
                                                    key={index}
                                                    upload={() => { this.upload() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                    isShowApprovalTime={true}
                                                    approvalTime={item.audit_time}
                                                    images={item.images}
                                                    page={page}
                                                />
                                        )
                                        :
                                        (
                                            loading
                                                ?
                                                null
                                                :
                                                <div className={styles['noData']}>
                                                    <div className={styles['defaultShow']}>
                                                        <img src={defaultImg} alt="" />
                                                        <p>暂无数据</p>
                                                    </div>
                                                </div>
                                        )
                                }
                                {(dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv) => { this.bottomdiv = bottomdiv }}>
                                    {
                                        loading
                                            ?
                                            < Icon className={styles['loadingIcon']} type="loading" style={{ color: '#48bb7d' }} />
                                            :
                                            (isOver ? '没有更多了' : '')
                                    }
                                </div>}
                            </div>
                        </div>
                        {/* 已驳回 */}
                        <div
                            ref={(container4) => { this.container4 = container4 }}
                            onScroll={() => { this.onTouchMove('container4') }}
                            // onTouchEnd={() => { this.gotoBottom('container4', 'bottomdiv4') }}
                            className={styles['tabItem']}>
                            <div className={styles['scroll']}>
                                {
                                    dataList.length > 0
                                        ?
                                        dataList.map(
                                            (item, index) =>
                                                <InfoItem
                                                    showTop={true}
                                                    student_name={item.student_name}
                                                    class_name={item.class_name}
                                                    key={index}
                                                    upload={() => { this.upload() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                    isShowApprovalTime={true}
                                                    approvalTime={item.audit_time}
                                                    images={item.images}
                                                    page={page}
                                                />
                                        )
                                        :
                                        (
                                            loading
                                                ?
                                                null
                                                :
                                                <div className={styles['noData']}>
                                                    <div className={styles['defaultShow']}>
                                                        <img src={defaultImg} alt="" />
                                                        <p>暂无数据</p>
                                                    </div>
                                                </div>
                                        )
                                }
                                {(dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv) => { this.bottomdiv = bottomdiv }}>
                                    {
                                        loading
                                            ?
                                            < Icon className={styles['loadingIcon']} type="loading" style={{ color: '#48bb7d' }} />
                                            :
                                            (isOver ? '没有更多了' : '')
                                    }
                                </div>}
                            </div>
                        </div>
                    </Tabs>
                }
                {/* 家长 */}
                {
                    roleId == 102 && <Tabs
                        tabBarUnderlineStyle={{ border: '1px #4ea375 solid' }}
                        tabBarActiveTextColor={'#4ea375'}
                        // onTabClick={(tab, index) => { console.log(tab, index) }}
                        swipeable={true}
                        onChange={this.onChange}
                        tabs={tabs}
                        // initialPage={this.state.type}
                        initialPage={JSON.parse(this.state.page || 0)}
                        distanceToChangeTab={0.7}
                        animated={true}
                        useOnPan={false}>
                        {/* tab1 */}
                        <div
                            ref={(container5) => { this.container5 = container5 }}
                            onScroll={() => { this.onTouchMove('container5') }}
                            // onTouchEnd={() => { this.gotoBottom('container5', 'bottomdiv5') }}
                            className={styles['tabItem']}
                        >
                            <div className={styles['scroll']}>
                                {/* <InfoItem
                                    roleId={roleId}
                                    type={type}
                                    images={
                                        [
                                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg",
                                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg",
                                            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556164033133&di=875e6d5d90ca9cbe6976ef2356612d21&imgtype=0&src=http%3A%2F%2Fbbsfiles.vivo.com.cn%2Fvivobbs%2Fattachment%2Fforum%2F201701%2F18%2F185139a51jyj1ylf2z168h.jpg",
                                        ]
                                    }
                                    ticket={this.state.ticket}
                                /> */}
                                {
                                    dataList.length > 0
                                        ?
                                        dataList.map(
                                            (item, index) =>
                                                <InfoItem
                                                    showTop={true}
                                                    student_name={item.student_name}
                                                    class_name={item.class_name}
                                                    key={index}
                                                    upload={() => { this.upload() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                    ticket={this.state.ticket}
                                                    isShowApprovalTime={false}
                                                    images={item.images}
                                                    page={page}

                                                />
                                        )
                                        :
                                        (
                                            loading
                                                ?
                                                null
                                                :
                                                <div className={styles['noData']}>
                                                    <div className={styles['defaultShow']}>
                                                        <img src={defaultImg} alt="" />
                                                        <p>暂无数据</p>
                                                    </div>
                                                </div>
                                        )
                                }

                                {(dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv) => { this.bottomdiv = bottomdiv }}>
                                    {
                                        loading
                                            ?
                                            < Icon className={styles['loadingIcon']} type="loading" style={{ color: '#48bb7d' }} />
                                            :
                                            (isOver ? '没有更多了' : '')
                                    }
                                </div>}
                            </div>
                        </div>
                        {/* tab2 */}
                        <div
                            ref={(container6) => { this.container6 = container6 }}
                            onScroll={() => { this.onTouchMove('container6') }}
                            // onTouchEnd={() => { this.gotoBottom('container6', 'bottomdiv6') }}
                            className={styles['tabItem']}>
                            <div className={styles['scroll']}>
                                {
                                    dataList.length > 0
                                        ?
                                        dataList.map(
                                            (item, index) =>
                                                <InfoItem
                                                    showTop={true}
                                                    student_name={item.student_name}
                                                    class_name={item.class_name}
                                                    key={index}
                                                    upload={() => { this.upload() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                    ticket={this.state.ticket}
                                                    isShowApprovalTime={true}
                                                    approvalTime={item.audit_time}
                                                    images={item.images}
                                                    page={page}
                                                />
                                        )
                                        :
                                        (
                                            loading
                                                ?
                                                null
                                                :
                                                <div className={styles['noData']}>
                                                    <div className={styles['defaultShow']}>
                                                        <img src={defaultImg} alt="" />
                                                        <p>暂无数据</p>
                                                    </div>
                                                </div>
                                        )
                                }
                                {(dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv) => { this.bottomdiv = bottomdiv }}>
                                    {
                                        loading
                                            ?
                                            < Icon className={styles['loadingIcon']} type="loading" style={{ color: '#48bb7d' }} />
                                            :
                                            (isOver ? '没有更多了' : '')
                                    }
                                </div>}
                            </div>
                        </div>
                        {/* tab3 */}
                        <div
                            ref={(container7) => { this.container7 = container7 }}
                            onScroll={() => { this.onTouchMove('container7') }}
                            // onTouchEnd={() => { this.gotoBottom('container7', 'bottomdiv7') }}
                            className={styles['tabItem']}>
                            <div className={styles['scroll']}>
                                {
                                    dataList.length > 0
                                        ?
                                        dataList.map(
                                            (item, index) =>
                                                <InfoItem
                                                    showTop={true}
                                                    student_name={item.student_name}
                                                    class_name={item.class_name}
                                                    key={index}
                                                    upload={() => { this.upload() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                    isShowApprovalTime={true}
                                                    approvalTime={item.audit_time}
                                                    images={item.images}
                                                    page={page}
                                                />
                                        )
                                        :
                                        (
                                            loading
                                                ?
                                                null
                                                :
                                                <div className={styles['noData']}>
                                                    <div className={styles['defaultShow']}>
                                                        <img src={defaultImg} alt="" />
                                                        <p>暂无数据</p>
                                                    </div>
                                                </div>
                                        )
                                }
                                {(dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv) => { this.bottomdiv = bottomdiv }}>
                                    {
                                        loading
                                            ?
                                            < Icon className={styles['loadingIcon']} type="loading" style={{ color: '#48bb7d' }} />
                                            :
                                            (isOver ? '没有更多了' : '')
                                    }
                                </div>}
                            </div>
                        </div>
                    </Tabs>
                }
            </div>
        </Fragment>
    }
}

export default StudentsStyleP;