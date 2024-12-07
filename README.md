# Wispyr - RSA Encryption Messaging Web App

![Wispyr App Banner](https://github.com/user-attachments/assets/e68e636f-6bf2-4bbb-ac04-58c7938adcd9)

## 🌟 Overview

Wispyr is a cutting-edge secure messaging application designed to prioritize user privacy through robust RSA encryption. With end-to-end encryption and a unique 1-minute message retention policy, Wispyr ensures your communications remain confidential and ephemeral.

## 🚀 Key Features

### Unbreakable Security
- **End-to-End RSA Encryption**: Every message is encrypted using public/private key pairs
- **1-Minute Message Retention**: Messages automatically self-destruct after 60 seconds
- **Secure Key Exchange**: Safe friend discovery and public key sharing

## 📸 App Screenshots

### RSA Encryption Messaging
![Messaging Interface](https://github.com/user-attachments/assets/1c6caae8-98bd-4861-a5b7-28841bb74b50)

### Find Your Friends
![Friend Discovery](https://github.com/user-attachments/assets/34288e61-8bd2-4bd1-a9b6-61a64ee84aec)

## 🛠 Technology Stack

- **Frontend**: React.js, TailwindCSS
- **Backend & Database**: ConvexDB
- **Encryption**: RSA
- **Hashing**: Blowfish Cipher

## 🔐 How It Works

1. **User Registration**
   - Generate unique RSA key pairs
   - Store public key on server
   - Keep private key secure on client-side

2. **Secure Messaging**
   - Encrypt messages with recipient's public key
   - Only recipient can decrypt with their private key
   - Automatic message deletion after 1 minute

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/wispyr.git
   cd wispyr
   ```

2. **Configure Environment**
   Create a `.env` file with the following:
   ```env
   # Deployment used by npx convex dev
   AUTH_SECRET=your_auth_secret
   CONVEX_DEPLOYMENT=your_convex_deployment
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   ```

4. **Run the Application**
   ```bash
   # Start Convex
   npx convex dev

   # Run Backend
   cd backend
   npm start

   # Run Frontend
   cd ../frontend
   npm run dev
   ```

## 🔒 Encryption Technical Overview

### Key Generation
```javascript
const { publicKey, privateKey } = generateKeyPair();
```

### Message Encryption
```javascript
const encryptedMessage = encryptWithPublicKey(message, recipientPublicKey);
```

### Message Decryption
```javascript
const decryptedMessage = decryptWithPrivateKey(encryptedMessage, recipientPrivateKey);
```

## 🗺 Roadmap
- [ ] Integrate Voice Messaging
