from firebase import Firebase
from flask import Flask
from flask import request

config = {
  "apiKey": "AIzaSyCvi2swwP019a9pmwztVjWnXs1pLpjYGf8",
  "authDomain": "horizon-bff5f.firebaseapp.com",
  "databaseURL": "https://horizon-bff5f.firebaseio.com",
  "storageBucket": "horizon-bff5f.appspot.com"
}

firebase = Firebase(config)
db = firebase.database()

app = Flask(__name__)

#Servlet to handle requests for users that can help
@app.route('/rec', method=['POST'])
def recommend():
    loc = request.form['loc']
    type = request.form['type']
    group = (loc, type)

    #Query that finds users with the same location/preference combo as their request
    query = db.child("rec_data").child("group").order_by_child("group").equal_to(group).get().val()
    people = query["people"]

    #The response to the request, with the people that can help
    response = {"people": people}
    return response