import { toNonAccentVietnamese } from "../../app/utils/vietnameseNonAccent";

describe('test suite file vietnameseNonAccent', () => {
    test('english only', () => {
        expect(toNonAccentVietnamese('hello')).toBe('hello');
    })

    test('has character Viet Nam', () => {
        expect(toNonAccentVietnamese('xin chào tiếng việt')).toBe('xin chao tieng viet');
    })
})
