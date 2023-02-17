export const state = () => ({
  items: []
})

export const getters = {
  cartItems: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.products.find(product => product.id === id)
      return {
        ...product, quantity
      }
    })
  },
  itemTotal: () => (price, quantity) => {
    return price * quantity;
  }
}

export const mutations = {
  addItem(state, id) {
    state.items.push({
      id: id,
      quantity: 1
    });
  },
  incrementItem(state, id) {
    state.items.find(item => item.id === id).quantity++;
  }
  ,
  decrementItem(state, id) {
    let item = state.items.find(item => item.id === id);
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
}

export const actions = {
  addToCart({ commit, state }, id) {
    const found = state.items.find(item => item.id === id)
    if (found) {
      commit('incrementItem', id);
    } else
      commit('addItem', id);
  },
  decrementItem({ commit, state }, id) {
    commit('decrementItem', id);
  },
  incrementItem({ commit, state }, id) {
    commit('incrementItem', id);
  }
}
