import { expect, it } from 'vitest'

import { encodeVietQr } from "../src/vietqr/encodeVietQr"

it('Gen Code1 ', () => {
  const code = encodeVietQr({
    account: '7868255197',
    bank: 'TECHCOMBANK',
    amount: '1000',
    additionalData: {
      purpose: 'Give Hung a cup of coffe',
    }
  });

  expect(code).toBe('00020101021238540010A00000072701240006970407011078682551970208QRIBFTTA5303704540410005802VN62280824Give Hung a cup of coffe6304BF2C')
})


it('Gen Code', () => {
  const code = encodeVietQr({
    account: '00002608430',
    bank: 'TPBANK',
  });

  expect(code).toBe('00020101021138550010A000000727012500069704230111000026084300208QRIBFTTA5303704540105802VN63045BA5')
})
