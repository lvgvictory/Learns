// without simple factory patter
// const serviceLogistics = (cargoVolume) => {
//     switch (cargoVolume) {
//         case '10':
//             return {
//                 name: 'Truck 10',
//                 doors: 6,
//                 price: '100.000'
//             }  
            
//         case '20':
//             return {
//                 name: 'Truck 20',
//                 doors: 16,
//                 price: '1.000.000'
//             }  
    
//         default:
//             break;
//     }
// }

// console.log(serviceLogistics('20'))

// with simple factory pattern
class ServiceLogistics {
    constructor(doors = 6, price = '100.000', name='Truck 10') {
        this.name = name
        this.doors = doors
        this.doors = price
    }

    static getTransport = (cargoVolume) => {
        switch (cargoVolume) {
            case '10':
                return new ServiceLogistics()

            case '20':
                return new ServiceLogistics(6, '1.000.000', 'Truck 20')
        
            default:
                break;
        }
    }
}

console.log(`Level x:: `, ServiceLogistics.getTransport('10'))
