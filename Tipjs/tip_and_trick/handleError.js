function request(type) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            type === 'a' ? resolve('resolve') : reject('reject')
        }, 2000)
    })
}

async function getData() {
    // Level 1
    // try {
    //     let ret1 = await request('a')
    // } catch (error) {
    //     //todo
    //     console.error(`Error ret1::`, error)
    // }

    // try {
    //     let ret2 = await request('b')
    // } catch (error) {
    //     //todo
    //     console.error(`Error ret2::`, error)
    // }

    // try {
    //     let ret3 = await request('c')
    // } catch (error) {
    //     //todo
    //     console.error(`Error ret3::`, error)
    // }

    // Level 2
    // let ret1 = await request('a').then(res => console.log(res)).catch(err => console.log(`Error ret1::`, err))
    // let ret2 = await request('b').then(res => console.log(res)).catch(err => console.log(`Error ret2::`, err))
    // let ret3 = await request('c').then(res => console.log(res)).catch(err => console.log(`Error ret3::`, err))

    // Level 3
    let err, result

    [err, result] = await handleRequest(request('a'))

    if (err) {
        console.log(`Error ret1::`, err)
    }

    [err, result] = await handleRequest(request('b'))

    if (err) {
        console.log(`Error ret2::`, err)
    }

    [err, result] = await handleRequest(request('c'))

    if (err) {
        console.log(`Error ret3::`, err)
    }
}

const handleRequest = (promise) => {
    return promise.then(data => ([undefined, data]))
        .catch(err => ([err, undefined]))
}

getData()
