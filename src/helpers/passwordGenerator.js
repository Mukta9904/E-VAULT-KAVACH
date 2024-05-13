export function generateStrongPassword(length = 8) {
    if (length < 8) {
        length = 8; // Ensure minimum password length is 8
    }

    // Define the characters that will be used to generate the password
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_+|.?<>:/[]-';

    // Generate a random password
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}


