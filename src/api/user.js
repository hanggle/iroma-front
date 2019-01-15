import request from '@/utils/request'

export function userList(query) {
  return request({
    url: '/api/user/page',
    method: 'post',
    data: query
  })
}
