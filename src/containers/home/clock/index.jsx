import React,{Component} from 'react';
import styles from './index.scss';

class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            now: null,
        };
    }

    getClock =()=>{
        const date = new Date();
        const hours = date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
        const minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
        const year = date.getFullYear();
        const month = date.getMonth() < 9 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
        const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
        const week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        this.setState({
            now: {
                time: hours + ':' + minutes,
                fullDate: year + '-' + month + '-' + day,
                week : week[date.getDay()],
            }
        });
    }

    componentDidMount(){
        this.getClock();
    }

    componentDidUpdate(){
        // this.clockInterval = setInterval(()=>{
        //     this.getClock();
        // }, 60000);
    }

    componentWillUnmount(){
        clearInterval(this.clockInterval);
    }

    render(){
        const { now } = this.state;
        const clock = (
            <div className={styles['clock']}>
                <div className={styles['time']}>{ now ? now.time : '' }</div>
                <div className={styles['extra-time']}>
                    <p>{ now ? now.fullDate : '' }</p>
                    <p>{ now ? now.week : '' }</p>
                </div>
            </div>
        )
        return clock;
    }
}

export default Clock;