'use strict';
// C1:
// class AssetGold {
//     buyItem (asset) {
//         console.log(`${asset} buy GOLD`)
//     }
// }

// class AssetCash {
//     buyItem (asset) {
//         console.log(`${asset} buy cash`)
//     }
// }

// class Client {
//     static buy () {
//         const assetGold = new AssetGold()
//         assetGold.buyItem('house')
//         assetGold.buyItem('car')

//         const assetCash = new AssetCash()
//         assetCash.buyItem('stock')
//     }
// }

// Client.buy()


// C2:
class Asset {
    buyItemGold(asset) {
        console.log(`${asset} buy GOLD`)
    }

    buyItemCash(asset) {
        console.log(`${asset} buy cash`)
    }
}

class Client {
    static buy () {
        const asset = new Asset()
        asset.buyItemGold('house')
        asset.buyItemGold('car')
        asset.buyItemCash('stock')
    }
}

Client.buy()
