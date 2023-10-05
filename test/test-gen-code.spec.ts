import { genCodeVietQr } from "../src/genCode"

test('Gen Code1 ', () => {
  const code = genCodeVietQr({
    account: '7868255197',
    bank: 'TECHCOMBANK',
    amount: '1000',
    message: 'Give Hung a cup of coffe'
  });

  expect(code).toBe('00020101021238530010A0000007270123000697040701097868255190208QRIBFTTA530370454061000005802VN62270823Chuyen tien ne cho hung63047602')
})


test('Gen Code', () => {
  const code = genCodeVietQr({
    account: '00002608430',
    bank: 'TPBANK',
    amount: '100000'
  });

  expect(code).toBe('00020101021238550010A000000727012500069704230111000026084300208QRIBFTTA530370454061000005802VN63043BAF')
})
