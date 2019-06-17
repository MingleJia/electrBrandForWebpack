import React from 'react';
import { message } from 'antd';
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
            noticeList:[],
            loadingnotice: true,
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
            <div className={`${themeLoader(['block', 'notice'], theme, style)}`} style={{backgroundColor:'white'}}>
                <div className={themeLoader(['topLine'], theme, style)}>
                    <span className={style['title']}>通知</span>
                    {
                        this.state.noticeList.length
                        ?
                        <Link to='/noticemore' className={`${style['more']} ${style['linkBtn']}`}  onClick={ this.jumpMore }>
                            <span>更多</span><img  className={style['linkIcon']} src={ moreImg }></img>
                        </Link>
                        :
                        <div></div>
                    }
                </div>
                <TableMain changeNoticeList={(noticeList,loadingnotice)=>{this.setState({noticeList,loadingnotice});}} />
            </div>
        );
    }
}