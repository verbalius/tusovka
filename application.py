# ----------------------------------------------
# Maintainer: Mykola Lev
#
# Github repo: verbalius/tusovka-flask-webapp
#
# ----------------------------------------------
from flask import Flask, render_template
import json

application = Flask(__name__,
                    static_url_path='', 
                    static_folder='static/',)


@application.route("/")
def root():
    return render_template("index.html")

def get_data_from_radio_server():
    # request page form radio
    url = "radio.tusovka.ml/status-json.xsl"
    # parse dj and artist and title
    # return in dictionary style
    return json.loads(parsed_data)

@application.route("/whats_playin")
def whats_playin():
    who_and_what = {'dj': None,'artist': None,'title': None}
    data_from_radio_server = get_data_from_radio_server()

    if data_from_radio_server:
        who_and_what['dj'] = data_from_radio_server['dj']
        who_and_what['artist'] = data_from_radio_server['artist']
        who_and_what['title'] = data_from_radio_server['title']
    else:
        who_and_what['dj'] = 'nobody'

    return json.dumps(who_and_what)

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