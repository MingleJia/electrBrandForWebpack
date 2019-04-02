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

        };
    }
    componentDidMount() {
    }
    componentDidUpdate( prevProps, prevState, snapshot ) {
    }
    render() {
        return (
            <div className={`${themeLoader(['block', 'notice'], theme, style)}`}>
                <TopLine />
                <TableMain />
            </div>
        );
    }
}
const TopLine = () =>
<div className={themeLoader(['topLine'], theme, style)}>
    <span className={style['title']}>通知</span>
    <Link to='/schedulemore' className={`${style['more']} ${style['linkBtn']}`}>
        更多<img  className={style['linkIcon']} src={ moreImg }></img>
    </Link>
</div>