import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleP.scss';
// import axios from 'UTILS/axios';
import { Tabs } from 'antd-mobile';
import InfoItem from '../../components/phone_infoItem/InfoItem';
import axios from 'UTILS/axios';
import defaultImg from '../../assets/phone/defaultImg.png';
import loadingImg from '../../assets/phone/ld.gif';
import { getHerfInfo } from '../../utils/method';
// var lock = true;
class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: getHerfInfo('ticket'),//客户端给我用来获取信息
            roleId: 102,//角色id 102家长
            type: 0, //0:待审批 1:已同意 2:已驳回 showing:展示中
            dataList: [],
            loading: false,
            idx: 1,//请求第几波数据
            isOver: false,
        }
    }
    componentDidMount() {
        this.release();
        this.getInfo();
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
                        title: "发布" //按钮标题
                    }
                ]]);
            }
        }, false);
        document.addEventListener('deviceready', function () {
            window.cordova.exec(function(){ }, function(){ }, 'LeTalkCorePlugin', 'showTitle', ['学生风采']);
            window.cordova.exec(function () { }, function () { }, 'LeTalkCorePlugin', 'showMenu', [[
                {
                    groupid: 1, //标题栏右侧按钮，一级按钮（groupid相同且数量大于1代表有二级子菜单，否则只是一个普通按钮）
                    groupOrder: 0, //标题栏右侧按钮，一级按钮显示顺序，0表示靠右边显示，从右向左依次递增
                    id: 1, //一级按钮或二级按钮唯一标识，用于点击按钮后回传给H5数据，H5根据唯一标识识别做了什么操作
                    order: 0, //二级子菜单（下拉菜单）显示顺序
                    count: 0, //未读数量显示
                    icon: "", //按钮图片
                    isShowNum: false, //未读数量是否显示
                    title: "发布" //按钮标题
                }
            ]]);
        }, false);
        window.clickMenu = (info) => {
            if (info.id == 1) {
                window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle/edit?isUpload=1&role_id=' + _this.state.roleId + '&ticket=' + _this.state.ticket;
            }
        }
    }
    getInfo() {
        this.setState({ loading: true })
        axios('post', '/api/show/auth', {
        }, 'form').then((json) => {
            if (json.code == 0) {
                this.setState({ loading: false })
                window.cordova.exec(function () { }, function () { }, "LeTalkCorePlugin", "showToast", [{ "content": json.msg }])
            }
            this.setState({
                roleId: json.data.roleId,
                type: json.data.roleId == 102 ? 0 : 'showing'
            }, () => {
                this.getList()
            }
            )
        })
    }
    getList() {
        this.setState({ loading: true })
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
        if (offsetHeight + scrollTop > scrollHeight - 100 && !this.state.isOver && this.state.loading == false) {
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
    onChange = (tab) => {
        this.setState({
            type: tab.value,
            dataList: [],
            idx: 1
        }, () => {
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
        let { roleId, type, dataList, loading, isOver } = this.state;
        const tabs = this.state.roleId == 102 ? [
            { title: '待审批', value: 0 },
            { title: '已同意', value: 1 },
            { title: '已驳回', value: 2 },
        ] : [
                { title: '展示中', value: 'showing' },
                { title: '待审批', value: 0 },
                { title: '已同意', value: 1 },
                { title: '已驳回', value: 2 },
            ];
        return <Fragment>
            {/* <DeleteDialog/> */}
            {

                loading && <div className={styles['loading']}>
                    <img src={loadingImg} alt="" />
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
                        swipeable={false}
                        onChange={this.onChange}
                        tabs={tabs}
                        initialPage={this.state.type}
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
                                                    />
                                            )
                                            :
                                            <div className={styles['noData']}>
                                                <div className={styles['defaultShow']}>
                                                    <img src={defaultImg} alt="" />
                                                    <p>暂无展示中</p>
                                                </div>
                                            </div>
                                    }
                                    {(isOver && dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv) => { this.bottomdiv = bottomdiv }}>
                                        无更多数据
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
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无待审批</p>
                                            </div>
                                        </div>
                                }
                                {(isOver && dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv2) => { this.bottomdiv2 = bottomdiv2 }} >
                                    无更多数据
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
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无已同意</p>
                                            </div>
                                        </div>
                                }
                                {(isOver && dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv3) => { this.bottomdiv3 = bottomdiv3 }}>
                                    无更多数据
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
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无已驳回</p>
                                            </div>
                                        </div>
                                }
                                {(isOver && dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv4) => { this.bottomdiv4 = bottomdiv4 }}>
                                    无更多数据
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
                        swipeable={false}
                        onChange={this.onChange}
                        tabs={tabs}
                        initialPage={this.state.type}
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
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无待审批</p>
                                            </div>
                                        </div>
                                }

                                {(isOver && dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv5) => { this.bottomdiv5 = bottomdiv5 }}>
                                    无更多数据
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
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无已同意</p>
                                            </div>
                                        </div>
                                }
                                {(isOver && dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv6) => { this.bottomdiv6 = bottomdiv6 }}>
                                    无更多数据
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
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无已驳回</p>
                                            </div>
                                        </div>
                                }
                                {(isOver && dataList.length > 2) && <div className={styles['noMoreData']} ref={(bottomdiv7) => { this.bottomdiv7 = bottomdiv7 }}>
                                    无更多数据
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