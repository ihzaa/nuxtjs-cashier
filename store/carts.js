export const state = () => ({
  items: [],
  additionals: [
    {
      title: 'Tax',
      mode: 'percentage',
      value: 10
    },
    {
      title: 'Service Charge',
      mode: 'fix',
      value: 50000
    },
  ]
})

export const getters = {
  cartItems: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.products.find(product => product._id === id)
      return {
        ...product, quantity
      }
    })
  },
  itemTotal: () => (price, quantity) => {
    return price * quantity;
  },
  subTotal: (state, getters, rootState) => {
    return getters.cartItems.reduce((total, item) => {
      return total + getters.itemTotal(item.price, item.quantity);
    }, 0);
  },
  calculatePercentage: (state, getters) => (value) => {
    return getters.subTotal * value / 100;
  },
  sumAdditionals: (state, getters) => {
    if (state.additionals.length) {
      return state.additionals.reduce((total, item) => {
        if (item.mode === "percentage") {
          return total + getters.calculatePercentage(item.value);
        } else return total + item.value;

      }, 0);
    }
  },
  total: (state, getters, rootState) => {
    return getters.subTotal + getters.sumAdditionals;
  },
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
  },
  decrementItem(state, id) {
    let item = state.items.find(item => item.id === id);
    if (item.quantity > 1) {
      item.quantity--;
    }
  },
  removeItem(state, id) {
    let index = state.items.findIndex(item => item.id === id);
    state.items.splice(index, 1);
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
  },
  removeItem({ commit, state }, id) {
    commit('removeItem', id);
  }
}
