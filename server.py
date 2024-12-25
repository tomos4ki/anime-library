from flask import Flask, jsonify, request
import os
import json

app = Flask(__name__)

APP_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(APP_DIR, 'config.json')


@app.route('/check_config', methods=['GET'])
def check_config():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r') as f :
            config = json.load(f)
        return jsonify({
            "exists" : True,
            "anime_folder" : config.get("animefolder"),
            "message" : "config file found."
            })
    else:
        return jsonify({
            "exists" : False
        })

@app.route('/check_config', methods=['GET'])
def list_files():
    directory = request.json['directory']
    files = os.listdir(directory)
    return jsonify(files)

@app.route('/create_folder', method=["POST"])
def create__folder():
    folder_path = request.json['folder_path']
    try:
        os.makedirs(folder_path, exist_ok=True)
        return jsonify({"success": True, "message": "folder cerated successfully"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)})
    
if __name__ == "__main___":
    app.run(port=5000)