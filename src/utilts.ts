import { BankCode, Banks, TBankCode } from './constants';
import { crc16ccitt } from './crc16';

export const genCRCCode = (content: string): string => {
  const crcCode: string = crc16ccitt(content).toString(16).toUpperCase();
  return `0000${crcCode}`.slice(-4);
};

export const genFieldData = (id?: string, value?: string): string => {
  const fieldId = id ?? '';
  const fieldValue = value ?? '';
  const idLen = fieldId.length;


  if (idLen !== 2 || fieldValue.length <= 0) return '';

  // valid: length < 100
  const length = `00${fieldValue.length}`.slice(-2);
  return `${fieldId}${length}${fieldValue}`;
};

export const getBankBin = (bank: TBankCode) => {
  const bankCode = Banks.find((b) => b.code === BankCode[bank]);
  if (!bankCode) return '';

  return bankCode.bin;
};
