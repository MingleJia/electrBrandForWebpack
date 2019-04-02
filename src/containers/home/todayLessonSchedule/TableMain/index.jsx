import React from 'react';
import axiosRequest from 'UTILS/axios'
import style from './index.scss';

const fetchUrl = 'https://lesson.leke.cn/api/w/getTodaySchedule.htm';
// TODO:
const fetchUrlMock = 'http://192.168.20.146:3000/mock/168/getTodaySchedule';

const data = 
{
    "success":true,
    "message":"eiusmod officia velit",
    "code":"200",
    "ticket":null,
    "jsessionid":null,
    "data":{
        "todaySchedule":{
            "第四节": [
                {
                    "subName":"语文","classType":1,"classTime":"08:00～08:45","indexName":""
                }
            ],
            "第八节":[
                {
                    "subName":"语文",
                    "classType":1,
                    "classTime":"08:00～08:45",
                    "indexName":"adipisicing sit Lorem commodo eiusmod"
                },
            ],
            "第九节":[
                {
                    "subName":"计算机科学",
                    "classType":1,
                    "classTime":"08:00～08:45",
                    "indexName":""
                },
            ],
            "第十一节":[
                {
                    "subName":"语文",
                    "classType":1,
                    "classTime":"08:00～08:45",
                    "indexName":"adipisicing sit Lorem commodo eiusmod"
                },
            ],
            "第十二节":[
                {
                    "subName":"语文",
                    "classType":1,
                    "classTime":"08:00～08:45",
                    "indexName":"adipisicing sit Lorem commodo eiusmod"
                },
            ],
            "第十节":[
                {
                    "subName":"语文",
                    "classType":1,
                    "classTime":"08:00～08:45",
                    "indexName":"adipisicing sit Lorem commodo eiusmod"
                },
            ],
        }
    },
    "currentTime":82978214.86435777
}

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
        // axiosRequest(
        //     'get',
        //     fetchUrlMock,
        // {
        //     data: {
        //         "schoolId":123,"classId":123,"areaId":123
        //     },
        //     ticket: TICKET
        // }
        // ).then(data => {
        //     console.log('data');
            
        // })
        // axiosRequest(
        //     'get',
        //     fetchUrlMock,
        //     {},
        // ).then(data => {
        //     console.log('data', data);
        //     if (data.code === '200' && data.success) {
        //         this.setState({
        //             tableData: data.data.todaySchedule,
        //         })
        //     }
        // })
        this.setState({
            tableData: data.data.todaySchedule
        })
    }
    componentDidUpdate( prevProps, prevState, snapshot ) {
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
