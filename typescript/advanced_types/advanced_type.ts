// type CallbackForEach = (item: any, index: number) => void

// type Constructor = new (...args: any[]) => any

// type Constructor = {
//   new(): any
// }

// interface Test {
//   services: Constructor[],
//   controller: Constructor[],
// }

// Generic
// interface User {
//   name: string,
//   age: number
// }

// interface Company {
//   address: string
// }

// let a: Company = {
//   address: 'tokyo'
// }

// interface GiaoVien extends User {
//   maGV: string
// }

// const gv: GiaoVien = {
//   maGV: '1',
//   name: 'a',
//   age: 18
// }

// //extends: phai la (Kiem tra kieu du lieu)
// function deepClone<T extends User>(obj: T): T {
//   return JSON.parse(JSON.stringify(obj))
// }

// const test = deepClone(gv);

// // console.log(test)

// // let arr: Array<number> = [1, 2, 3]


// // checktype
// type CheckUser<T> = T extends User ? T : T extends number ? number: never

// type Test = CheckUser<Company>

// function test123<T>(arg: CheckUser<T>) {

// }

// test123(gv)

// // Union type

// unknown:


type StringOrNumber = string | number
let arr: StringOrNumber[] = []

function store(item: string | number) {
  arr.push(item)
}

store(123)

// class Arr1<T> {
//   forEach(callback: (item: T, index: Object) => void) {

//   }
// }