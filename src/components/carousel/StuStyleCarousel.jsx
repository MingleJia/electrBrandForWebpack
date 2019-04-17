import React, { Component, Fragment } from 'react';
import styles from './StuStyleCarousel.scss';
import { Carousel } from 'antd-mobile';
class StuStyleCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: 0,//当前第几张
    }
  }

  componentDidMount() {

  }

  render() {

    return <Fragment>
      <div className={styles['content4']} >
              <Carousel
                autoplay={false}
                infinite
                selectedIndex={0}
                autoplayInterval={3000}
              >
                <div className={styles['v-item']}><img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /></div>
                <div className={styles['v-item']}><img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /></div>
                <div className={styles['v-item']}><img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" /></div>
              </Carousel>
              <div className={styles['textWrap']}>
                  <p className={styles['textTitle']}>安身的地方阿三阿三阿三的</p>
                  <span className={styles['text']}>asdfsdf sdfs dfs dfsd fsdf sdf sasdfsdf sdfs dfs dfsd fsdf sdasdfsdf sdfs dfs dfsd fsdf sdasdfsdf sdfs dfs dfsd fsdf sdasdfsdf sdfs dfs dfsd fsdf sddf sdf23344444 sdffffffffffffffffffffffffffffffffffffffffffsdfdfsfdgdfgdf ghdfghg dfghdfgh dfgh dfgh dfgh dfg hdfgh f </span>
              </div>
      </div>
    </Fragment>;
  }
}

export default StuStyleCarousel;