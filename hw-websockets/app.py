import requests
import mysql.connector
from flask import Flask, Response, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

#Various routes
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
          "(select AVG(deal_amount) as val, deal_type, deal_instrument_id from " \
          "db_grad_cs_1917.deal group by deal_instrument_id, deal_type) as averages on averages.deal_instrument_id " \
            "= db_grad_cs_1917.instrument.instrument_id"
    mycursor.execute(sql)
    result = mycursor.fetchall()
    for x in result:
        print(x)

def historyDeals():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = "SELECT * FROM deal"
    mycursor.execute(sql)
    headers = [str(x[0]) for x in mycursor.description]
    return table2Payload(mycursor.fetchall(), headers)


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
        result = list(result)
        result[5] = str(result[5])
        content = dict(zip(headers, result))
        payload.append(content)
        content = {}
    return jsonify(payload)

def bootapp():
    #global rdd
    #rdd = RandomDealData()
    #webServiceStream.bootServices()
    app.run(debug=True, port=8070, threaded=True, host=('0.0.0.0'))

if __name__ == "__main__":
      bootapp()

