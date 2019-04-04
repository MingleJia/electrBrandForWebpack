import React,{Component} from 'react';
import styles from './index.scss';
import { defaultImg, } from 'ASSETS/campusstyle';
import PropTypes from 'prop-types';
import Tab from 'COMPONENTS/tab';

class CampusStyle extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    static propTypes = {
        history: PropTypes.object,
    }

    //点击更多
    campusMore = () =>{
        this.props.history.push('campusstyle/more');
    }
    //点击内容到校园风采详情页
    campusDetail = () => {
        this.props.history.push('campusstyle/detail');
    }
    render(){
        const campusStyle = (
            <div className={styles['container']}>
                <div className={styles['tab']}>
                    <div className={styles['title']}>校园风采</div>
                    <div className={styles['btnMore']} onClick={ ()=>this.campusMore() }>更多
                        <span className={styles['more']}></span>
                    </div>
                </div>
                <div className={styles['content']} onClick={ ()=>this.campusDetail() }>
                    <div className={styles['imgs']}>
                        <img className={styles['picture']} src={defaultImg}/>
                        <img className={styles['picture']} src={defaultImg}/>
                        <img className={styles['picture']} src={defaultImg}/>
                        <img className={styles['picture']} src={defaultImg}/>
                    </div>
                    <div className={styles['title']}>
                        <span className={styles['titlename']}>关于开展2019年全市学校卫生与健康专项监督检查的通知</span>
                    </div>
                    <div className={styles['detail']}>
                        <p className={styles['text']}>
                        为全面贯彻落实党的十九大精神，深入实施健康中国战略，加强推进教育现代化，持续强化对全市学校（含托幼机构）传染病防控与食堂食品安全监管，有效防控学校传染病疫情和食物中毒等突发公共卫生事件发生，全力保障广大师生生命安全与身体健康，经研究决定在全市学校（含托幼机构）继续开展以学校食堂食品安全、生活饮用水卫生、学校传染病防控、教学及生活环境为主要内容的专项监督检…
                        为全面贯彻落实党的十九大精神，深入实施健康中国战略，加强推进教育现代化，持续强化对全市学校（含托幼机构）传染病防控与食堂食品安全监管，有效防控学校传染病疫情和食物中毒等突发公共卫生事件发生，全力保障广大师生生命安全与身体健康，经研究决定在全市学校（含托幼机构）继续开展以学校食堂食品安全、生活饮用水卫生、学校传染病防控、教学及生活环境为主要内容的专项监督检…
                        </p>
                    </div>
                </div>
                <Tab/>
            </div>
        )
        return campusStyle;
    }
}

export default CampusStyle