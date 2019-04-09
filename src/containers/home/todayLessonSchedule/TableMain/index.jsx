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
        axios('get', '/api/index/schedule').then(json => {
            if (json.code === 1 && json.msg) {
                this.setState({
                    tableData: json.data.todaySchedule,
                })
            }
        })
    }

    renderTableLine = (key,index) => {
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
        return this.renderLine(obj,index);
    }
    showClassType = (classType) => {
        const TYPE = {
            1: '行政班',
            2: '选修班',
            3: '走班',
        }
        return TYPE[classType];
    }
    renderLine = ({ indexName, classTime, subName, classType},index) => {
        return(
            <div className={style['lineStyle']} key={index}>
                <span className={style['indexName']}>{indexName}</span>
                <span className={`${style['classTime']} ${style['mutiLine']}`}>
                    {
                            classTime.map((ele,timeKey) =>
                                <span key={timeKey}>{ele}</span>
                            )
                    }
                </span>
                <span className={`${style['subName']} ${style['mutiLine']}`}>
                    {
                        subName.map((ele,nameKey) =>
                            <span className={style['subName-words']} key={nameKey}>{ele}</span>
                        )
                    }
                </span>
                <span className={`${style['classType']} ${style['mutiLine']}`}>
                    {
                        classType.map((ele,typeKey) =>
                            <span key={typeKey}>{ele === '选修班' ? ele : ''}</span>
                        )
                    }
                </span>
            </div>
        )
    }
    render() {
        const { tableData } = this.state;
        return (
            <div className={style['tableContent']}>
                <ul>
                    {
                        Object.keys(tableData).map((ele,index) => 
                            this.renderTableLine(ele,index)
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
