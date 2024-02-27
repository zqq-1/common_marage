import http from "@/utils/request";

// 请求首页数据
const getData = () => {
    return http.get('/home/getData')
}

const getUser = (params) => {
    return http.get('/user/getUser',params)
}

const addUser = (data) => {
    return http.post('/user/add',data)
}

const editUser = (data) => {
    return http.post('/user/edit',data)
}

const delUser = (data) => {
    return http.post('/user/del',data)
}

const getMenu = (data) => {
    return http.post('/permission/getMenu',data)
}

export {
    getData,
    getUser,
    addUser,
    editUser,
    delUser,
    getMenu
}