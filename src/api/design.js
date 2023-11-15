import httpUtil from '../utils/HttpUtil'

// 保存仪表盘
export function save(formdata) {
  return httpUtil({
    url: 'dashboard/save',
    method: 'post',
    data: formdata,
  })
}

// 获取所有项目
export function getAllProjects() {
  return httpUtil({
    url: 'project/getAllProject',
    method: 'get',
  })
}

// 创建一个项目
export function createProject(project) {
  return httpUtil({
    url: 'dashboard/createProject',
    method: 'post',
    data: project,
  })
}
