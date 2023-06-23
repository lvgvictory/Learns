// const AGE_REQUIREMENT = 30

// const isOldEnough = user => {
//   console.log(user?.age)
//   console.log(user?.age ?? 0 > AGE_REQUIREMENT)
//   return user?.age ?? 0 > AGE_REQUIREMENT
// }

// isOldEnough({age: 25})
// isOldEnough()

// const isOk = user => {
//   return (
//       user.age > 30 && user.name === 'cr7' && user.blog === 'anonystick.com'
//   )
// }

// if (isOk(user)) {
//   // todo
// }

// const reasonPhraseCode = {
//   '100': 'Continue1',
//   '101': 'Continue2',
//   '200': 'Continue3',
//   '201': 'Continue4',
//   '202': 'Continue5',
//   '203': 'Continue6',
//   '204': 'Continue7',
//   'default': 'Default',
// }

// const returnReasonPhraseCode = (code) => {
//   console.log(reasonPhraseCode[code] || reasonPhraseCode['default'])
// }

// new Map()
const reasonPhraseCode1 = new Map([
  ['100', 'Continue1'],
  ['101', 'Continue2'],
  ['102', 'Continue3'],
  ['200', 'Continue4'],
  ['201', 'Continue5'],
  ['202', 'Continue6'],
  ['203', 'Continue7'],
  ['204', 'Continue8'],
  ['default', 'Default']
])

const returnReasonPhraseCode1 = (code) => {
  console.log(reasonPhraseCode1.get(code) || reasonPhraseCode1.get('default'))
}

returnReasonPhraseCode1('200')
