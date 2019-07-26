import Mock from 'mockjs'
import requestParam from '../common/request-param'

const List = []
const count = 12

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: i,
    loginName: '@name()',
    userName: '@first',
    enabled: true,
    lastPasswordResetDate: +Mock.Random.date('T')
  }))
}

export default [
  // system user
  {
    url: '/sys/user',
    type: 'get',
    response: config => {
      return requestParam.handleResponsePage(config, List)
    }
  },
  {
    url: '/sys/user/list',
    type: 'get',
    response: config => {
      return requestParam.handleResponseContent(List)
    }
  },
  {
    url: '/sys/user/1',
    type: 'get',
    response: config => {
      return requestParam.handleResponseContent(List[1])
    }
  },
  {
    url: '/sys/user',
    type: 'post',
    response: config => {
      return requestParam.handleResponsePage(config, List)
    }
  },
  {
    url: '/sys/user',
    type: 'put',
    response: config => {
      return requestParam.handleResponsePage(config, List)
    }
  },
  {
    url: '/sys/user',
    type: 'delete',
    response: config => {
      return requestParam.handleResponsePage(config, List)
    }
  }
]
