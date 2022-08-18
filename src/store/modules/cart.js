import {reqgetCartList,reqgetDeleteCart } from "@/api";

const state = {
    cartList: [],
}

const mutations = {
    CARTLIST(state, getCartList) {
        state.cartList = getCartList;
    }
};

const actions = {
    async getCartList({ commit }) {
        const result = await reqgetCartList();
        // console.log(result)
        if (result.code === 200) {
            commit("CARTLIST", result.data)
            return true
        }else {
            return Promise.reject(new Error("failed"));
        }
    },
    async deleteCartById({ commit },id) {
        const result = await reqgetDeleteCart(id);
        // console.log(result)
        if (result.code == 200) {
            commit("CARTLIST", result.data)
            return true
        }else {
            return Promise.reject(new Error("failed"));
        }
    },
    




};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters,
}