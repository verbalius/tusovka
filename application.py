# ----------------------------------------------
# Maintainer: Mykola Lev
#
# Github repo: verbalius/tusovka-flask-webapp
#
# ----------------------------------------------
from flask import Flask, request, render_template
import datetime
import threading
import json
from requests import get
import atexit
import sqlite3 as sql
import re

application = Flask(__name__,
                    static_url_path='', 
                    static_folder='static/',)

def create_db_if_not_present():
    with sql.connect("active_users.db") as con:
        cur = con.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='online_users';")
        #if the count is 0, then create table
        if not cur.fetchone():
            cur.execute("CREATE TABLE online_users (ip TEXT, time INTEGER);")
            con.commit()

    return 0

create_db_if_not_present()

@application.route("/")
def root():
    return render_template("index.html")

@application.route("/whats_playin")
def whats_playin():
    return get('http://radio.tusovka.ml:8000/status-json.xsl').content


@application.route("/whos_here")
def whos_here():
    # record who is currently on the site listening
    # attach a timestamp whenver get a whos_here request
    now = datetime.datetime.now().minute
    pattern = re.compile("\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}")
    if pattern.match(request.remote_addr):
        ip = request.remote_addr
    else:
        return "1" # show that you are the only one listener

    with sql.connect("active_users.db") as con:
        con.row_factory = sql.Row
        cur = con.cursor()
        cur.execute("SELECT * FROM online_users WHERE ip=?;", [ip])
        rows = cur.fetchall()

        if rows:
            cur.execute("UPDATE online_users SET time=? WHERE ip=?;",(now,ip))
            con.commit()
        else:
            # ------------------- name TEXT, time INTEGER ------------------- 
            cur.execute("INSERT INTO online_users (ip,time) VALUES (?,?);",(ip,now))  
            con.commit()
        if len(rows) == 0:
            return "1"

        return str(len(rows))

    return "1" # show that you are the only one listener if it doesn't work

@application.route("/about")
def about():
    return render_template("about.html")

def whos_tf_here(what_to_do="run"):
    now = datetime.datetime.now().minute

    # kick inactive listeners if they were out for 6 minutes
    with sql.connect("active_users.db") as con:
        cur = con.cursor()
        cur.execute("DELETE FROM online_users WHERE ABS(time-? > 6);", [now])
        con.commit()

    # schedule next occurence in 5 minutes if not "stop"
    watcher_thread = threading.Timer(300, whos_tf_here)
    if what_to_do == "stop":
        print("[INFO] Kicker watchdog stopping..")
        watcher_thread.cancel()
        return 0
    else:
        print("[INFO] Kicker watchdog starting..")
        watcher_thread.start()

def interrupt():
    whos_tf_here("stop")

# if interrupt to stop, also stop all threads
atexit.register(interrupt)
whos_tf_here()

#--------Main------------------
if __name__ == "__main__":
    application.debug = True
    application.run()
#------------------------------
