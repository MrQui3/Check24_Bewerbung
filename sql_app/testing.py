from Crypto.Cipher import AES
import binascii

key = b'Sixteen byte key'
nonce = b'\xd1\xbb\xed\xbe`O\x8es\t\xad\xff \xe3\xcb}$'
de_cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
de_cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)



def encrypt(password: bytes):
    cyphertext = en_cipher.encrypt(password)

    return cyphertext


def decrypt(password):
    plaintext = de_cipher.decrypt(password)
    return plaintext


en_password = encrypt("password".encode("utf-8"))
print(en_password)
en_password2 = encrypt("password".encode("utf-8"))
print(en_password2)
print(decrypt(b'\xfdf\xc4\r-`\n\xbd'))
