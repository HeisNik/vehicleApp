const { RESTDataSource} = require('@apollo/datasource-rest')

class VehicleAPI  extends RESTDataSource{

  constructor() {
    super()
    this.baseURL = 'http://localhost:5001/'
  }

  async getVehicles() {
    const { data } = await this.get(`/api/vehicles`)
    return data
  }
  async getVehicleById(id) {
    const { data } = await this.get(`api/vehicles/${id}`)
    console.log('data', data)
    return data
  }
  async createVehicle(vehicle) {
    const { data } = await this.post(`/api/vehicles/?user=7ec3dfed-b18a-48ff-969d-6f415fab8f9a`, vehicle)
    console.log('Created vehicle:', data)
    return data
  }
  async updateVehicle({id}) {
    const { data } = await this.put(`/api/vehicles/${id}`)
    return data
  }
  async deleteVehicle({id}) {
    const { data } = await this.delete(`/api/vehicles/${id}`)
    return data
  }
}

module.exports = VehicleAPI

