// đóng để sử đổi, mở để mở rộng chức năng
class Socket {
    constructor() {
        this.devices = [];
    }

    addDevices(device) {
        this.devices.push(device);
    }

    activate() {
        this.devices.forEach(device => {
            device.connect()
        })
    }
}

class Tivi {
    connect() {
        console.log(`Tivi connected`)
    }
}

class Fridge {
    connect() {
        console.log(`Fridge connected`)
    }
}

class Fan {
    connect() {
        console.log(`Fan connected`)
    }
}
// Test
const socket = new Socket()
// add
socket.addDevices(new Tivi())
socket.addDevices(new Fridge())
socket.addDevices(new Fan())
// Run
socket.activate()

