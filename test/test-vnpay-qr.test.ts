import { expect, it } from 'vitest'


import { QRProvider, QRProviderGUID } from '../src/constants'
import { decodeQr } from 'src'

it('VNPayQR', () => {
  const qrContent = '00020101021126280010A000000775011001087990425204597753037045802VN5909MYPHAMHER6005HANOI62260311MY PHAM HER0707MPHER0163041C50'
  const qrPay = decodeQr(qrContent)
  expect(qrPay.isValid).toBe(true)
  expect(qrPay.version).toBe('01')
  expect(qrPay.provider.name).toBe(QRProvider.VNPAY)
  expect(qrPay.provider.guid).toBe(QRProviderGUID.VNPAY)
  expect(qrPay.additionalData?.store).toBe('MY PHAM HER')
  expect(qrPay.additionalData?.terminal).toBe('MPHER01')
  expect(qrPay.crc).toBe('1C50')
})

it('VNPayQR 2', () => {
  const qrContent = '00020101021126280010A000000775011001A80187905204549953037045802VN5907SUNFLY16005HaNoi62290313SUNFLY ONLINE0708SUNFLY016304AE6F'
  const qrPay = decodeQr(qrContent)
  expect(qrPay.isValid).toBe(true)
  expect(qrPay.version).toBe('01')
  expect(qrPay.provider.name).toBe(QRProvider.VNPAY)
  expect(qrPay.provider.guid).toBe(QRProviderGUID.VNPAY)
  expect(qrPay.additionalData?.store).toBe('SUNFLY ONLINE')
  expect(qrPay.additionalData?.terminal).toBe('SUNFLY01')
  expect(qrPay.crc).toBe('AE6F')
})

it('Personal VNPayQR', () => {
  const qrPay = decodeQr('00020101021002020103069084010411VNPayWallet071003933571580809Lê Anh Tú09051000010037041107content63042678')
  expect(qrPay.provider).toBeDefined()
  expect(qrPay.isValid).toBe(true)
  expect(qrPay.version).toBe('01')
  expect(qrPay.provider.name).toBe('')
  expect(qrPay.provider.guid).toBe('')
})

it('Invalid CRC VNPayQR', () => {
  const qrPay = decodeQr('00020101021126280010A000000775011001087990425204597753037045802VN5909MYPHAMHER6005HANOI62260311MY PHAM HER0707MPHER0163041C55')
  expect(qrPay.isValid).toBe(false)
})
