# pip install jwt cryptography requests
from dotenv import load_dotenv

from datetime import datetime
import jwt
import time
import requests
import os
import json

load_dotenv()

# *** Update these values to match your configuration ***
KEY_FILE = 'salesforce.key'
ISSUER = os.environ.get("SF_CONSUMER_KEY")
SUBJECT = os.environ.get("SF_USERNAME")
# *******************************************************
IS_SANDBOX = False

DOMAIN = 'test' if IS_SANDBOX else 'login'

print('Loading private key...')
with open(KEY_FILE) as fd:
    private_key = fd.read()

print('Generating signed JWT assertion...')
claim = {
    'iss': ISSUER,
    'exp': int(time.time()) + 300,
    'aud': 'https://{}.salesforce.com'.format(DOMAIN),
    'sub': SUBJECT,
}

print(claim)
assertion = jwt.encode(claim, private_key, algorithm='RS256', headers={'alg':'RS256'})
headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
print('Making OAuth request...')
r = requests.post('https://{}.salesforce.com/services/oauth2/token'.format(DOMAIN), data = {
    'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    'assertion': assertion,
}, headers=headers)

print('Status:', r.status_code)
print(r.json())

access_token = r.json().get("access_token")
instance_url = r.json().get("instance_url")
print("Access Token:", access_token)
print("Instance URL", instance_url)


def sf_api_call(action, parameters = {}, method = 'get', data = {}):
    """
    Helper function to make calls to Salesforce REST API.
    Parameters: action (the URL), URL params, method (get, post or patch), data for POST/PATCH.
    """
    headers = {
        'Content-type': 'application/json',
        'Accept-Encoding': 'gzip',
        'Authorization': 'Bearer %s' % access_token
    }
    if method == 'get':
        r = requests.request(method, instance_url+action, headers=headers, params=parameters, timeout=30)
    elif method in ['post', 'patch']:
        r = requests.request(method, instance_url+action, headers=headers, json=data, params=parameters, timeout=10)
    else:
        # other methods not implemented in this example
        raise ValueError('Method should be get or post or patch.')
    print('Debug: API %s call: %s' % (method, r.url) )
    if r.status_code < 300:
        if method=='patch':
            return None
        else:
            return r.json()
    else:
        raise Exception('API error when calling %s : %s' % (r.url, r.content))
    
print('Loading private key...')
with open(KEY_FILE) as fd:
    private_key = fd.read()

print('Generating signed JWT assertion...')
claim = {
    'iss': ISSUER,
    'exp': int(time.time()) + 300,
    'aud': 'https://{}.salesforce.com'.format(DOMAIN),
    'sub': SUBJECT,
}

print(claim)
assertion = jwt.encode(claim, private_key, algorithm='RS256', headers={'alg':'RS256'})
headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
print('Making OAuth request...')
r = requests.post('https://{}.salesforce.com/services/oauth2/token'.format(DOMAIN), data = {
    'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    'assertion': assertion,
}, headers=headers)

print('Status:', r.status_code)
print(r.json())

access_token = r.json().get("access_token")
instance_url = r.json().get("instance_url")
print("Access Token:", access_token)
print("Instance URL", instance_url)
    
print(json.dumps(sf_api_call('/services/data/v39.0/query/', {
    'q': 'SELECT Account.Name, Name, CloseDate from Opportunity where IsClosed = False order by CloseDate ASC LIMIT 10'
}), indent=2))