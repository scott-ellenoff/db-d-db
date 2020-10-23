import server
import sys
import mysql.connector

def bootapp():
    server.init_service()
    print(sys.version)

if __name__ == "__main__":
    bootapp()