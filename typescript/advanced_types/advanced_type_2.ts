type Colors = 'red'|'blue'|'green'

// type Test = 1|2

// let a: Colors = "blue"
// let b:Colors = "green"


// // Chuyển đổi type Arr sang union type
// type Arr = [0,1,2,3,4,5,6]

// type UnionArr = Arr[number]

// Record chuyển union type sang làm key của 1 type nào đó
type RGB = Record<Colors, number>

type RecordFake<UnionType extends string, ValueType = string> = {
  [Key in UnionType]: ValueType
}

// type ABC = {
//   [key: string]: string
// }

// let abc = {
//   123: 1
// }

// // type RGB = RecordFake<Colors>

// type User = {
//   name: string
//   company: {
//     address: string
//   }
// }

// type Company = User['company']

// let company: Company = {
//   address: '123'
// }


// chuyển đổi dữ liệu sang kiểu type 
// let test111 = {
//   name: 'asda',
//   age: 18
// }

// type UserFake = typeof test111

// enum test222 {
//   name = 'asda',
//   age = 18
// }

// type UserFake = {
//   [Key in keyof typeof test222]: string
// }

// type User = {
//   name: string
//   company: {
//     address: string
//   }
// }

// type Test = keyof User // bien tat ca cac key sang union type 'name' | 'company'
// // let a: Test = "company"

// type UserNumber = RecordFake<keyof User, string>

// enum testEnum {
//   name = 'asda',
//   age = 18
// }

// type TypeKey = keyof typeof testEnum

// type testType = RecordFake<TypeKey, string>

type MaximunColor = 256

type ComputedRange<N extends number, Result extends Array<unknown> = []> = (
  Result['length'] extends N
    ? Result
    : ComputedRange<N, [...Result, Result['length']]>
)

type FromZeroTo256 = ComputedRange<MaximunColor>[number]

// type RGB = {
//   [Key in Colors]: FromZeroTo256
// }

// const fruit = {
//   apple: 1,
//   banana: 3
// }

// type FruitCount = {
//   [Key in keyof typeof fruit]: {
//     [K2 in Key]: number
//   }
// }[keyof typeof fruit]

// type Banana = FruitCount['banana']

// type Test = `${string}-${number}`
// type Test = `${Colors}-${FromZeroTo256}`

// let a: Test = 'red-0'

// &

// type Name = {
//   name: string
// }

// type Age = {
//   age: number
// }

// type User = Name & Age

// type Entity = {
//   type: 'user'
// } | {
//   type: 'post'
// } | {
//   type: 'comment'
// }

// type EntityId = {
//   [EntityType in Entity['type']]: {
//     type: EntityType,
//   } & {
//     [key in `${EntityType}Id`]: number
//   }
// }[Entity['type']]

// const entity123: EntityId = {
//   type: "comment",
//   commentId: 1
// }

// let aaaaa = {
//   name: 'aaaa',
//   age: 18,
//   company: {
//     address: 'asda'
//   }
// }

// function pickValue<Obj, FirstKey extends keyof Obj>(obj: Obj, firstKey: FirstKey): Obj[FirstKey] {
//   return obj[firstKey]
// }

// const abc = pickValue(aaaaa, 'company')
// console.log(abc)

// Pick, Omit

// let aaaaa = {
//   name: 'aaaa',
//   age: 18,
//   company: {
//     address: 'asda'
//   }
// }

// function removeKey<Obj, FirstKey extends keyof Obj>(obj: Obj, firstKey: FirstKey): Omit<Obj, FirstKey> {
//   delete obj[firstKey]

//   return obj
// }

// let test = removeKey(aaaaa, 'company')

// function removeKeys<Obj, FirstKey extends keyof Obj>(obj: Obj, ...keys: FirstKey[]): Omit<Obj, FirstKey> {
//   keys.forEach(key => delete obj[key])

//   return obj
// }


// Awaited, infer: kieu du lieu suy ra ben trong Promise (lay thanh phan ban trong)

type Name = {
  name: string
}

// type PickPromise<Obj> = Obj extends Promise<infer R> ? R : never

// type Test = PickPromise<Promise<Name>>

// Partial

type Par<Obj> = {
  [key in keyof Obj]?: Obj[key]
}

type Test1 = Par<Name>

// Required

type Requiredd<Obj> = {
  [key in keyof Obj]-?: Obj[key]
}

// ReturnType

type ReturnTypeTest<T> = T extends (...args: any[]) => infer R ? R : never

type Test = ReturnTypeTest<typeof setInterval>