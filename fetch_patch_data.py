'''
python script -> resides in root dir, fetches from datadragon, updates metadata files, 
sets current version in a json/yaml (have the patch read from this instead of hard coded)

-> can the script upload assets to aws?
'''

import requests
from dotenv import load_dotenv, set_key
import traceback
import os
import json

def get_latest_patch():
  response = requests.get('https://ddragon.leagueoflegends.com/api/versions.json')
  # response is array of version (patch) numbers, first elem is most recent
  data = response.json()[0]
  return data

def get_patch_metadata(latest_patch_num):
  metadata_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src\\metadata')
  data_url = 'https://ddragon.leagueoflegends.com/cdn/{0}/data/en_US/'.format(latest_patch_num)

  # championFull.json -> champion details
  champion_metadata = requests.get('{0}championFull.json'.format(data_url)).json()
  champion_file = os.path.join(metadata_dir, 'champion.json')
  with open(champion_file, 'w') as f:
    json.dump(champion_metadata, f, indent=4)

  # summoner.json -> summoner spells
  summoner_spells_metadata = requests.get('{0}summoner.json'.format(data_url)).json()
  summoner_spells_file = os.path.join(metadata_dir, 'summoners.json')
  with open(summoner_spells_file, 'w') as f:
    json.dump(summoner_spells_metadata, f, indent=4)

  # runesReforged.json -> runes
  runes_metadata = requests.get('{0}runesReforged.json'.format(data_url)).json()
  runes_file = os.path.join(metadata_dir, 'runes.json')
  with open(runes_file, 'w') as f:
    json.dump(runes_metadata, f, indent=4)

def aws_upload_assets():
  pass

def fetch_patch_data():
  try:
    load_dotenv('.env')
    latest_patch_num = get_latest_patch()
    current_patch_num = os.getenv('NEXT_PUBLIC_PATCH_VERSION')
    # update .env NEXT_PUBLIC_PATCH_VERSION if it needs to be updated, fetch updated metadata
    if current_patch_num < latest_patch_num:
      set_key('.env', 'NEXT_PUBLIC_PATCH_VERSION', latest_patch_num)
      get_patch_metadata(latest_patch_num)

  except Exception as e:
    traceback.print_exc()

if __name__ == '__main__': 
  fetch_patch_data()