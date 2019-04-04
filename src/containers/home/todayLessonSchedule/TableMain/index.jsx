import React from 'react';
import axios from 'UTILS/axios';
import style from './index.scss';

export default class TableMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {}
        };
    }
    
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios('get', '/api/index/schedule').then(data => {
            if (data.code === '200' && data.success) {
                this.setState({
                    tableData: data.data.todaySchedule,
                })
            }
        })
    }

    renderTableLine = (key) => {
        const { tableData } = this.state;
        let obj = {};
        const record = tableData[key];
        // if (record.length > 1) {
        //     // 多节课的情况
        // } else {
            obj = {
                indexName: key,
                classTime: record.map(ele => ele.classTime),
                subName: record.map(ele => ele.subName),
                classType: record.map(ele => this.showClassType(ele.classType))
            }
        // }
        return this.renderLine(obj);
    }
    showClassType = (classType) => {
        const TYPE = {
            1: '行政班',
            2: '选修班',
            3: '走班',
        }
        return TYPE[classType];
    }
    renderLine = ({ indexName, classTime, subName, classType }) => {
        return <div className={style['lineStyle']}>
            <span className={style['indexName']}>{indexName}</span>
            <span className={`${style['classTime']} ${style['mutiLine']}`}>{
                    classTime.map(ele =>
                        <span key={ele}>{ele}</span>
                    )
            }</span>
            <span className={`${style['subName']} ${style['mutiLine']}`}>
                {
                    subName.map(ele =>
                        <span className={style['subName-words']} key={ele}>{ele}</span>
                    )
                }
            </span>
            <span className={`${style['classType']} ${style['mutiLine']}`}>
                {
                    classType.map(ele =>
                        <span key={ele}>{ele}</span>
                    )
                }
            </span>
        </div>
    }
    render() {
        const { tableData } = this.state;
        return (
            <div className={style['tableContent']}>
                <ul>
                    {
                        Object.keys(tableData).map((ele) => 
                            this.renderTableLine(ele)
                        )
                    }
                </ul>
            </div>
        );
    }
}
TableMain.defaultProps = {};
TableMain.propTypes = {};
// PropTypes.array
// PropTypes.bool
// PropTypes.func
// PropTypes.number
// PropTypes.object
// PropTypes.string
// PropTypes.oneOf(['a', 'b'])
