const state = {
    filter: { title: null, filters: [], year: null, range: [], currentPage: 1, perPage: 5, order: "DESC" },
    jurisprudences: [],
    legislations: []
}

const mutations = {
    setFilterList(state, filter) {
        state.filter = filter;
    },
    setJurisprudenceSearchResult(state, jurisprudences) {
        state.jurisprudences = jurisprudences;
    },
    setLegislationSearchResult(state, legislations) {
        state.legislations = legislations;
    }
}

const actions = {
    setFilterList({ commit }, filter) {
        commit('setFilterList', filter);
    },
    setJurisprudenceSearchResult({ commit }, jurisprudences) {
        commit('setJurisprudenceSearchResult', jurisprudences);
    },
    setLegislationSearchResult({ commit }, legislations) {
        commit('setLegislationSearchResult', legislations);
    },
}

const getters = {
    getFilterList(state) {
        return state.filter;
    },
    getJurisprudenceSearchResult(state) {
        return state.jurisprudences;
    },
    getLegislationSearchResult(state) {
        return state.legislations;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}