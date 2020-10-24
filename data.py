from firebase import Firebase
import clusters

config = {
  "apiKey": "",
  "authDomain": "",
  "databaseURL": "",
  "storageBucket": ""
}

firebase = Firebase(config)
db = firebase.database()

#Declaring the variables initially (will be updated constantly)
data = {}
rec_info = []
rec_groups = {}

#Initial creation of "groups" entry
db.child("rec_data").child("groups").set(rec_info)

#This is done whenever a new user is created
def data_added(message):
  data = db.child("users").get().val()

  #Resetting variables for next round of updates
  rec_info.clear()
  rec_index = 0

  #Formatting the user data into the arrays we need for recs
  for user in data.values():
    rec_entry = []
    rec_entry[0] = user["name"]
    rec_entry[1] = user["location"]
    rec_entry[2] = user["preference"]

    rec_info[rec_index] = rec_entry

    #Updating groups in database
    rec_groups = clusters.form_groups(rec_info)
    db.child("rec_data").child("groups").update(rec_groups)

#Will run data_added() whenever user is created
stream = db.child("users").stream(data_added)