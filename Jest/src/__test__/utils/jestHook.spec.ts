describe.skip('jest Hook', () => {
  beforeAll(() => {
    console.log('beforeAll')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })

  test.skip('test 1', () => {
    expect(1).toBe(1)
  })

  test('test 1', () => {
    expect(2).toBe(2)
  })

  test.todo(' can pahi test test 3' )

  afterEach(() => {
    console.log('afterEach')
  })

  afterAll(() => {
    console.log('afterAll')
  })
})
