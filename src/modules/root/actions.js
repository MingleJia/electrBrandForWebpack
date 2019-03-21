export const classId = 'classId';	   // 班级
export const studentList = 'studentList';	// 学生列表
export const checkedStudent = 'checkedStudent';	// 左侧列表选中的学生数组
export const groupsInfo = 'groupsInfo';	// 班级分组数量,班级未分组人数
export const groups = 'groups';	// 班级各分组信息
export const updateGroupId = 'updateGroupId';	// 正在编辑的分组

function action(type, info = {}){
	return { type, ...info };
}

export const setClassId = (info) => action(classId, info);
export const setStudentList = (info) => action(studentList, info);
export const setCheckedStudent = (info) => action(checkedStudent, info);
export const setGroupsInfo = (info) => action(groupsInfo, info);
export const setGroups = (info) => action(groups, info);
export const setUpdateGroupId = (info) => action(updateGroupId, info);