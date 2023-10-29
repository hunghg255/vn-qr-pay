import { TBankCode, VietQRSevice } from 'src/constants';

export type TOptionsVietQr = {
  bank: TBankCode;
  account: string;
  amount?: string;

  service?: VietQRSevice;
  version?: string;
  category?: string;
  currency?: string;
  tipAndFeeType?: string;
  tipAndFeeAmount?: string;
  tipAndFeePercent?: string;
  nation?: string;
  acquierId?: string,
  acquierName?: string,
  city?: string;
  zipCode?: string;

  additionalData?: {
    billNumber?: string;
    mobileNumber?: string;
    store?: string;
    loyaltyNumber?: string;
    reference?: string;
    customerLabel?: string;
    terminal?: string;
    dataRequest?: string;
    purpose?: string;
  };
};

export type TOptionsVnPay = {
  bank: TBankCode;
  account: string;
  amount: string;

  service?: VietQRSevice;
  version?: string;
  category?: string;
  currency?: string;
  tipAndFeeType?: string;
  tipAndFeeAmount?: string;
  tipAndFeePercent?: string;
  nation?: string;
  city?: string;
  zipCode?: string;

  acquierId: string,
  acquierName: string,

  additionalData: {
    billNumber?: string;
    mobileNumber?: string;
    store: string;
    loyaltyNumber?: string;
    reference?: string;
    customerLabel?: string;
    terminal: string;
    dataRequest?: string;
    purpose?: string;
  };
};
