module.exports = {
    get: async function (db, collection, id, order, zanr, name) {
        let res = []
        if (id === null) {
            let collectionRef = db.collection(collection)

            // If genre (zanr) is specified, add a where clause
            if(zanr) {
                collectionRef = collectionRef.where("zanr", "==", zanr)
            }
            
            // If name is specified, add a where clause
            if(name) {
                collectionRef = collectionRef.where("naziv", "==", name)
            }

            // If ordering is specified, add an orderBy clause
            if(order.orderAttr) {
                collectionRef = collectionRef.orderBy(order.orderAttr, order.orderType)
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
