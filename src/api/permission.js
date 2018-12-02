import request from '@/utils/request'

export function getMenu(userId) {
  const data = {
    id: userId
  }
  return request({
    url: '/api/menu/list',
    method: 'post',
    data
  })
}

