const { RESTDataSource} = require('@apollo/datasource-rest')

class OwnerAPI extends RESTDataSource {

  constructor() {
    super()
    this.baseURL = 'http://localhost:5001/'
  }
  async getUsers() {
    const { data } = await this.get(`api/users`) 
    return data
  }
  async createUser(user) {
    console.log('user', user)
    const { data } = await this.post(`/api/users`, user)
    console.log('Created user:', data)
    return data
  }
}
module.exports = OwnerAPI