import { AdditionalDataID, FieldID, ProviderFieldID, QRProvider, QRProviderGUID, VietQRConsumerFieldID } from "./constants"
import { genCRCCode } from "./utilts"

const sliceContent = (content: string): { id: string, length: number, value: string, nextValue: string }  => {
  const id = content.slice(0, 2)
  const length = Number(content.slice(2, 4))
  const value = content.slice(4, 4 + length)
  const nextValue = content.slice(4 + length)
  return { id, length, value, nextValue }
}

const parseVietQRConsumer = (content: string, dataParser: any): void => {
  const { id, value, nextValue } = sliceContent(content)
  switch (id) {
    case VietQRConsumerFieldID.BANK_BIN:
      dataParser.consumer.bankBin = value
      break
    case VietQRConsumerFieldID.BANK_NUMBER:
      dataParser.consumer.bankNumber = value
      break
    default:
      break
  }
  if (nextValue.length > 4) parseVietQRConsumer(nextValue, dataParser)
}

const parseProviderInfo = (content: string, dataParser: any): void => {
  const { id, value, nextValue } = sliceContent(content);

  switch (id) {
    case ProviderFieldID.GUID:
      dataParser.provider.guid = value
      break
    case ProviderFieldID.DATA:
      if (dataParser.provider.guid === QRProviderGUID.VNPAY) {
        dataParser.provider.name = QRProvider.VNPAY
        dataParser.acquier.id = value
      } else if (dataParser.provider.guid === QRProviderGUID.VIETQR) {
        dataParser.provider.name = QRProvider.VIETQR
        parseVietQRConsumer(value, dataParser)
      }
      break
    case ProviderFieldID.SERVICE:
      dataParser.provider.service = value
      break
    default:
      break
  }
  if (nextValue.length > 4) parseProviderInfo(nextValue, dataParser)
}

const parseAdditionalData = (content: string, dataParser: any): void => {
  const { id, value, nextValue } = sliceContent(content)

  switch (id) {
    case AdditionalDataID.PURPOSE_OF_TRANSACTION:
      dataParser.additionalData.purpose = value
      break
    case AdditionalDataID.BILL_NUMBER:
      dataParser.additionalData.billNumber = value
      break
    case AdditionalDataID.MOBILE_NUMBER:
      dataParser.additionalData.mobileNumber = value
      break
    case AdditionalDataID.REFERENCE_LABEL:
      dataParser.additionalData.reference = value
      break
    case AdditionalDataID.STORE_LABEL:
      dataParser.additionalData.store = value
      break
    case AdditionalDataID.TERMINAL_LABEL:
      dataParser.additionalData.terminal = value
      break
    case AdditionalDataID.LOYALTY_NUMBER:
      dataParser.additionalData.loyaltyNumber = value
      break
    case AdditionalDataID.CUSTOMER_LABEL:
      dataParser.additionalData.customerLabel = value
      break
    case AdditionalDataID.ADDITIONAL_CONSUMER_DATA_REQUEST:
      dataParser.additionalData.dataRequest = value
      break
    default:
      break
  }
  if (nextValue.length > 4) parseAdditionalData(nextValue, dataParser)
}

const parseRootContent = (content: string, dataParser: any): void => {
  const { id, length, value, nextValue } = sliceContent(content)

  if (value.length !== length) {
    dataParser.isValid = false;
    return;
  }

  switch (id) {
    case FieldID.VERSION:
      dataParser.version = value
      break
    case FieldID.INIT_METHOD:
      dataParser.initMethod = value
      break
    case FieldID.VIETQR:
    case FieldID.VNPAYQR:
      dataParser.provider.fieldId = id
      parseProviderInfo(value, dataParser)
      break
    case FieldID.CATEGORY:
      dataParser.category = value
      break
    case FieldID.CURRENCY:
      dataParser.currency = value
      break
    case FieldID.AMOUNT:
      dataParser.amount = value
      break
    case FieldID.TIP_AND_FEE_TYPE:
      dataParser.tipAndFeeType = value
      break
    case FieldID.TIP_AND_FEE_AMOUNT:
      dataParser.tipAndFeeAmount = value
      break
    case FieldID.TIP_AND_FEE_PERCENT:
      dataParser.tipAndFeePercent = value
      break
    case FieldID.NATION:
      dataParser.nation = value
      break
    case FieldID.ACQUIER_NAME:
      dataParser.acquier.name = value
      break
    case FieldID.CITY:
      dataParser.city = value
      break
    case FieldID.ZIP_CODE:
      dataParser.zipCode = value
      break
    case FieldID.ADDITIONAL_DATA:
      parseAdditionalData(value, dataParser)
      break
    case FieldID.CRC:
      dataParser.crc = value
      break
    default:
      break
  }

  if (nextValue.length > 4) parseRootContent(nextValue, dataParser)
}

const verifyCRC = (content: string): boolean => {
  const checkContent = content.slice(0, -4)
  const crcCode = content.slice(-4).toUpperCase()

  const genCrcCode = genCRCCode(checkContent)
  return crcCode === genCrcCode
}

export const decodeQr = (content: string) => {
  const dataParser = {
    isValid: true,
    version: '',
    initMethod: '',
    provider: {
      fieldId: '',
      guid: '',
      name: '',
      service: '',
    },
    consumer: {
      bankBin: '',
      bankNumber: '',
    },
    category: '',
    currency: '',
    amount: '',
    tipAndFeeType: '',
    tipAndFeeAmount: '',
    tipAndFeePercent: '',
    nation: '',
    acquier: {
      name: '',
      id: '',
    },
    city: '',
    zipCode: '',
    additionalData: {
      billNumber: '',
      mobileNumber: '',
      store: '',
      loyaltyNumber: '',
      reference: '',
      customerLabel: '',
      terminal: '',
      dataRequest: '',
    },
    crc: '',
  }

  if (content.length < 4) {
    dataParser.isValid = false
    return dataParser;
  }
  // verify CRC
  const crcValid = verifyCRC(content);

  if (!crcValid) {
    dataParser.isValid = false
    return dataParser;
  }
  // parse content
  parseRootContent(content, dataParser)

  return dataParser;
}
