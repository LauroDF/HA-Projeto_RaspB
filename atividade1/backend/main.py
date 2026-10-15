from flask import Flask, jsonify, send_from_directory
from hardware import collect_os_data

app = Flask(__name__)

FRONTEND_DIR = '../frontend'

@app.route('/')
def pagina_inicial():
    return send_from_directory(FRONTEND_DIR, 'index.html')

@app.route('/<path:arquivo>')
def arquivos_frontend(arquivo):
    return send_from_directory(FRONTEND_DIR, arquivo)

@app.route('/api/status', methods=['GET'])
def endpoint():
    hardware_data = collect_os_data()

    json_response = {
        "status": "API rodando",
        "server_info": hardware_data
    }

    resposta = jsonify(json_response)
    resposta.headers["Access-Control-Allow-Origin"] = "*"
    return resposta

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)