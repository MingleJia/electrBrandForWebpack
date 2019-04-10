import React from 'react';
import themeLoader from "UTILS/themeLoader";
import { Link } from 'react-router-dom';
import style from './index.scss';
import TableMain from './TableMain'
import { moreImg } from 'ASSETS/home';
const theme = 'blue';

export default class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeList:[]
        };
    }
    componentDidMount() {
    }
    
    render() {
        return (
            <div className={`${themeLoader(['block', 'notice'], theme, style)}`}>
                <div className={themeLoader(['topLine'], theme, style)}>
                    <span className={style['title']}>通知</span>
                    {
                        this.state.noticeList.length
                        ?
                        <Link to='/noticemore' className={`${style['more']} ${style['linkBtn']}`}>
                            更多<img  className={style['linkIcon']} src={ moreImg }></img>
                        </Link>
                        :
                        <div></div>
                    }
                </div>
                <TableMain changeNoticeList={(noticeList)=>{this.setState({noticeList});}} />
            </div>
        );
    }
}