export const state = () => ({
  show: false,
  message: '',
  color: ''
})

export const mutations = {
  set(state, { show, message, color }) {
    state.show = show
    state.message = message
    state.color = color
  }
}
