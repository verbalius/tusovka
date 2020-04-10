# ----------------------------------------------
# Maintainer: Mykola Lev
#
# Github repo: verbalius/tusovka-flask-webapp
#
# ----------------------------------------------
from flask import Flask, render_template

app = Flask(__name__,
            static_url_path='', 
            static_folder='static/')


@app.route("/")
def root():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/version")
def app_version():
    return "2.0"

#--------Main------------------
if __name__ == "__main__":
    app.debug = True
    app.run()
#------------------------------