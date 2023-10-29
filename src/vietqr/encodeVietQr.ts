import { genCRCCode, genFieldData, getBankBin } from 'src/utilts';
import {
  AdditionalDataID,
  FieldID,
  ProviderFieldID,
  QRProviderGUID,
  VietQRConsumerFieldID,
  VietQRSevice,
} from '../constants';
import { TOptionsVietQr } from 'src/types';

export const encodeVietQr = (options: TOptionsVietQr): string => {
  const version = genFieldData(FieldID.VERSION, options?.version ?? '01' ?? '');
  const initMethod = genFieldData(
    FieldID.INIT_METHOD,
    options.amount ? '12' : '11'
  );

  const guid = genFieldData(ProviderFieldID.GUID, QRProviderGUID.VIETQR);

  const bankBin = genFieldData(
    VietQRConsumerFieldID.BANK_BIN,
    getBankBin(options.bank) ?? ''
  );
  const bankNumber = genFieldData(
    VietQRConsumerFieldID.BANK_NUMBER,
    options.account ?? ''
  );

  const provider = genFieldData(ProviderFieldID.DATA, bankBin + bankNumber);
  const service = genFieldData(
    ProviderFieldID.SERVICE,
    options.service || VietQRSevice.BY_ACCOUNT_NUMBER
  );
  const providerData = genFieldData(
    FieldID.VIETQR,
    guid + provider + service ?? ''
  );

  const category = genFieldData(FieldID.CATEGORY, options?.category ?? '');
  const currency = genFieldData(
    FieldID.CURRENCY,
    options?.currency ?? '704' ?? ''
  );
  const amountStr = genFieldData(FieldID.AMOUNT, options?.amount ?? '0');
  const tipAndFeeType = genFieldData(
    FieldID.TIP_AND_FEE_TYPE,
    options?.tipAndFeeType ?? ''
  );
  const tipAndFeeAmount = genFieldData(
    FieldID.TIP_AND_FEE_AMOUNT,
    options?.tipAndFeeAmount ?? ''
  );
  const tipAndFeePercent = genFieldData(
    FieldID.TIP_AND_FEE_PERCENT,
    options?.tipAndFeePercent ?? ''
  );
  const nation = genFieldData(
    FieldID.NATION,
    options?.nation ?? 'VN' ?? ''
  );
  const acquierName = genFieldData(FieldID.ACQUIER_NAME, options?.acquierName ?? '');
  const city = genFieldData(FieldID.CITY, options?.city ?? '');
  const zipCode = genFieldData(FieldID.ZIP_CODE, options?.zipCode ?? '');

  const buillNumber = genFieldData(
    AdditionalDataID.BILL_NUMBER,
    options?.additionalData?.billNumber ?? ''
  );
  const mobileNumber = genFieldData(
    AdditionalDataID.MOBILE_NUMBER,
    options?.additionalData?.mobileNumber ?? ''
  );
  const storeLabel = genFieldData(
    AdditionalDataID.STORE_LABEL,
    options?.additionalData?.store ?? ''
  );
  const loyaltyNumber = genFieldData(
    AdditionalDataID.LOYALTY_NUMBER,
    options?.additionalData?.loyaltyNumber ?? ''
  );
  const reference = genFieldData(
    AdditionalDataID.REFERENCE_LABEL,
    options?.additionalData?.reference ?? ''
  );
  const customerLabel = genFieldData(
    AdditionalDataID.CUSTOMER_LABEL,
    options?.additionalData?.customerLabel ?? ''
  );
  const terminal = genFieldData(
    AdditionalDataID.TERMINAL_LABEL,
    options?.additionalData?.terminal ?? ''
  );
  const purpose = genFieldData(
    AdditionalDataID.PURPOSE_OF_TRANSACTION,
    options?.additionalData?.purpose ?? ''
  );
  const dataRequest = genFieldData(
    AdditionalDataID.ADDITIONAL_CONSUMER_DATA_REQUEST,
    options?.additionalData?.dataRequest ?? ''
  );

  const additionalDataContent =
    buillNumber +
    mobileNumber +
    storeLabel +
    loyaltyNumber +
    reference +
    customerLabel +
    terminal +
    purpose +
    dataRequest;

  const additionalData = genFieldData(
    FieldID.ADDITIONAL_DATA,
    additionalDataContent
  );

  const content = `${version}${initMethod}${providerData}${category}${currency}${amountStr}${tipAndFeeType}${tipAndFeeAmount}${tipAndFeePercent}${nation}${acquierName}${city}${zipCode}${additionalData}${FieldID.CRC}04`;

  const crc = genCRCCode(content);
  return content + crc;
};
