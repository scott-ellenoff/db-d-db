import requests
import mysql.connector
from flask import Flask, Response, jsonify
from flask_cors import CORS
import decimal


app = Flask(__name__)
CORS(app)

# Various routes
@app.route("/login/<user_id>", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = request.form
        loginFunc(data)


@app.route("/")
def index():
    return testService()


@app.route("/history")
def history():
    return historyDeals()


@app.route("/average")
def average():
    return groupby_instrument()


@app.route("/dealer/endpos")
def dealerEndPositions():
    return endPositions()


@app.route("/dealer/realized_pl")
def dealerRealizedPL():
    return jsonify(realizedPL())


@app.route("/dealer/effective_pl")
def dealerEffectivePL():
    return jsonify(effectivePL())


@app.route("/client/testservice")
def testservice():
    return jsonify(success=True)


# connecting to the database
def connect():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    return mydb


# functions that routes point to
def groupby_instrument():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = (
        "select instrument.instrument_name, averages.deal_type ,averages.val from db_grad_cs_1917.instrument join "
        "(select AVG(deal_amount) as val, deal_type, deal_instrument_id from "
        "db_grad_cs_1917.deal group by deal_instrument_id, deal_type) as averages on averages.deal_instrument_id "
        "= db_grad_cs_1917.instrument.instrument_id"
    )
    mycursor.execute(sql)
    result = mycursor.fetchall()
    lst = [list(x) for x in result]
    for x in lst:
        x[2] = str(round(x[2], 2))
    payload = table2Payload(lst, ["instrument", "type", "average"])
    return payload


def historyDeals():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = "SELECT * FROM deal"
    mycursor.execute(sql)
    headers = [str(x[0]) for x in mycursor.description]
    result = mycursor.fetchall()
    lst = [list(x) for x in result]
    for x in lst:
        x[5] = str(round(x[5], 2))
    return table2Payload(lst, headers)


def endPositions():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql_buy = """select totalbuys.dealer, instrument.instrument_name, totalbuys.buys
        from db_grad_cs_1917.instrument join
        (select SUM(deal.deal_quantity) as buys, counterparty.counterparty_name as dealer, deal.deal_instrument_id
        from db_grad_cs_1917.counterparty join
        db_grad_cs_1917.deal
        on counterparty.counterparty_id = deal.deal_counterparty_id
        where deal_type = 'B'
        group by counterparty.counterparty_name, deal.deal_instrument_id) as totalbuys
        on totalbuys.deal_instrument_id = db_grad_cs_1917.instrument.instrument_id
        order by dealer, instrument_name"""
    sql_sell = """select totalbuys.dealer, instrument.instrument_name, totalbuys.buys
        from db_grad_cs_1917.instrument join
        (select SUM(deal.deal_quantity) as buys, counterparty.counterparty_name as dealer, deal.deal_instrument_id
        from db_grad_cs_1917.counterparty join
        db_grad_cs_1917.deal
        on counterparty.counterparty_id = deal.deal_counterparty_id
        where deal_type = 'S'
        group by counterparty.counterparty_name, deal.deal_instrument_id) as totalbuys
        on totalbuys.deal_instrument_id = db_grad_cs_1917.instrument.instrument_id
        order by dealer, instrument_name"""

    mycursor.execute(sql_buy)
    result_buys = mycursor.fetchall()
    mycursor.execute(sql_sell)
    result_sells = mycursor.fetchall()

    results = []

    headers = ["dealer", "instrument_name", "position"]

    for i in range(len(result_buys)):
        result = list(result_buys[i])
        result[2] = str(result_buys[i][2] - result_sells[i][2])
        results.append(result)

    return table2Payload(results, headers)


def getInstrumentIdList():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = "select instrument_id from db_grad_cs_1917.instrument"
    mycursor.execute(sql)
    result = mycursor.fetchall()
    lst = [x[0] for x in result]
    return lst


def getDealerList():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = "select counterparty_id, counterparty_name from db_grad_cs_1917.counterparty"
    mycursor.execute(sql)
    result = mycursor.fetchall()
    lst = [list(x) for x in result]
    return lst

def extract(deal_data):
    buy_quantity = 0
    avg_buy_price = 0
    sell_quantity = 0
    avg_sell_price = 0
    for deal in deal_data:
        deal = list(deal)
        if deal[4] == "S":
            sell_quantity += deal[6]
            avg_sell_price += deal[5] * deal[6]
        else:
            buy_quantity += deal[6]
            avg_buy_price += deal[5] * deal[6]
    avg_sell_price = avg_sell_price / sell_quantity
    avg_buy_price = avg_buy_price / buy_quantity
    return (buy_quantity, sell_quantity, avg_buy_price, avg_sell_price)


def realizedPL():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    dealerIds = getDealerList()
    instrumentIds = getInstrumentIdList()
    output = []
    for dealer in dealerIds:
        pl = 0
        for instrument in instrumentIds:
            sql = (
                f"select * from db_grad_cs_1917.deal where deal_counterparty_id = {dealer[0]} "
                f"and deal_instrument_id = {instrument} order by deal_time"
            )
            mycursor.execute(sql)
            result = mycursor.fetchall()
            bq, sq, bp, sp = extract(result)
            if bq > sq:
                pl += (sp - bp) * sq
            else:
                pl += (sp - bp) * bq
        output.append({"dealer": dealer[1], "realizedPL": str(round(pl, 2))})
    return output


def getFillPrices():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    sql = 'select fill.deal_instrument_id, MAX(deal_amount) from db_grad_cs_1917.deal ' \
    'join (select MAX(deal_time) as latest, deal_instrument_id from db_grad_cs_1917.deal ' \
    'group by deal_instrument_id) fill on fill.deal_instrument_id = deal.deal_instrument_id ' \
    'and fill.latest = deal.deal_time group by fill.deal_instrument_id'
    mycursor.execute(sql)
    result = mycursor.fetchall()
    fill_prices = {x[0]:x[1] for x in result}
    return fill_prices

def effectivePL():
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    dealerIds = getDealerList()
    instrumentIds = getInstrumentIdList()
    fill_prices = getFillPrices()
    output = []

    for dealer in dealerIds:
        unrealized_pl = 0
        for instrument in instrumentIds:
            sql = (
                f"select * from db_grad_cs_1917.deal where deal_counterparty_id = {dealer[0]} "
                f"and deal_instrument_id = {instrument} order by deal_time"
            )
            mycursor.execute(sql)
            result = mycursor.fetchall()
            bq, sq, bp, sp = extract(result)
            open_position = bq - sq
            average_open_price = 0
            if open_position > 0:
                average_open_price = bp
            else:
                average_open_price = sp
            unrealized_pl += (fill_prices[instrument] - average_open_price) * open_position
        output.append({"dealer": dealer[1],
                       "unrealizedPL": unrealized_pl})
    final = []
    realized_output = realizedPL()
    for i in range(len(output)):
        final.append({"dealer": output[i]['dealer'],
                      "effectivePL": str(round(
                          output[i]["unrealizedPL"] + decimal.Decimal(realized_output[i]["realizedPL"]), 2))
                      })
    return(final)


def table2Payload(data, headers):
    payload = []
    content = {}
    for result in data:
        result = list(result)
        #result[5] = str(result[5])
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
    val = (userID,)
    mycursor.execute(sql, val)
    result = mycursor.fetchone()
    print(result)


# booting flask app


def bootapp():
    # global rdd
    # rdd = RandomDealData()
    # webServiceStream.bootServices()
    app.run(debug=True, port=8070, threaded=True, host=("0.0.0.0"))


if __name__ == "__main__":
    bootapp()
