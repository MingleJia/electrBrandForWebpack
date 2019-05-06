import React, { Component, Fragment } from 'react';
import styles from './StuStyleCarousel.scss';
import { Carousel } from 'antd-mobile';
import noImg from '../../assets/campusstyle/no-img.png';
/**
 * styleType: 选择轮播图的样式 1张展示content1  2张展示content2  content4   content6  type:String
 */
class StuStyleCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,//当前第几张
    }
  }

  componentDidMount() {

  }
  specialCss(styleType, idx) {
    if (styleType == 'content4') {
      if(idx % 2 == 0){
        return {
          marginLeft:'0.28rem'
        }
      }else {
        return {
          marginLeft:'0.2rem'
        }
      }
    }
    
    return {}
  }
  render() {

    return <Fragment>
      <div className={styles[this.props.styleType]} style={this.specialCss(this.props.styleType,this.props.idx)} >
      {/* <div
        className={styles['content4']}
        style={this.specialCss('content4',this.props.idx)}> */}

        {
          this.props.images.length > 1
            ?
            <Carousel
              autoplay={false}
              infinite
              selectedIndex={0}
              autoplayInterval={3000}
              dotStyle={{
                backgroundColor: 'white'
              }}
              dotActiveStyle={{
                width: '12px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'white'
              }}
            >
              {
                this.props.images.map((item, index) => <div key={index} className={styles['v-item']}>
                  {/* <img className={styles['img']} alt="example" src={item.image} /> */}
                  <img className={styles['img']} alt="example" src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'} />
                </div>)
              }
              {/* <div className={styles['v-item']}><img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /></div>
          <div className={styles['v-item']}><img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /></div> */}
            </Carousel>
            :
            <div className={styles['no-img-wrap']}>
              <img className={styles['no-img']} alt="example" src={noImg} />
              <p className={styles['no-img-word']}>暂无图片</p>
            </div>
        }

        <div className={styles['textWrap']}>
          <p className={styles['textTitle']}>{this.props.title || ''}</p>
          <span className={styles['text']}>{this.props.desc || ''}</span>
        </div>
      </div>
    </Fragment>;
  }
}

export default StuStyleCarousel;
StuStyleCarousel.defaultProps = {};
StuStyleCarousel.propTypes = function () { };
StuStyleCarousel.propTypes = {};