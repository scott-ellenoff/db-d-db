import requests
import mysql.connector
from flask import Flask, Response, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

#Various routes
@app.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        content = request.get_json()
        userID = content["user_id"]
        password = content["password"]
        print(content)
        return loginFunc(userID, password)


@app.route('/')
def index():
    return testService()

@app.route('/history')
def history():
    return historyDeals()

@app.route('/average')
def average():
    return groupby_instrument(connect())

@app.route('/dealer/endpos')
def dealerEndPositions():
    return endPositions()

@app.route('/dealer/realizer_pl')
def dealerRealizedPL():
    return realizedPL()

@app.route('/dealer/effective_pl')
def dealerEffectivePL():
    return effectivePL()

@app.route('/client/testservice')
def testservice():
    return jsonify(success = True)

#connecting to the database
def connect():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    return mydb



#functions that routes point to
def groupby_instrument(connection):
    mycursor = connection.cursor()
    sql = "select instrument.instrument_name, averages.deal_type ,averages.val from db_grad_cs_1917.instrument join " \
          "(select AVG(deal_amount)/AVG(deal_quantity) as val, deal_type, deal_instrument_id from " \
          "db_grad_cs_1917.deal group by deal_instrument_id, deal_type) as averages on averages.deal_instrument_id " \
            "= db_grad_cs_1917.instrument.instrument_id"
    mycursor.execute(sql)
    result = mycursor.fetchall()
<<<<<<< Updated upstream
    payload = []
    content = {}
    for res in result:
        res = list(res)
        if res[1] == 'B':
            content["instrument"] = res[0]
            content["buy_average"] = str(res[2])
        else:
            content["sell_average"] = str(res[2])
            payload.append(content)
            content = {}
    return jsonify(payload)
=======
    for x in result:
        print(x)
>>>>>>> Stashed changes

def historyDeals():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = "SELECT * FROM deal"
    mycursor.execute(sql)
    headers = [str(x[0]) for x in mycursor.description]
    results = []
    for result in mycursor.fetchall():
        result = list(result)
        result[5] = str(result[5])
        results.append(result)
    return table2Payload(results, headers)


def endPositions():
    return

def realizedPL():
    return

def effectivePL():
    return

def table2Payload(data, headers):
    payload = []
    content = {}
    for result in data:
        content = dict(zip(headers, result))
        payload.append(content)
        content = {}
    return jsonify(payload)

def loginFunc(userID, password):
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = "SELECT * FROM users WHERE user_id = %s"
    val = (userID, )
    mycursor.execute(sql, val)
    result = mycursor.fetchone()
    print(result)
    if result[1] == password:
        return Response(status = 200)
    return Response(status = 401)

#booting flask app

def bootapp():
    #global rdd
    #rdd = RandomDealData()
    #webServiceStream.bootServices()
    app.run(debug=True, port=8070, threaded=True, host=('0.0.0.0'))

if __name__ == "__main__":
      bootapp()

