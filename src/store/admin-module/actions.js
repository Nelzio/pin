export function getVacancy({ commit }, val) {
    if (val) {
        commit("SET_VACANCY_ID", val)
        this.$router.push("/admin/vacancies/vacancy")
    }
}
