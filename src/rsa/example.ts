
// Example Usage

import {decrypt_message, encrypt_message, generateTwoKeyPair} from "@/rsa/rsa-encryption";

const runExample = () => {
    // Generate key pair
    const { publicKey, privateKey } = generateTwoKeyPair();

    // Original message
    const originalMessage = "Hello, secure communication!";
    console.log("Original Message:", originalMessage);

    // Encrypt the message
    const encryptedMessage = encrypt_message(originalMessage, publicKey);
    console.log("Encrypted Message:", encryptedMessage);

    // Decrypt the message
    const decryptedMessage = decrypt_message(encryptedMessage, privateKey);
    console.log("Decrypted Message:", decryptedMessage);

    // Verify
    console.log("Decryption Successful:", originalMessage === decryptedMessage);
};

runExample()