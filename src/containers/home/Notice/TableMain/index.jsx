import React from 'react';
import style from './index.scss';
import Polling from 'UTILS/polling';

const dataList = [
    {
        title: '通知类型标题展示默摩学校运动会运动会运动会运动会',
        start: '1554206587908'
    },
    {
        title: '通知类型标题展示默摩学校运动会运动会运动会运动会',
        start: '1554206587908'
    },
    {
        title: '通知类型标题展示默摩学校运动会运动会运动会运动会',
        start: '1554206587908'
    },
]

export default class TableMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList
        };
        const timer = new Polling({
            timeout: 1000*10,
            fn: this.fetchNoticeData
        });
        this.timer = timer;
    }
    componentDidMount() {
        // TODO: 开启定时器
        // this.timer.loop();
    }
    //获取通知列表
    getNoticeList = () => {
        
    }
    
    fetchNoticeData = () => {
        
    }

    renderTableLine = ({ title, start }) => {
        return <div className={style['lineStyle']}>
            <span className={style['title']}>{title}</span>
            <span className={style['start']}>{start}</span>
        </div>
    }
    render() {
        const { dataList } = this.state;
        return (
            <div className={style['tableContent']}>
                <ul>
                    {
                        dataList.map((ele) => 
                            this.renderTableLine(ele)
                        )
                    }
                </ul>
            </div>
        );
    }
}

