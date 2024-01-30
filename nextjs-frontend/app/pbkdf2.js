export default async function pbkdf2(password, salt, iterations, keylen) {
    const enc = new TextEncoder();
    const passwordBuffer = enc.encode(password);
    const saltBuffer = enc.encode(salt);

    const importedKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        {name: 'PBKDF2'},
        false,
        ['deriveBits', 'deriveKey']
    );

    const derivedKeyBuffer = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: saltBuffer,
            iterations: iterations,
            hash: 'SHA-256'
        },
        importedKey,
        keylen * 8 // keylen in bits
    );

    const derivedKeyArray = new Uint8Array(derivedKeyBuffer);

    // Convert to HEX
    let hex = '';
    for (let i = 0; i < derivedKeyArray.length; i++) {
        hex += derivedKeyArray[i].toString(16).padStart(2, '0');
    }
    sessionStorage.setItem('key', hex)
    return hex;
}