import router from "@/router"
import Cookies from "js-cookie"
export default {
    state: {
        isCollapse: false, // 控制菜单打开还是收起
        tabsList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ], //面包屑数据
        menu: [], // 菜单数据
    },
    mutations: {
        // 修改菜单收起
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        changeTabs(state, value) {
            if (value.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === value.name)
                if (index == '-1') {
                    state.tabsList.push(value)
                }
            }
        },
        // 删除面包屑
        closeTag(state, i) {
            const index = state.tabsList.findIndex(item => item.name === i.name)
            state.tabsList.splice(index, 1)
        },
        // menu 的数据
        setMenu(state, route) {
            state.menu = route
            Cookies.set('menu', JSON.stringify(route))
        },
        // 动态注册路由
        addMenu(state, rout) {
            if (!Cookies.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookies.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log(menuArray);
            menuArray.forEach(item=>{
                router.addRoute('Main',item)
            })
        }
    }
}