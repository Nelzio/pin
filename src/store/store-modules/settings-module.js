
const state = {
    isConected: false, //verifica se está conectado á internet
}

const mutations = {
    setIsConected (state, val) {
        state.isConected = val
    }

}

const getters = {


}

const actions = {

    setIsConected ({commit}, val) {
        commit('setIsConected', val)
        console.log('Conection received:', val)
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}