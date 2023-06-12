module.exports = {
    get: async function (db, collection, id, order, zanr) {
        let res = []
        if (id === null) {
            if (order.orderAttr === null) {
                if(zanr === null)
                    var collectionRef = db.collection(collection)
                else
                    var collectionRef = db.collection(collection).where("zanr", "==", zanr)
            } else {
                if(zanr === null)
                    var collectionRef = db.collection(collection).orderBy(order.orderAttr, order.orderType)
                else 
                    var collectionRef = db.collection(collection).orderBy(order.orderAttr, order.orderType).where("zanr", "==", zanr)
            }
            return collectionRef.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let document = {
                            id: doc.id,
                            data: doc.data()
                        }
                        res.push(document)
                    })
                    return Promise.resolve(res)
                })
                .catch((error) => {
                    return Promise.reject(error)
                })
        } else {
            var docRef = db.collection(collection).doc(id)
            return docRef.get()
                .then((doc) => {
                    if (typeof doc.data() !== 'undefined') {
                        let document = {
                            id: doc.id,
                            data: doc.data()
                        }
                        return Promise.resolve(document)
                    } else {
                        let error = (
                            "Error getting document " +
                            id +
                            ": The document is undefined"
                        )
                        return Promise.reject(error)
                    }
                })
                .catch(function (error) {
                    return Promise.reject(error)
                })
        }
    }
}