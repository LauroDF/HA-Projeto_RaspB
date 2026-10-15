from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from hardware import collect_os_data, collect_connections_data

app = Flask(__name__, static_folder = "../frontend", static_url_path='')
CORS(app)

@app.route('/', methods=['GET'])
def index():
    return send_from_directory("../frontend", "index.html")

@app.route('/api/status', methods=['GET'])
def endpoint():
    hardware_data = collect_os_data()
    connections_data = collect_connections_data()
    
    json_response = {
        "status": "API rodando",
        "server_info": hardware_data,
        "connection_attempts": connections_data
    }
    return jsonify(json_response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
