from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

key = get_random_bytes(16)
en_cipher = AES.new(key, AES.MODE_EAX)
de_cipher = AES.new(key, AES.MODE_EAX, nonce=en_cipher.nonce)


def encrypt(password: bytes):
    cyphertext = en_cipher.encrypt(password)
    print(cyphertext)

    return cyphertext


def decrypt(password: bytes):
    plaintext = de_cipher.decrypt(password)
    return plaintext


en_password = encrypt(b"password")
print(decrypt(en_password))
