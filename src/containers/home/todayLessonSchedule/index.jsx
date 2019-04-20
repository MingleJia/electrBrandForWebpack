import React from 'react';
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
            loading: true,
        };
    }
    componentDidMount() {

    }
    render() {
        return (
            <div className={`${themeLoader(['block', 'schedule'], theme, style)}`}>
                <div className={themeLoader(['topLine'], theme, style)}>
                    <span className={style['title']}>今日课表</span>
                    {
                        //如果tableData没有就不显示更多
                        Object.keys(this.state.tableData).length
                            ?
                        <Link to='/schedulemore' className={`${style['more']} ${style['linkBtn']}`}>
                            更多<img  className={style['linkIcon']} src={ moreImg }></img>
                        </Link>
                            :
                        <div></div>
                    }
                </div>
                <TableMain changeTableData={(tableData,loading)=>{this.setState({tableData,loading});}}/>
            </div>
        );
    }
}
TodayLessonSchedule.defaultProps = {};
TodayLessonSchedule.propTypes = {};
