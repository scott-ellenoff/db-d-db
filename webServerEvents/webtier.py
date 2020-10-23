from flask import Flask, render_template, Response, request
from flask_sse import sse
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
#app.register_blueprint(sse, url_prefix='/stream')
CORS(app)

#Various routes
@app.route('/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        content = requests.post('http://127.0.0.1:5001/login', data = request.get_json())
        print(content)
        return content

@app.route('/history')
def history():
    data = requests.get('http://127.0.0.1:5001/history')
    print(data)
    return data

@app.route('/average')
def average():
    data = requests.get('http://127.0.0.1:5001/average')
    return data

@app.route('/dealer/endpos')
def dealerEndPositions():
    data = requests.get('http://127.0.0.1:5001/dealer/endpos')
    return data

@app.route('/dealer/realized_pl')
def dealerRealizedPL():
    data = requests.get('http://127.0.0.1:5001/dealer/realized_pl')
    return data


@app.route('/dealer/effective_pl')
def dealerEffectivePL():
    return effectivePL()

@app.route('/deals')
def forwardStream():
    r = requests.get('http://localhost:8080/streamTest', stream=True)
    def eventStream():
            for line in r.iter_lines( chunk_size=1):
                if line:
                    yield 'data:{}\n\n'.format(line.decode())
    return Response(eventStream(), mimetype="text/event-stream")

@app.route('/client/testservice')
def client_to_server():
    r = requests.get('http://localhost:8080/testservice')
    return Response(r.iter_lines(chunk_size=1), mimetype="text/json")



@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")


def get_message():
    """this could be any function that blocks until data is ready"""
    time.sleep(1.0)
    s = time.ctime(time.time())
    return s

def bootapp():
    app.run(port=5000, threaded=True, host=('127.0.0.1'))

if __name__ == '__main__':
     bootapp()
