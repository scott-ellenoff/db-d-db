import asyncio
import websockets
import requests
import json
import threading
import mysql.connector
import datetime
import time

# I've broken the code down into small steps so that each step can be expained carefully

# get the event loop so that you stop it gracefully
eventLoop = asyncio.get_event_loop()

async def echo(websocket, path):
    async for message in websocket:
        print( message )
        await websocket.send(message)
        # if the client sends a character string "quit" then stop the event loop
        if message == "quit" :
            eventLoop.stop()

def timeformatter(t):
    name2num = {"Jan" : 1, "Feb" : 2, "Mar" : 3, "Apr" : 4, "May" : 5,
                "Jun" : 6, "Jul" : 7, "Aug" : 8, "Sep" : 9, "Oct" : 10,
                "Nov": 11, "Dec" : 12}
    day,month,year = t.split("-")
    month = name2num[month]
    year = year.split("(")[0]
    day = int(day)
    year = int(year)
    t = t.split("(")[1]
    hour,minute,second = t.split(":")
    second = second.split(".")[0]
    hour = int(hour)
    minute = int(minute)
    second = int(second)
    t = datetime.datetime(year, month, day, hour, minute, second)
    return t

def dataRetrieval():
    url = "http://127.0.0.1:5000/streamTest/sse"
    r = requests.get(url, stream = True)
    mydb = mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "ppp",
        database = "db_grad_cs_1917"
    )
    mycursor = mydb.cursor()
    dealId = 1000
    instrumentId = 500
    cptyId = 700
    for line in r.iter_lines(decode_unicode = True):
        if line != "":
            line = line[5:]
            print(line)
            instrument = line.split('instrumentName": "')[1]
            instrument = instrument.split('"')[0]
            sql = "Select * FROM instrument WHERE instrument_name = %s"
            val = (instrument, )
            mycursor.execute(sql,val)
            resp = mycursor.fetchone()
            print(resp)
            if(resp == None):
                sql = "INSERT INTO instrument (instrument_id, instrument_name) VALUES (%s, %s)"
                val = (instrumentId, instrument)
                mycursor.execute(sql, val)
                mydb.commit()
                instrumentId += 1
                deal_instrument_id = mycursor.lastrowid
            else:
                deal_instrument_id = resp[0]

            cpty = line.split('"cpty": "')[1]
            cpty = cpty.split('"')[0]
            t = line.split('time": "')[1]
            t = t.split('"')[0]
            t = timeformatter(t)

            sql = "Select * FROM counterparty WHERE counterparty_name = %s"
            val = (cpty,)
            mycursor.execute(sql, val)
            resp = mycursor.fetchone()
            if (resp == None):
                sql = "INSERT INTO counterparty " \
                      "(counterparty_id, counterparty_name, counterparty_status, counterparty_date_registered)" \
                      " VALUES (%s, %s, %s, %s)"
                val = (cptyId, cpty, "A", time.strftime('%Y-%m-%d %H:%M:%S'))
                mycursor.execute(sql, val)
                mydb.commit()
                cptyId += 1
                deal_cpty_id = mycursor.lastrowid
            else:
                deal_cpty_id = resp[0]

            price = line.split('price": ')[1]
            price = price.split(',')[0]
            type = line.split('type": "')[1]
            type = type.split('"')[0]
            quantity = line.split('quantity": ')[1]
            quantity = quantity.split(',')[0]

            sql = "INSERT INTO deal " \
                  "(deal_id, deal_time, deal_type, deal_amount, deal_quantity," \
                  " deal_instrument_id, deal_counterparty_id)" \
                  " VALUES (%s, %s, %s, %s, %s, %s, %s)"
            val = (dealId, time.strftime('%Y-%m-%d %H:%M:%S'), type, price, quantity, deal_instrument_id, deal_cpty_id)
            mycursor.execute(sql, val)
            mydb.commit()
            dealId+=1
            if dealId > 1000:
                break
            print(mycursor.rowcount, "record inserted.")




def init_service():
    dataThread = threading.Thread(target = dataRetrieval)
    dataThread.start()
    print("waiting for data...")
    wsFuture = websockets.serve(echo, '0.0.0.0', 8080)
    # schedule echo() to run
    eventLoop.run_until_complete( wsFuture )
    # run all waiting tasks
    eventLoop.run_forever()
    print("run forever terminated")


