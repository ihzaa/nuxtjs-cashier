export const state = () => ({
  products: [],
  categories: [
    {
      id: false,
      title: 'All',
    },
    {
      id: 1,
      title: 'HP',
    },
    {
      id: 2,
      title: 'Camera',
    },
    {
      id: 3,
      title: 'TV',
    },
  ],
  categoryId: 0,
})

export const mutations = {
  updateCategoryId(state, categoryId) {
    state.categoryId = categoryId;
  },
  updateProducts(state, products) {
    state.products = products;
  }
}

export const actions = {
  updateCategoryId({ commit }, categoryId) {
    commit('updateCategoryId', categoryId);
  },
  fetchProducts({ commit }) {
    return this.$axios.$get('http://localhost:3001/api/products').then(response => {
      commit('updateProducts', response.data);
    })
  }
}
