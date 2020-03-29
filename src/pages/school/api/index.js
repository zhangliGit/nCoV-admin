import homeApi from './home'
import schoolApi from './school'
import deviceApi from './device'

const apiList = {
  ...homeApi,
  ...schoolApi,
  ...deviceApi
}
export default apiList
