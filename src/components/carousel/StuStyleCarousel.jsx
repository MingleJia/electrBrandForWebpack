import React, { Component, Fragment } from 'react';
import styles from './StuStyleCarousel.scss';
import { Card } from 'antd';
import { Carousel, WingBlank } from 'antd-mobile';
const { Meta } = Card;
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
      <div className={styles['content']} >
        <WingBlank>
          <Card
            hoverable
            bordered
            style={{ width: '5rem', borderRadius: '0.1rem' }}
            cover={
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
            }
          >
            <Meta
              description="www.cnstrong.com"
            />
          </Card>

        </WingBlank>
      </div>
    </Fragment>;
  }
}

export default StuStyleCarousel;