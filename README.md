<p align="center">
<a href="https://www.npmjs.com/package/vn-qr-pay" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/uiw:qrcode.svg?color=%239c9c9c" alt="logo" width='100'/></a>
</p>

<p align="center">
  Thư viện hỗ trợ encode/decode mã QR của VietQR & VNPayQR
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vn-qr-pay" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/csvs-parsers.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/vn-qr-pay" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/csvs-parsers.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=vn-qr-pay" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/vn-qr-pay" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/vn-qr-pay/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/vn-qr-pay/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/vn-qr-pay" alt="License" /></a>
</p>

## Install

```bash
npm install vn-qr-pay
```

## Usage


```javascript
import { encodeVietQr, encodeVnPay, decodeQr } from 'vn-qr-pay';

const code = encodeVietQr({
    account: '7868255197',
    bank: 'TECHCOMBANK',
    amount: '1000',
    additionalData: {
      purpose: 'Give Hung a cup of coffe',
    }
  });

```
| Name | Type | Description |
| --- | --- | --- |
| `isValid` | `boolean` | Kiểm tra tính hợp lệ của mã QR |
| `initMethod` | `string` | Phương thức khởi tạo (`11` - QR Tĩnh, `12` - QR động) |
| `provider` | `Provider` | Thông tin nhà cung cấp |
| `acquierId` | `AcquierId` | Thông tin acquierId |
| `acquierName` | `AcquierName` | Thông tin acquierName |
| `consumer` | `Consumer` | Thông tin người thanh toán |
| `amount` | `string` | Số tiền giao dịch |
| `currency` | `string` | Mã tiền tệ (VNĐ: 704) |
| `nation` | `string` | Mã quốc gia |
| `additionalData` | `AdditionalData` | Thông tin bổ sung |
| `crc` | `string` | Mã kiểm tra |

### `Provider` class

Thông tin đơn vị cung cấp mã QR (VietQR, VNPay)


| Name | Type | Description |
| --- | --- | --- |
| `guid` | `string` | Mã định danh toàn cầu |
| `name` | `string` | Tên nhà cung cấp |

### `Consumer` class

Thông tin người thanh toán

| Name | Type | Description |
| --- | --- | --- |
| `bankBin` | `string` | Mã ngân hàng |
| `bankNumber` | `string` | Số tài khoản |

### `AdditionalData` class

Thông tin bổ sung

| Name | Type | Description |
| --- | --- | --- |
| `billNumber` | `string` | Số hóa đơn |
| `mobileNumber` | `string` | Số điện thoại di động |
| `store` | `string` | Tên cửa hàng |
| `loyaltyNumber` | `string` | Mã khách hàng thân thiết |
| `reference` | `string` | Mã Tham chiếu |
| `customerLabel` | `string` | Mã khách hàng |
| `terminal` | `string` | Tên điểm bản |
| `purpose` | `string` | Nội dung giao dịch |
