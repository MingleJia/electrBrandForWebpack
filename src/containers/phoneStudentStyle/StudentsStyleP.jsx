import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleP.scss';
// import axios from 'UTILS/axios';
import { Tabs } from 'antd-mobile';
import InfoItem from '../../components/phone_infoItem/InfoItem';
import axios from 'UTILS/axios';
class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: '',//客户端给我用来获取信息
            isShowImg: false,
            showImgSrc: '',

            roleId: null,//角色id
            type: 0, //0:待审批 1:已同意 2:已驳回 showing:展示中
        }
    }

    componentDidMount() {
        this.getInfo();
    }
    getInfo() {
        axios('post', '/api/show/auth', {
        }, 'form').then((json) => {
            this.setState({
                roleId: json.data.roleId
            }, () => {
                this.getList()
            }
            )
        })
    }
    getList() {
        axios('get', '/api/show/lists', {
            is_teacher: this.state.roleId == 102 ? 0 : 1,
            audit_status: this.state.type
        }).then((json) => {
            // console.log(json)
            // this.setState({
            //     campusList: json.data,
            // })
        })
    }
    closeShowImg = () => {
        this.setState({ isShowImg: false, showImgSrc: '' })
    }
    onTouchMove(e) {
        e.preventDefault();
        // let offsetHeight = this.container.offsetHeight;
        // let scrollHeight = this.container.scrollHeight;
        // let scrollTop = this.container.scrollTop;
        // console.log(offsetHeight, scrollHeight, scrollTop)
    }
    onChange = (tab, index) => {
        this.setState({ type: index })
        // console.log(tab, index)
    }
    render() {
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
            <div
                className={styles['box']}
            >
                {/* showImg */}
                <div onClick={this.closeShowImg} className={styles['showImg']} style={{ display: `${this.state.isShowImg ? 'block' : 'none'}` }}>
                    <img src={this.state.showImgSrc} alt="" />
                </div>
                <Tabs
                    tabBarUnderlineStyle={{ border: '1px #4ea375 solid' }}
                    tabBarActiveTextColor={'#4ea375'}
                    // onTabClick={(tab, index) => { console.log(tab, index) }}
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
                            <InfoItem
                                showImg={(isShowImg, showImgSrc) => {
                                    this.setState({ isShowImg, showImgSrc })
                                }}
                            />
                            <InfoItem

                            />
                            <InfoItem
                            />
                            <InfoItem
                            />
                            <div className={styles['noMoreData']}>
                                无跟多数据
                            </div>
                        </div>
                    </div>
                    {/* tab2 */}
                    <div className={styles['tabItem']}>
                        已经同意
                    </div>
                    {/* tab3 */}
                    <div className={styles['tabItem']}>
                        已驳回
                    </div>
                </Tabs>
            </div>
        </Fragment>
    }
}

export default StudentsStyleP;