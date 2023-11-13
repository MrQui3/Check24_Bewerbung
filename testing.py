import requests

payload = {'user': 'foo'}
response = requests.post('http://127.0.0.1:8000/test/', data=payload)
print(response.json())
