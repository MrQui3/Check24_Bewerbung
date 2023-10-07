from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad
import json
from base64 import b64decode, b64encode

from Crypto.Util.Padding import unpad

password = b"password"
key = get_random_bytes(16)
cipher = AES.new(key, AES.MODE_CBC)
ct_bytes = cipher.encrypt(pad(password, AES.block_size))
iv = b64encode(cipher.iv).decode('utf-8')
ct = b64encode(ct_bytes).decode('utf-8')
result = json.dumps({'iv': iv, 'ciphertext': ct})
print(type(iv))

b64 = json.loads(result)
iv = b64decode(b64['iv'])
print(type(iv))
ct = b64decode(b64['ciphertext'])
cipher = AES.new(key, AES.MODE_CBC, iv)
pt = unpad(cipher.decrypt(ct), AES.block_size)
print(pt.decode('utf-8'))
