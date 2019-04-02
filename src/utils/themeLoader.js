const themeLoader = (className ,theme = 'blue', style) => {
    return className.map(ele => {
        const styleName = `${ele}_${theme}`;
        return `${style[styleName]}`
    }).join(' ')
}

export default themeLoader;