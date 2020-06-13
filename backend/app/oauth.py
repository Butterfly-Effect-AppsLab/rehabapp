import requests

from config_dev import GOOGLE_DISCOVERY_URL


def get_google_provider_cfg():
    return requests.get(GOOGLE_DISCOVERY_URL).json()