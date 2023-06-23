const initApp = async () => {
    const url = 'https://jsonplacehoder.tyicode.com/todos/1'

    // Level 2
    // const getTodo = async (url) => {
    //     return await fetch(url)
    // }

    // Level 3
    const getTodo = async (url) => {
        return (await fetch(url)).json()
    }

    const btn_getList = document.querySelector('button')

    if (btn_getList) {
        btn_getList.addEventListener('click', async () => {
            // Cach 1 - Level 1
            // fetch(url)
            // .then(response => response.json)
            // .then(data => console.log(data))
            // .catch(err => console.log(err))
    
            // Cach 2 - Levle 2
            // const todos = await getTodo(url)
            // const data = await todos.json()

            // Level 3
            const {title} = await getTodo(url)
            
            console.log(title)
        })
    }
}

document.addEventListener('DOMContentLoaded', initApp())