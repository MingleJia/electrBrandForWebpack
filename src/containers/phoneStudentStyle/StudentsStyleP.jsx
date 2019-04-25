import React, { Component, Fragment } from 'react';
import styles from './StudentsStyleP.scss';
// import axios from 'UTILS/axios';
import { Tabs } from 'antd-mobile';
import InfoItem from '../../components/phone_infoItem/InfoItem';
class StudentsStyleP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ticket: '',//客户端给我用来获取信息
            type: ''
        }
    }

    componentDidMount() {
    }
    render() {
        const tabs = [
            { title: '待审批', value: 0 },
            { title: '已经同意', value: 1 },
            { title: '已驳回', value: 2 },
        ];
        return <Fragment>
            <div className={styles['box']}>
                <Tabs
                    // onTabClick={(tab, index) => { console.log(tab, index) }}
                    // onChange={(tab, index) => { console.log(tab, index) }}
                    tabs={tabs}
                    initialPage={0}
                    animated={true}
                    useOnPan={false}>
                    <div className={styles['tabItem']}>
                        <InfoItem />
                        <InfoItem />
                        <InfoItem />
                        <InfoItem />
                    </div>
                    <div className={styles['tabItem']}>
                        已经同意
                    </div>
                    <div className={styles['tabItem']}>
                        已驳回
                    </div>
                </Tabs>
            </div>
        </Fragment>
    }
}

export default StudentsStyleP;