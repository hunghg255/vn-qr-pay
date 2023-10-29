import { expect, it } from 'vitest'

import { QRProvider, QRProviderGUID } from '../src/constants'
import { decodeQr } from 'src'


it('VietQR', () => {
  const qrContent = '00020101021238530010A0000007270123000697041601092576788590208QRIBFTTA5303704540410005802VN62150811Chuyen tien6304BBB8'
  const qrPay = decodeQr(qrContent)

  expect(qrPay.isValid).toBe(true)
  expect(qrPay.version).toBe('01')
  expect(qrPay.provider.name).toBe(QRProvider.VIETQR)
  expect(qrPay.provider.guid).toBe(QRProviderGUID.VIETQR)
  expect(qrPay.consumer.bankBin).toBe('970416')
  expect(qrPay.consumer.bankNumber).toBe('257678859')
  expect(qrPay.amount).toBe('1000')
})

it('CRC with three-byte', () => {
  const qrContent = '00020101021138580010A000000727012800069704070114190304136010180208QRIBFTTA53037045802VN63040283'
  const qrPay = decodeQr(qrContent)

  expect(qrPay.isValid).toBe(true)
  expect(qrPay.version).toBe('01')
  expect(qrPay.provider.name).toBe(QRProvider.VIETQR)
  expect(qrPay.provider.guid).toBe(QRProviderGUID.VIETQR)
  expect(qrPay.consumer.bankBin).toBe('970407')
  expect(qrPay.consumer.bankNumber).toBe('19030413601018')
})

it('Invalid CRC VietQR ', () => {
  const qrPay = decodeQr('00020101021238530010A0000007270123000697041601092576788590208QRIBFTTA5303704540410005802VN62150811Chuyen tien6304BBB5')
  expect(qrPay.isValid).toBe(false)
})

it('MBBank QR with lowercase CRC', () => {
  const qrContent = '00020101021138540010A00000072701240006970422011003523509170208QRIBFTTA53037045802VN630479db'
  const qrPay = decodeQr(qrContent)
  expect(qrPay.isValid).toBe(true)
  expect(qrPay.version).toBe('01')
  expect(qrPay.provider.name).toBe(QRProvider.VIETQR)
  expect(qrPay.provider.guid).toBe(QRProviderGUID.VIETQR)
  expect(qrPay.consumer.bankBin).toBe('970422')
  expect(qrPay.consumer.bankNumber).toBe('0352350917')
})
