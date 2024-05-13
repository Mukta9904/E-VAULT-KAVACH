export function checkPasswordStrength(password) {
    // Define the criteria for a strong password
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*_+|.?<>:/[]-]/.test(password);

    // Calculate the strength score
    let strengthScore = 0;
    if(password){
        if (password.length >= minLength) {
            strengthScore += 1;
        }
        if (hasUppercase) {
            strengthScore += 1;
        }
        if (hasLowercase) {
        strengthScore += 1;
    }
    if (hasDigit) {
        strengthScore += 1;
    }
    if (hasSpecialChar) {
        strengthScore += 1;
    }
    
}
    // Determine the strength level
    let strengthLevel;
    if (strengthScore < 3) {
        strengthLevel = 'Weak';
    } else if (strengthScore === 3) {
        strengthLevel = 'Moderate';
    } else {
        strengthLevel = 'Strong';
    }

    return strengthLevel;
}


