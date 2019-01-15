import { Message } from 'element-ui'

export function successMsg() {
  Message({
    message: '操作成功',
    type: 'success',
    duration: 5 * 1000
  })
}

export function cancelMsg() {
  Message({
    message: 'cancel!',
    type: 'warning'
  })
}
