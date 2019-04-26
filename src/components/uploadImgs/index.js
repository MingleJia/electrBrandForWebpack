import React from 'react';
import {deleteImg, cameraIcon} from 'ASSETS/phone'
import styles from './index.scss'
export default class UploadImgs extends React.Component{

    constructor () {
        super();
        this.state = {
            maxImgNum: 5,
            uploadImgs: [
                'https://file.leke.cn/group1/M00/13/1C/wKgURFmDDjaActh9AABi2hBMypg601.jpg',
                'https://file.leke.cn/group1/M00/13/1C/wKgURFmDDjaActh9AABi2hBMypg601.jpg',
                'https://file.leke.cn/group1/M00/13/1C/wKgURFmDDjaActh9AABi2hBMypg601.jpg',
                'https://file.leke.cn/group1/M00/13/1C/wKgURFmDDjaActh9AABi2hBMypg601.jpg',
                'https://file.leke.cn/group1/M00/13/1C/wKgURFmDDjaActh9AABi2hBMypg601.jpg',
            ]
        }
    }

    delImg = (index) => {
        let {uploadImgs} = this.state;
        uploadImgs.splice(index, 1);
        this.setState({uploadImgs})
    }

    render() {
        let {uploadImgs, maxImgNum} = this.state;
        return (
            <div className={styles.wrap}>
                <div className={styles.uploadImgs}>
                {
                    uploadImgs.map((item, index) => {
                        return (
                            <span className={`${styles.imgItem} ${styles.showImg}`} key={index}>
                                <img className={styles.showImgItem} src={item}/>
                                <img className={styles.deleteImg} src={deleteImg} onClick={() => {this.delImg(index)}} />
                            </span>
                        )
                    })
                }
                {
                    uploadImgs.length < maxImgNum ? 
                    <span className={`${styles.imgItem} ${styles.uploadImg}`}>
                        <img src={cameraIcon}/>
                        <p>上传</p>
                    </span> : ''
                }
                
                </div>
                <p className={styles.tips}>可不上传，若要上传最多5张，单张图片不得大于5MB，建议上传横图。</p>
            </div>
        );
    }
}