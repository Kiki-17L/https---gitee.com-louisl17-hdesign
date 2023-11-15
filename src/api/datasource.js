import httpUtil from '../utils/HttpUtil'

/**
 * TODO:获取所有数据源
 */
export function getAllDataSource() {
  return httpUtil({
    url: '/file/getDataSource',
    method: 'get',
  })
}

/**
 * TODO：保存关系数据源
 */
export function saveDataSource(dsinfo) {
  return httpUtil({
    url: '/file/saveDataSource-mysql',
    method: 'post',
    params: dsinfo,
  })
}

/**
 * TODO: 根据数据源ID删除一个数据源
 */
export function delDataSource(dsID) {
  return httpUtil({
    url: '/file/deletefile',
    method: 'delete',
    params: {
      fileid: dsID,
    },
  })
}

/**
 * TODO：重命名数据源
 */
export function renameDataSource(data) {
  return httpUtil({
    url: '/file/alterFile',
    method: 'get',
    params: data,
  })
}

// 获取所有表
export function getAllTables(ds) {
  return httpUtil({
    url: '/file/getAllTables',
    method: 'get',
    params: {
      dsid: ds,
    },
  })
}

// 测试数据库的连接
export function testConnection(dbinfo) {
  return httpUtil({
    url: '/test-mysql',
    method: 'get',
    params: dbinfo,
  })
}

// 数据预览
export function dataPreview(dsinfo, sqlinfo) {
  return httpUtil({
    url: '/dataPreview',
    method: 'post',
    data: {
      ds: dsinfo,
      sql: sqlinfo,
    },
  })
}

// 保存工作表
export function savePreview(dsinfo, viewtable, sqltext, user) {
  return httpUtil({
    url: '/savePreview',
    method: 'post',
    data: {
      ds: dsinfo,
      view: viewtable,
      sql: sqltext,
      username: user,
    },
  })
}

// 删除工作表
export function deleteViewByID(viewid, user) {
  return httpUtil({
    url: '/deleteViewByID',
    method: 'delete',
    params: {
      id: viewid,
      username: user,
    },
  })
}

//执行sql语句
export function runSql(dsid, sqlwords) {
  return httpUtil({
    url: '/database/executionSQL',
    method: 'post',
    params: {
      dsid,
      sqlwords,
    },
  })
}
