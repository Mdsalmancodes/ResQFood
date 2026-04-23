import urllib.request, urllib.error, json
url='http://127.0.0.1:8000/api/signup'
data=json.dumps({'email':'test@example.com','password':'Password1','full_name':'Test User'}).encode('utf-8')
req=urllib.request.Request(url,data,{'Content-Type':'application/json'})
try:
    r=urllib.request.urlopen(req, timeout=5)
    print(r.status)
    print(r.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print('HTTP', e.code)
    print(e.read().decode('utf-8'))
except Exception as e:
    print('ERR', e)
