import requests
import mysql.connector


def connect():
    url = "http://127.0.0.1:5000/streamTest/sse"
    r = requests.get(url, stream=True)
    mydb = mysql.connector.connect(
        host="localhost", user="root", password="ppp", database="db_grad_cs_1917"
    )
    return mydb


def groupby_instrument(connection):
    mycursor = connection.cursor()
    sql = "select instrument.instrument_name, averages.deal_type ,averages.val from db_grad_cs_1917.instrument join " \
          "(select AVG(deal_amount)/AVG(deal_quantity) as val, deal_type, deal_instrument_id from " \
          "db_grad_cs_1917.deal group by deal_instrument_id, deal_type) as averages on averages.deal_instrument_id " \
            "= db_grad_cs_1917.instrument.instrument_id"
    mycursor.execute(sql)
    result = mycursor.fetchall()
    for x in result:
        print(x)


if __name__ == "__main__":
    groupby_instrument(connect())
