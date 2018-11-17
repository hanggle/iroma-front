import { asyncRouterMap, constantRouterMap, allRouterMap } from '@/router'
import { getMenu } from '@/api/permission'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      if (tmp.path === '/system') {
        const data = '1234224123412'
        let menus = 1
        getMenu(data).then(response => {
          console.log(response.data)
          menus = response.data

          const data2 = menus[0].id
          console.log(data2)
          getMenu(data2).then(response => {
            console.log(response.data)
          })
        })
        const menu = {}
        let pat = ''
        console.log(menus)
        for (var i = 0; i < menus.length; i++) {
          if (menu.id === '1000000000000000001') {
            pat = menu.component
          }
        }
        console.log(tmp.children[0].component)
        menu.meta = { title: 'person' }
        menu.component = () => import('@/views/' + pat)
        menu.component = allRouterMap[0].component
        menu.path = 'person'
        tmp.children.push(menu)
        console.log(menu.component)
        console.log(tmp.children)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admins')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
