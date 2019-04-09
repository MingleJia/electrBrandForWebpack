export const userInfo = 'userInfo';	   // 用户信息(通过登录成功后获取)
export const campusStyle = 'campusStyle';	   // 校园风采点击查看详情

function action(type, info = {}){
	return { type, ...info };
}

export const setUserInfo = (info) => action(userInfo, info);
export const setCampusStyle = (info) => action(campusStyle, info);