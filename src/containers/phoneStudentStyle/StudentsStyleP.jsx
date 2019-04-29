import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleP.scss';
// import axios from 'UTILS/axios';
import { Tabs } from 'antd-mobile';
import InfoItem from '../../components/phone_infoItem/InfoItem';
import axios from 'UTILS/axios';
import defaultImg from '../../assets/phone/defaultImg.png';
import loadingImg from '../../assets/phone/loading.gif';
class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: this.getHerfInfo('ticket'),//客户端给我用来获取信息
            roleId: 102,//角色id 102家长
            type: 0, //0:待审批 1:已同意 2:已驳回 showing:展示中
            dataList: [],
            loading: false,
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
        this.release();
        this.getInfo();
    }
    release() {
        var _this = this;
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
        window.onload = function () {
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
            window.clickMenu = (info) => {
                if (info.id == 1) {
                    window.location.href = window.location.href.split('phone')[0] + 'phone/studentsStyle/edit?isUpload=1&role_id=' + this.state.role_id + '&ticket=' + _this.state.ticket;
                }
            }
        }


    }
    getInfo() {
        this.setState({ loading: true })
        axios('post', '/api/show/auth', {
        }, 'form').then((json) => {
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

        }).then((json) => {
            // console.log(json)
            this.setState({
                dataList: json.data.data,
                loading: false
            })
        })
    }
    onTouchMove(e) {
        e.preventDefault();
        // let offsetHeight = this.container.offsetHeight;
        // let scrollHeight = this.container.scrollHeight;
        // let scrollTop = this.container.scrollTop;
        // console.log(offsetHeight, scrollHeight, scrollTop)
    }
    onChange = (tab) => {
        this.setState({
            type: tab.value,
            dataList: [],
        }, () => {
            this.getList();
        })
        // console.log(tab, index)
    }
    render() {
        let { roleId, type, dataList, loading } = this.state;
        const tabs = this.state.roleId == 102 ? [
            { title: '待审批', value: 0 },
            { title: '已经同意', value: 1 },
            { title: '已驳回', value: 2 },
        ] : [
                { title: '展示中', value: 'showing' },
                { title: '待审批', value: 0 },
                { title: '已经同意', value: 1 },
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
                            roleId == 103 && <div className={styles['tabItem']}>
                                <div className={styles['scroll']}>
                                    {
                                        dataList.length > 0
                                            ?
                                            dataList.map(
                                                (item, index) =>
                                                    <InfoItem
                                                        key={index}
                                                        upload={() => { this.getList() }}
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
                                                    />
                                            )
                                            :
                                            <div className={styles['noData']}>
                                                <div className={styles['defaultShow']}>
                                                    <img src={defaultImg} alt="" />
                                                    <p>暂无展示</p>
                                                </div>
                                            </div>
                                    }
                                    <div className={styles['noMoreData']}>
                                        无跟多数据
                                </div>
                                </div>
                            </div>
                        }
                        {/* tab1 */}
                        <div
                            className={styles['tabItem']}
                            ref={(container) => { this.container = container }}
                            onScroll={(e) => { this.onTouchMove(e) }}
                        >
                            <div className={styles['scroll']}>
                                <InfoItem
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
                                />
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
                                                    upload={() => { this.getList() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无展示</p>
                                            </div>
                                        </div>
                                }
                                <div className={styles['noMoreData']}>
                                    无跟多数据
                            </div>
                            </div>
                        </div>
                        {/* tab2 */}
                        <div className={styles['tabItem']}>
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
                                                    upload={() => { this.getList() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}

                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无展示</p>
                                            </div>
                                        </div>
                                }
                                <div className={styles['noMoreData']}>
                                    无跟多数据
                            </div>
                            </div>
                        </div>
                        {/* tab3 */}
                        <div className={styles['tabItem']}>
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
                                                    upload={() => { this.getList() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无展示</p>
                                            </div>
                                        </div>
                                }
                                <div className={styles['noMoreData']}>
                                    无跟多数据
                            </div>
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
                            className={styles['tabItem']}
                            ref={(container) => { this.container = container }}
                            onScroll={(e) => { this.onTouchMove(e) }}
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
                                                    upload={() => { this.getList() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                    ticket={this.state.ticket}
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无展示</p>
                                            </div>
                                        </div>
                                }

                                <div className={styles['noMoreData']}>
                                    无跟多数据
                                </div>
                            </div>
                        </div>
                        {/* tab2 */}
                        <div className={styles['tabItem']}>
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
                                                    upload={() => { this.getList() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                    ticket={this.state.ticket}
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无展示</p>
                                            </div>
                                        </div>
                                }
                                <div className={styles['noMoreData']}>
                                    无跟多数据
                            </div>
                            </div>
                        </div>
                        {/* tab3 */}
                        <div className={styles['tabItem']}>
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
                                                    upload={() => { this.getList() }}
                                                    roleId={roleId}
                                                    type={type}
                                                    title={item.title}
                                                    show_time={item.show_time}
                                                    desc={item.desc}
                                                    createtime={item.createtime}
                                                    id={item.id}
                                                />
                                        )
                                        :
                                        <div className={styles['noData']}>
                                            <div className={styles['defaultShow']}>
                                                <img src={defaultImg} alt="" />
                                                <p>暂无展示</p>
                                            </div>
                                        </div>
                                }
                                <div className={styles['noMoreData']}>
                                    无跟多数据
                            </div>
                            </div>
                        </div>
                    </Tabs>
                }
            </div>
        </Fragment>
    }
}

export default StudentsStyleP;