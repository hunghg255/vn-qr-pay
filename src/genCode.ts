
import { AdditionalDataID, BankCode, Banks, FieldID, ProviderFieldID, TBankCode, VietQRConsumerFieldID } from './constants'
import { crc16ccitt } from './crc16'

const DEFAULT_OBJ: any = {
  "provider": {
    "fieldId": "38",
    "guid": "A000000727",
    "name": "VIETQR",
    "service": "QRIBFTTA"
  },
  "consumer": { "bankBin": "970416", "bankNumber": "257678859" },
  "version": "01",
  "initMethod": "12",
  "currency": "704",
  "amount": "1000",
  "nation": "VN",
  "crc": "BBB8",
}

const genCRCCode = (content: string): string => {
  const crcCode: string = crc16ccitt(content).toString(16).toUpperCase()
  return `0000${crcCode}`.slice(-4)
}

const genFieldData = (id?: string, value?: string): string => {
  const fieldId = id ?? ''
  const fieldValue = value ?? ''
  const idLen = fieldId.length
  if (idLen !== 2 || fieldValue.length <= 0) return ''
  const length = `00${fieldValue.length}`.slice(-2)
  return `${fieldId}${length}${fieldValue}`
}

const getBankBin = (bank: TBankCode) => {
  const bankCode = Banks.find((b) => b.code === BankCode[bank]);
  if (!bankCode) return '';

  return bankCode.bin;
}

export const genCodeVietQr = (options: { amount: string, bank: TBankCode, account: string, message?: string }) : string => {
  const version = genFieldData(FieldID.VERSION, DEFAULT_OBJ?.version ?? '01' ?? '')
  const initMethod = genFieldData(FieldID.INIT_METHOD, DEFAULT_OBJ?.initMethod ?? '11' ?? '')

  const guid = genFieldData(ProviderFieldID.GUID, DEFAULT_OBJ?.provider.guid ?? '')

  const bankBin = genFieldData(VietQRConsumerFieldID.BANK_BIN, getBankBin(options.bank) ?? '')
  const bankNumber = genFieldData(VietQRConsumerFieldID.BANK_NUMBER, options.account ?? '')
  let providerDataContent = bankBin + bankNumber;

  const provider = genFieldData(ProviderFieldID.DATA, providerDataContent)
  const service = genFieldData(ProviderFieldID.SERVICE, DEFAULT_OBJ?.provider.service ?? '')
  const providerData = genFieldData(DEFAULT_OBJ?.provider.fieldId, guid + provider + service ?? '')

  const category = genFieldData(FieldID.CATEGORY, DEFAULT_OBJ?.category ?? '')
  const currency = genFieldData(FieldID.CURRENCY, DEFAULT_OBJ?.currency ?? '704' ?? '')
  const amountStr = genFieldData(FieldID.AMOUNT, options?.amount ?? '0')
  const tipAndFeeType = genFieldData(FieldID.TIP_AND_FEE_TYPE, DEFAULT_OBJ?.tipAndFeeType ?? '')
  const tipAndFeeAmount = genFieldData(FieldID.TIP_AND_FEE_AMOUNT, DEFAULT_OBJ?.tipAndFeeAmount ?? '')
  const tipAndFeePercent = genFieldData(FieldID.TIP_AND_FEE_PERCENT, DEFAULT_OBJ?.tipAndFeePercent ?? '')
  const nation = genFieldData(FieldID.NATION, DEFAULT_OBJ?.nation ?? 'VN' ?? '')
  const acquier = genFieldData(FieldID.ACQUIER, DEFAULT_OBJ?.acquier ?? '')
  const city = genFieldData(FieldID.CITY, DEFAULT_OBJ?.city ?? '')
  const zipCode = genFieldData(FieldID.ZIP_CODE, DEFAULT_OBJ?.zipCode ?? '')

  const buildNumber = genFieldData(AdditionalDataID.BILL_NUMBER, DEFAULT_OBJ?.additionalData?.billNumber ?? '')
  const mobileNumber = genFieldData(AdditionalDataID.MOBILE_NUMBER, DEFAULT_OBJ?.additionalData?.mobileNumber ?? '')
  const storeLabel = genFieldData(AdditionalDataID.STORE_LABEL, DEFAULT_OBJ?.additionalData?.store ?? '')
  const loyaltyNumber = genFieldData(AdditionalDataID.LOYALTY_NUMBER, DEFAULT_OBJ?.additionalData?.loyaltyNumber ?? '')
  const reference = genFieldData(AdditionalDataID.REFERENCE_LABEL, DEFAULT_OBJ?.additionalData?.reference ?? '')
  const customerLabel = genFieldData(AdditionalDataID.CUSTOMER_LABEL, DEFAULT_OBJ?.additionalData?.customerLabel ?? '')
  const terminal = genFieldData(AdditionalDataID.TERMINAL_LABEL, DEFAULT_OBJ?.additionalData?.terminal ?? '')
  const purpose = genFieldData(AdditionalDataID.PURPOSE_OF_TRANSACTION, options?.message ?? '')
  const dataRequest = genFieldData(AdditionalDataID.ADDITIONAL_CONSUMER_DATA_REQUEST, DEFAULT_OBJ?.additionalData?.dataRequest ?? '')

  const additionalDataContent = buildNumber + mobileNumber + storeLabel + loyaltyNumber + reference + customerLabel + terminal + purpose + dataRequest
  const additionalData = genFieldData(FieldID.ADDITIONAL_DATA, additionalDataContent)

  const content = `${version}${initMethod}${providerData}${category}${currency}${amountStr}${tipAndFeeType}${tipAndFeeAmount}${tipAndFeePercent}${nation}${acquier}${city}${zipCode}${additionalData}${FieldID.CRC}04`
  const crc = genCRCCode(content)
  return content + crc
}
