import {createDecipheriv } from "crypto";

export const decryptPassword =  (password, key, iv) => { 
    const keyBuffer = Buffer.from(key, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');
    const decipher = createDecipheriv('aes256', keyBuffer, ivBuffer);
    // Decrypt the message
    const decryptedMessage = decipher.update(password, 'hex', 'utf-8') + decipher.final('utf8');
return decryptedMessage 
 }