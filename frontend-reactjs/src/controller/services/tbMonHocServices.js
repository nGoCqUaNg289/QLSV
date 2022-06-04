
import { Axios } from "./axios"
import { TB_MON_HOC, DATA, HOST_API } from '../api'
import { __DEV__ } from "../../common/ulti/constants";

function getAll(query) {
    query = query ? ('?' + query) : ''
    return Axios('get', `${HOST_API}${DATA}${TB_MON_HOC}${query}`)
}

function create(data) {
    return Axios('post', `${HOST_API}${DATA}${TB_MON_HOC}`, data)
}

function getById(id) {
    return Axios('get', `${HOST_API}${DATA}${TB_MON_HOC}${'/'}${id}`)
}

function updateById(id, data) {
    return Axios('patch', `${HOST_API}${DATA}${TB_MON_HOC}${'/'}${id}`, data)
}

function lockById(id) {
    return Axios('lock', `${HOST_API}${DATA}${TB_MON_HOC}${'/'}${id}`)
}

function deleteById(id) {
    return Axios('delete', `${HOST_API}${DATA}${TB_MON_HOC}${'/'}${id}`)
}

export { getAll, create, getById, updateById, lockById, deleteById }