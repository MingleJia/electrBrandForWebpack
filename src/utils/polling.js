
/**
 *  timeout: 延时间隔，毫秒为单位
 *  fn: 轮询执行的函数
 */

class Polling {
    constructor(data) {
        this.flag = true;
        this.data = data;
        // this.loop(data);
    }
    loop = () => {
        const data = this.data;
        const { timeout, fn } = data;
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = undefined;
        }
        fn();
        try {
            this.timer = setTimeout(() => this.loop(data), timeout);
        } catch (err) {
            return ;
        }
    }
    destroy() {
        clearTimeout(this.timer);
        this.timer = undefined;
    }
}
// const P = data => {
//         const { context, timeout, fn } = data;
//         if (context.timer) {
//             clearTimeout(context.timer)
//             context.timer = null;
//         }
//         fn();
//         context.timer = setTimeout(() => polling(data), timeout);
// }
export default Polling;