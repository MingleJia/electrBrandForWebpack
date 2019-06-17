import React,{Fragment} from 'react';
import axios from 'UTILS/axios';
import style from './index.scss';
import noClassImg from 'ASSETS/home/class.png';
import Loading from 'COMPONENTS/loading';

export default class TableMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: {},
            loadingLesson: true,
        };
    }
    
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios('get', '/api/index/schedule').then(json => {
            if (json.code === 1 && json.msg) {
                //向外传递tableData
                this.props.changeTableData(json.data.todaySchedule||{});

                // axios('get', '/api/index/schedule')

                this.setState({
                    tableData: json.data.todaySchedule,
                })
            }
        }).then(()=>{
            this.setState({
                loadingLesson: false,
            })
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
                {/* 选修班 */}
                <span className={`${style['subName']} ${style['mutiLine']}`}>
                    {
                        subName.map((ele,nameKey) =>{
                           return  <span className={style['subName-words']} key={nameKey}>
                                {ele}
                                <span className={style['moreClass']}>{classType[nameKey] === '选修班' ? '(' + classType[nameKey] + ')' : ''}</span>
                            </span>
                        }
                        )
                    }
                </span>
                {/* <span className={`${style['classType']} ${style['mutiLine']}`}>
                    {
                        classType.map((ele,typeKey) =>
                            <span key={typeKey}>{ele === '选修班' ? ele : ''}</span>
                        )
                    }
                </span> */}
            </div>
        )
    }
    render() {
        const { tableData,loadingLesson } = this.state;
        const content = (
            <Fragment>
                {
                    Object.keys(tableData).length==0
                    ?
                    <div className={style['noTableData']}>
                        <img className={style['noTableDataImg']} src={noClassImg} alt=""/>
                        <span className={style['noTableDataWord']}>暂无课表</span>
                    </div>
                    :
                    <ul>
                        {
                            Object.keys(tableData).map((ele,index) => 
                            this.renderTableLine(ele,index)
                            )
                        }
                    </ul>
                }
            </Fragment>
        )
        return (
            <div className={style['tableContent']}>
               { loadingLesson ? <Loading/> : content  }
            </div>
        );
    }
}
TableMain.defaultProps = {};
TableMain.propTypes = function(){};
TableMain.propTypes = {};
// PropTypes.array
// PropTypes.bool
// PropTypes.func
// PropTypes.number
// PropTypes.object
// PropTypes.string
// PropTypes.oneOf(['a', 'b'])
