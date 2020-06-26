import requests

from config_dev import GOOGLE_DISCOVERY_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET


def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()


def google_refresh_token(refresh_token):
    refresh_response = requests.post(
        'https://oauth2.googleapis.com/token',
        data={
            'client_id': GOOGLE_CLIENT_ID,
            'client_secret': GOOGLE_CLIENT_SECRET,
            'refresh_token': refresh_token,
            'grant_type': 'refresh_token'
        }
    )

    return refresh_response.status_code == 200
