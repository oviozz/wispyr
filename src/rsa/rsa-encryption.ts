
export type PublicKey = {
    e: bigint; // Public exponent
    n: bigint; // Modulus
};

export type PrivateKey = {
    d: bigint; // Private exponent
    n: bigint; // Modulus
};

type KeyPair = {
    publicKey: PublicKey;
    privateKey: PrivateKey;
};

//  Simple pseudorandom number generator
const simpleRandom = (min: number, max: number): number => {
    const seed = Date.now();
    const x = Math.sin(seed) * 10000;
    const random = x - Math.floor(x);
    return Math.floor(random * (max - min + 1)) + min;
};

// Generate a prime number within a given range
const isPrime = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    // Check up to square root
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
};

const generatePrime = (min: number, max: number, maxAttempts: number = 100): number => {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // Use an odd number to increase prime probability
        const candidate = 2 * Math.floor(simpleRandom(Math.ceil(min/2), Math.floor(max/2))) + 1;

        if (candidate >= min && candidate <= max && isPrime(candidate)) {
            return candidate;
        }
    }

    // Fallback to a predefined list of primes if generation fails
    const fallbackPrimes = [
        2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081,
        3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079
    ];

    const validPrimes = fallbackPrimes.filter(p => p >= min && p <= max);

    if (validPrimes.length > 0) {
        return validPrimes[Math.floor(Math.random() * validPrimes.length)];
    }

    throw new Error('Failed to generate prime number');
};


// Greatest Common Divisor
const gcd = (a: bigint, b: bigint): bigint => {
    while (b !== BigInt(0)) {
        [a, b] = [b, a % b];
    }
    return a;
};


// Extended Euclidean Algorithm for modular multiplicative inverse
const extendedGCD = (a: bigint, b: bigint): { gcd: bigint, x: bigint, y: bigint } => {
    if (a === BigInt(0)) {
        return { gcd: b, x: BigInt(0), y: BigInt(1) };
    }

    const { gcd, x, y } = extendedGCD(b % a, a);
    return {
        gcd,
        x: y - (b / a) * x,
        y: x
    };
};

// Modular multiplicative inverse
const modInverse = (a: bigint, m: bigint): bigint => {
    const { gcd, x } = extendedGCD(a, m);

    if (gcd !== BigInt(1)) {
        throw new Error('Modular inverse does not exist');
    }

    return (x % m + m) % m;
};

// Modular exponentiation
const modPow = (base: bigint, exponent: bigint, modulus: bigint): bigint => {
    if (modulus === BigInt(1)) return BigInt(0);

    let result = BigInt(1);
    base = base % modulus;

    while (exponent > BigInt(0)) {
        if (exponent % BigInt(2) === BigInt(1)) {
            result = (result * base) % modulus;
        }
        exponent = exponent / BigInt(2);
        base = (base * base) % modulus;
    }

    return result;
};

// Generate RSA key pair
export const generateTwoKeyPair = (minPrime: number = 1000, maxPrime: number = 10000): KeyPair => {
    // Choose two distinct primes
    let p: number, q: number;
    do {
        p = generatePrime(minPrime, maxPrime);
        q = generatePrime(minPrime, maxPrime);
    } while (p === q);

    const n = BigInt(p) * BigInt(q);

    // Calculate totient
    const phi = BigInt(p - 1) * BigInt(q - 1);

    // Choose public exponent
    let e = BigInt(65537);
    if (e >= phi) {
        e = BigInt(3);
        while (e < phi) {
            if (gcd(e, phi) === BigInt(1)) break;
            e += BigInt(2);
        }
    }

    // Calculate private exponent
    const d = modInverse(e, phi);

    return {
        publicKey: { e, n },
        privateKey: { d, n }
    };
};

const messageToBlocks = (message: string): number[] => {
    const encoder = new TextEncoder();
    return Array.from(encoder.encode(message));
};

const blocksToMessage = (blocks: number[]): string => {
    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(blocks));
};

// Encrypt message
export const encrypt_message = (message: string, publicKey: PublicKey): string => {
    const blocks = messageToBlocks(message);

    const encryptedBlocks = blocks.map(block => {
        const blockBigInt = BigInt(block);
        const encryptedBlock = modPow(blockBigInt, publicKey.e, publicKey.n);
        return encryptedBlock.toString();
    });

    return encryptedBlocks.join(',');
};

// Decrypt message
export const decrypt_message = (encryptedMessage: string, privateKey: PrivateKey): string => {
    const encryptedBlocks = encryptedMessage.split(',').map(block => BigInt(block));

    const decryptedBlocks = encryptedBlocks.map(block => {
        const decryptedBlock = modPow(block, privateKey.d, privateKey.n);
        return Number(decryptedBlock);
    });

    return blocksToMessage(decryptedBlocks);
};
