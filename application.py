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

listeners = {}
application = Flask(__name__,
                    static_url_path='', 
                    static_folder='static/',)

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
    now = datetime.datetime.now()
    listeners[request.remote_addr] = now.minute
    return str(len(listeners))

@application.route("/about")
def about():
    return render_template("about.html")

def whos_tf_here(what_to_do="run"):
    now = datetime.datetime.now()

    # kick inactive listeners
    for listener in listeners:
        if (abs(listeners[listener] - now.minute)) > 5:
            listeners.pop(listener_id, None)

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