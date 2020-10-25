function getRequests(db, username) {
    loc = db.ref("users").orderByChild("name").equalTo(username).get().val().values()[0]["location"]
    reqs = db.ref("requests").orderByChild("location").equalTo(loc).limitToLast(10).get().val().values()
    return reqs
}

export default getRequests