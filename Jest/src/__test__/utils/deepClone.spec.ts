import { deppCLone } from "../../app/utils/deppClone"

describe('test suite file deepClone', () => {
  test('test not equal', () => {
    const obj = {
      name: 'dau xanh',
      address: {
        name: 'Ha Noi'
      }
    }

    expect(deppCLone(obj)).not.toBe(obj)
  })

  test('test equal obj', () => {
    const obj = {
      name: 'dau xanh',
      address: {
        name: 'Ha Noi'
      }
    }

    expect(deppCLone(obj)).toEqual({
      name: 'dau xanh',
      address: {
        name: 'Ha Noi'
      }
    })
  })

  test('test error', () => {
    expect(() => {
      deppCLone('dau xanh' as any)
    }).toThrow()
  })

  test('test error 2', () => {
    expect(() => {
      deppCLone('dau xanh' as any)
    }).toThrowError('value must is object')
  })

  test('test error with try catch', () => {
    try {
      deppCLone('dau xanh' as any)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'value must is object')
    }
  })
})
