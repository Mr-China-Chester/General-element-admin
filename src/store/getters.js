const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  allUrl: state => state.user.allUrl,
  table_text: state => state.user.table_text,
  allUrl_suffix: state => state.user.allUrl_suffix,
  version: state => state.user.version,
}
export default getters
