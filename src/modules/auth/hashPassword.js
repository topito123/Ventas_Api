import argon2 from 'argon2';

const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password);
        console.log("Hashed password:", hashedPassword);
    } catch (error) {
        console.error("Error hashing password:", error);
    }
};
hashPassword("adminpassword");