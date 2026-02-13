import { Platform } from 'react-native'

export const Scrypt = {
  scrypt: (
    password: ArrayBuffer,
    salt: ArrayBuffer,
    N: number,
    r: number,
    p: number,
    size: number
  ): ArrayBuffer => {
    const openNative = Platform.select({
      ios: () => require('./CryptoSwift').CryptoSwift.scrypt(password, salt, N, r, p, size),
      android: () => require('./BouncyCastle').BouncyCastle.scrypt(password, salt, N, r, p, size),
    })

    if (!openNative) {
      throw new Error('react-native-nitro-scrypt not support on this platform')
    }

    const res = openNative()
    return res
  },
}
