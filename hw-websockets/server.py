import asyncio
import websockets
import requests
import json
import threading
import mysql.connector

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
    count = 0
    for line in r.iter_lines(decode_unicode = True):
        if line != "":
            line = line[5:]
            print(line)
            instrument = line.split('instrumentName": "')[1]
            instrument = instrument.split('"')[0]
            cpty = line.split('"cpty": "')[1]
            cpty = cpty.split('"')[0]
            price = line.split('price": ')[1]
            price = price.split(',')[0]
            type = line.split('type": "')[1]
            type = type.split('"')[0]
            quantity = line.split('quantity": ')[1]
            quantity = quantity.split(',')[0]
            time = line.split('time": "')[1]
            time = time.split('"')[0]
            sql = "INSERT INTO instrument (instrument_id, instrument_name) VALUES (%s, %s)"
            val = (instrument)
            val = (id(val), instrument)
            mycursor.execute(sql, val)
            mydb.commit()
            sql = "INSERT INTO deal (deal_id, deal_time, deal_type, deal_amount, deal_quantity) VALUES (%s, %s, %s, %s, %s)"
            val = (time, type, price, quantity)
            val = (id(val), time, type, price, quantity)
            mycursor.execute(sql, val)
            mydb.commit()
            count+=1
            if count > 1000:
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


