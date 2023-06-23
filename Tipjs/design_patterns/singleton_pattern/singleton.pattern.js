'use strict'

class RoundRobin {
    constructor() {
        if (RoundRobin.instance) {
            return RoundRobin.instance
        }
        // console.log(111)
        RoundRobin.instance = this
        this.servers = []
        this.index = 0
    }

    // add server
    addServer(server) {
        this.servers.push(server)
    }

    // get next server 
    getNextServer() {
        if (!this.servers.length) {
            throw new Error('No server available')
        }

        const server = this.servers[this.index]
        // modulus
        this.index = (this.index + 1) % this.servers.length

        return server
    }
}

// modulus
// const numServer = 3
// const userId1 = 100076
// const userId2 = 100077
// const userId3 = 100078
// const userId4 = 100079

// console.log(userId1 % numServer) // Lay so du chinh la Server
// console.log(userId2 % numServer) // Lay so du chinh la Server
// console.log(userId3 % numServer) // Lay so du chinh la Server
// console.log(userId4 % numServer) // Lay so du chinh la Server

const loadBalancer = new RoundRobin()
const loadBalancer1 = new RoundRobin()

// console.log(`compare:: `, loadBalancer === loadBalancer1)

loadBalancer.addServer('Server 01')
loadBalancer.addServer('Server 02')
loadBalancer.addServer('Server 03')

console.log(loadBalancer.getNextServer())
console.log(loadBalancer.getNextServer())
console.log(loadBalancer.getNextServer())
console.log(loadBalancer.getNextServer())
console.log(loadBalancer.getNextServer())