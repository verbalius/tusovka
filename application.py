# ----------------------------------------------
# Maintainer: Mykola Lev
#
# Github repo: verbalius/tusovka-flask-webapp
#
# ----------------------------------------------
from flask import Flask, request, render_template
import json
from requests import get

application = Flask(__name__,
                    static_url_path='', 
                    static_folder='static/',)


@application.route("/")
def root():
    return render_template("index.html")

@application.route("/whats_playin")
def whats_playin():
    return get('http://radio.tusovka.ml/status-json.xsl').content

@application.route("/about")
def about():
    return render_template("about.html")

@application.route("/version")
def app_version():
    return "2.0"

#--------Main------------------
if __name__ == "__main__":
    application.debug = True
    application.run()
#------------------------------