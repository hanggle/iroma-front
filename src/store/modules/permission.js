import { asyncRouterMap, constantRouterMap, allRouterMap } from '@/router'
import { getMenu } from '@/api/permission'
/* Layout */
import Layout from '@/views/layout/Layout'

/**
 * 动态加载菜单
 * @param roles
 * @param route
 */
function loadMenu(asyncRouterMap, menus) {
  asyncRouterMap = []
  if (menus) {
    // 一级菜单
    for (let i = 0; i < menus.length; i++) {
      const oneLevel = menus[i]
      if (oneLevel.level === 1) {
        const oneMenu = {}
        const oneMeta = {}
        const oneChild = []
        oneMenu.path = oneLevel.path
        oneMenu.component = Layout
        oneMenu.name = oneLevel.name
        oneMeta.title = oneLevel.title
        oneMeta.icon = oneLevel.icon
        oneMenu.meta = oneMeta
        // 二级菜单
        for (let j = 0; j < menus.length; j++) {
          const twoLevel = menus[j]
          if (twoLevel.parentId === oneLevel.id) {
            const twoMenu = {}
            const twoMeta = {}
            const twoChild = []
            twoMenu.path = twoLevel.path
            twoMenu.name = twoLevel.name
            twoMeta.title = twoLevel.title
            twoMeta.icon = twoLevel.icon
            twoMenu.meta = twoMeta
            allRouterMap.forEach(route => {
              if (route.id === twoLevel.id) {
                twoMenu.component = route.component
              }
            })
            // 三级菜单
            for (let z = 0; z < menus.length; z++) {
              const threeLevel = menus[z]
              if (threeLevel.parentId === twoLevel.id) {
                const threeMenu = {}
                const threeMeta = {}
                threeMenu.path = threeLevel.path
                threeMenu.name = threeLevel.name
                threeMeta.title = threeLevel.title
                threeMeta.icon = threeLevel.icon
                threeMenu.meta = threeMeta
                allRouterMap.forEach(route => {
                  if (route.id === threeLevel.id) {
                    threeMenu.component = route.component
                  }
                })
                twoChild.push(threeMenu)
              }
            }
            if (twoChild.length > 0) {
              twoMenu.children = twoChild
            }
            oneChild.push(twoMenu)
          }
        }
        oneMenu.children = oneChild
        asyncRouterMap.push(oneMenu)
      }
    }
  }
  return asyncRouterMap
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
      return new Promise((resolve, reject) => {
        let accessedRouters
        getMenu(data.id).then(response => {
          accessedRouters = loadMenu(asyncRouterMap, response.data)
          commit('SET_ROUTERS', accessedRouters)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission
