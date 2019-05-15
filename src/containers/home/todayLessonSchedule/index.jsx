import React from 'react';
import { message } from 'antd';
import style from "./index.scss";
import themeLoader from "UTILS/themeLoader";
import { Link } from 'react-router-dom';
import { moreImg } from 'ASSETS/home';
import TableMain from './TableMain';

const theme = 'blue';
export default class TodayLessonSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData:{},
            loadingLesson: true,
        };
    }
    componentDidMount() {

    }

    jumpMore = (e) => {
        if( window.navigator.onLine === false ){
            e.preventDefault();
            e.stopPropagation();
            message.warning('网络不可用',10);
            message.config({ maxCount:1,});
        }
    }
    render() {
        return (
            <div className={`${themeLoader(['block', 'schedule'], theme, style)}`} style={{backgroundColor:'white',height:'5.72rem'}}>
                <div className={themeLoader(['topLine'], theme, style)}>
                    <span className={style['title']}>今日课表</span>
                    {
                        //如果tableData没有就不显示更多
                        Object.keys(this.state.tableData).length
                            ?
                        <Link to='/schedulemore' className={`${style['more']} ${style['linkBtn']}`} onClick={ this.jumpMore }>
                            更多<img  className={style['linkIcon']} src={ moreImg }></img>
                        </Link>
                            :
                        <div></div>
                    }
                </div>
                <TableMain changeTableData={(tableData,loadingLesson)=>{this.setState({tableData,loadingLesson});}}/>
            </div>
        );
    }
}
TodayLessonSchedule.defaultProps = {};
TodayLessonSchedule.propTypes = {};
