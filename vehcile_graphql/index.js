const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { OwnerAPI, VehicleAPI } = require('./datasources')




const typeDefs = `#graphql
  type Vehicle {
    id: ID!,
    make: String!,
    model: String,
    type: String,
    license_plate: String
    commissioned: Boolean!
  }
  type User {
  id: ID!
  username: String
  name: String
  vehicles: [Vehicle]
  }

   type Query {
    vehicles( _id: ID,
      make: String,
      model: String,
      type: String,
      commissioned: Boolean
      ): [Vehicle]
    vehicleById(id:ID): Vehicle
    users: [User]
  }

  type Mutation {
  createVehicle(make: String!, model: String!, license_plate: String!, commissioned: Boolean): Vehicle
  createUser(name: String!, username: String!): User
  updateVehicle(id: ID!): Vehicle
  deleteVehicle(id: ID!): Vehicle
}
`

const resolvers = {
  Query: {
    vehicles: (_parent, args, { dataSources }) => {
      return dataSources.vehicleApi.getVehicles(args)
    },
    vehicleById: (_parent, { id }, { dataSources }) => {
      return dataSources.vehicleApi.getVehicleById(id)
    },
    users: (_parent, args, { dataSources }) => {
      return dataSources.ownerApi.getUsers(args)
    },
  },
  Mutation: {
    createVehicle: (_parent, { make, model, license_plate, commissioned }, { dataSources }) => {
      return dataSources.vehicleApi.createVehicle({ make, model, license_plate, commissioned })
    },
    updateVehicle: (_parent, { id }, { dataSources }) => {
      return dataSources.vehicleApi.updateVehicle({ id })
    },
    deleteVehicle: (_parent, { id }, { dataSources }) => {
      return dataSources.vehicleApi.deleteVehicle({ id })
    },
    createUser: (_parent, { name, username }, { dataSources }) => {
      return dataSources.ownerApi.createUser({ name, username })
    },
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
})

const start = async () => { 
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        return {
          dataSources: {
            vehicleApi: new VehicleAPI(),
            ownerApi: new OwnerAPI()
          },
        }
      },
    })

    console.log(`🚗 Server ready at ${url}`)
}

start()






