export function getVacancy({ commit }, val) {
    if (val) {
        commit("SET_VACANCY", val)
        this.$router.push("/admin/vacancies/vacancy")
    }
}
