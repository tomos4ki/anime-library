from flask import Flask, jsonify, request, send_from_directory, render_template
import os
import json

app = Flask(__name__, static_folder='static')

APP_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(APP_DIR, 'config.json')

@app.route('/')
def index():
    return render_template('index.html')

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

@app.route('/create_config', methods=['POST'])
def create_config():
    anime_folder = request.json['anime_folder']
    config = {
        "anime_folder" : anime_folder
    }
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f)
    return jsonify({
        "success" : True,
        "message" : "config file created successfully.",
        "anime_folder" : anime_folder
        })

@app.route("/upload_config", methods=['POST'])
def upload_config():
    try:
        config = request.json
        if 'anime_folder' not in config:
            return jsonify({
                "success" : False,
                "message" : "invalid config file : animefolder is missing"
            })
        with open(CONFIG_FILE, 'w') as f:
            json.dump(config, f)
        return jsonify({
            "success" : True,
            "message" : "config uploaded successfully",
            "anime_folder" : config['anime_folder']
        })
    except Exception as e:
        return jsonify({
            "success" : False,
            "message" : f"Error uploading config: {str(e)}"
        })

@app.route('/list_files', methods=['GET'])
def list_files():
    directory = request.json['directory']
    try:
        files = os.listdir(directory)
        return jsonify({
            "success" : True,
            "files" : files
        })
    except Exception as e:
        return jsonify({
            "success" : False,
            "message" : f"Error listing files :{str(e)}"
        })

@app.route('/create_folder', methods=["POST"])
def create__folder():
    folder_path = request.json['folder_path']
    try:
        os.makedirs(folder_path, exist_ok=True)
        return jsonify({"success": True, "message": "folder cerated successfully"})
    except Exception as e:
        return jsonify({"success": False, "message": f"Error creating folder :{str(e)}"})
    
if __name__ == "__main__":
    app.run(port=5000)