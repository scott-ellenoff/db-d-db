import requests
import mysql.connector
from flask import Flask, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Various routes
@app.route('/login/<user_id>', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.form
        loginFunc(data)

@app.route('/')
def index():
    return testService()

@app.route('/history')
def history():
    return historyDeals()

@app.route('/average')
def average():
    return groupby_instrument()

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
def groupby_instrument():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = "select instrument.instrument_name, averages.deal_type ,averages.val from db_grad_cs_1917.instrument join " \
          "(select AVG(deal_amount) as val, deal_type, deal_instrument_id from " \
          "db_grad_cs_1917.deal group by deal_instrument_id, deal_type) as averages on averages.deal_instrument_id " \
          "= db_grad_cs_1917.instrument.instrument_id"
    mycursor.execute(sql)
    result = mycursor.fetchall()
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
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql_buy = '''select totalbuys.dealer, instrument.instrument_name, totalbuys.buys
        from db_grad_cs_1917.instrument join
        (select SUM(deal.deal_quantity) as buys, counterparty.counterparty_name as dealer, deal.deal_instrument_id
        from db_grad_cs_1917.counterparty join
        db_grad_cs_1917.deal
        on counterparty.counterparty_id = deal.deal_counterparty_id
        where deal_type = 'B'
        group by counterparty.counterparty_name, deal.deal_instrument_id) as totalbuys
        on totalbuys.deal_instrument_id = db_grad_cs_1917.instrument.instrument_id
        order by dealer, instrument_name'''
    sql_sell = '''select totalbuys.dealer, instrument.instrument_name, totalbuys.buys
        from db_grad_cs_1917.instrument join
        (select SUM(deal.deal_quantity) as buys, counterparty.counterparty_name as dealer, deal.deal_instrument_id
        from db_grad_cs_1917.counterparty join
        db_grad_cs_1917.deal
        on counterparty.counterparty_id = deal.deal_counterparty_id
        where deal_type = 'S'
        group by counterparty.counterparty_name, deal.deal_instrument_id) as totalbuys
        on totalbuys.deal_instrument_id = db_grad_cs_1917.instrument.instrument_id
        order by dealer, instrument_name'''

    mycursor.execute(sql_buy)
    result_buys = mycursor.fetchall()
    mycursor.execute(sql_sell)
    result_sells = mycursor.fetchall()

    results = []

    headers = ["dealer", "instrument_name", "position"]

    for i in range(len(result_buys)):
        result = list(result_buys[i])
        result[2] = str(result_buys[i][2]-result_sells[i][2])
        results.append(result)

    return table2Payload(results, headers)

def getInstrumentIdList():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = 'select instrument_id from db_grad_cs_1917.instrument'
    mycursor.execute(sql)
    result = mycursor.fetchall()
    lst = [x[0] for x in result]
    return lst

def getDealerIdList():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = 'select counterparty_id from db_grad_cs_1917.counterparty'
    mycursor.execute(sql)
    result = mycursor.fetchall()
    lst = [x[0] for x in result]
    return lst

def realizedPL():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    # loop through this query changing ids
    dealerIds = getDealerIdList()
    instrumentIds = getInstrumentIdList()
    for dealer in dealerIds:
        for instrument in instrumentIds:
            sql = f'select * from db_grad_cs_1917.deal where deal_counterparty_id = {dealer} '\
                  f'and deal_instrument_id = {instrument} order by deal_time'

    mycursor.execute(sql)
    result = mycursor.fetchall()

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

def loginFunc(userID, data):
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = "SELECT * FROM user WHERE user.id = %s"
    val = (userID, )
    mycursor.execute(sql, val)
    result = mycursor.fetchone()
    print(result)

#booting flask app

def bootapp():
    #global rdd
    #rdd = RandomDealData()
    #webServiceStream.bootServices()
    app.run(debug=True, port=8070, threaded=True, host=('0.0.0.0'))

if __name__ == "__main__":
      bootapp()

