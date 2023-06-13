module.exports = {
    get: async function (db, collection, id, order, naziv) {
        let res = []
        if (id === null) {
            if (order.orderAttr === null) {
                if(naziv === null)
                    var collectionRef = db.collection(collection)
                else
                    var collectionRef = db.collection(collection).where("naziv", "==", naziv)
            } else {
                if(naziv === null)
                    var collectionRef = db.collection(collection).orderBy(order.orderAttr, order.orderType)
                else 
                    var collectionRef = db.collection(collection).orderBy(order.orderAttr, order.orderType).where("naziv", "==", naziv)
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
                var docRef = db.collection(collection).doc(id);
                return docRef.get()
                    .then((doc) => {
                        if (doc.exists) {
                            return docRef.collection("recenzije").get();
                        } else {
                            let error = (
                                "Error getting document " +
                                id +
                                ": The document is undefined"
                            )
                            return Promise.reject(error);
                        }
                    })
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            let document = {
                                id: doc.id,
                                data: doc.data()
                            }
                            res.push(document);
                        })
                        return Promise.resolve(res);
                    })
                    .catch(function (error) {
                        return Promise.reject(error);
                    })
            }
        }
    }