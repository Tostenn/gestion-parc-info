from requests import get

url = 'http://localhost:8080'
r = get(url)
print(r.text)