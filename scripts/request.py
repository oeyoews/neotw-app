import requests

response = requests.get('https://neotw.netlify.app/')

with open('src/index.html', 'wb') as f:
    f.write(response.content)
