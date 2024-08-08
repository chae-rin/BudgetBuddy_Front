import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_AES_SECRETKEY

export const encrypted = (val) => {
    // AES 알고리즘 사용 암호화
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(val), secretKey).toString();
    return encryptedValue;
}

export const decrypted = (val) => {
    // AES 알고리즘 사용 복호화
    const bytes = CryptoJS.AES.decrypt(val, secretKey);
    const decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedValue;
}