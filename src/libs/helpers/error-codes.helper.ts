export enum ErrorCodes {
  USER_NOT_AUTHENTICATED = 'A00',
  USER_NOT_AUTHORIZED = 'A01',
  USER_NOT_FOUND = 'A02',

  BOARD_NOT_FOUND = 'B00',
  BOARD_NOT_AUTHENTICATED = 'B01',
  BOARD_NOT_AUTHORIZED = 'B02',
  BOARD_UNKNOWN = 'B03',

  COLUMN_NOT_FOUND = 'C00',
  COLUMN_NOT_AUTHENTICATED = 'C01',
  COLUMN_NOT_AUTHORIZED = 'C02',
  COLUMN_UNKNOWN = 'C03',

  GENERIC_EXCEPTION = '00'
}
