import { createCipheriv } from "crypto";

export const encryptPassword = (password,key,iv) => {
  const keyBuffer = Buffer.from(key, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');
  // Create a cipher instance
  const cipher = createCipheriv('aes256', keyBuffer, ivBuffer);

  // Encrypt the message
  const encryptedMessage = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
  return encryptedMessage;
};