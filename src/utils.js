import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import db from './firebase/firebase'



const getAll = (type, dispatch, myCollection) => {
    const q = query(collection(db, myCollection))
    const data = onSnapshot(q, (onSnapshotQuery) => {
        const data = onSnapshotQuery.docs.map(doc => { return { id: doc.id, ...doc.data() } })
        dispatch({ type: type, payload: data })
    })
}

const getByID = (type, dispatch, myCollection, id) => {
    const q = query(doc(db, myCollection, id));
    onSnapshot(q, (doc) => {
        if (type == '') {
            const data = doc.data()
            return doc
        } else {
            dispatch({ type: type, payload: { data: doc.data(), id: doc.id } })

        }
    })
}

const update = async (type, dispatch, myCollection, id, obj) => {
    const q = query(doc(db, myCollection, id));

    await updateDoc(q, obj)
    dispatch({ type: type, payload: obj })
}
const addItem = async (type, dispatch, myCollection, obj, nav) => {
    const q = query(collection(db, myCollection))

    await addDoc(q, obj).then((doc) => {
        dispatch({ type: type, payload: { ...obj, id: doc.id } })
    })

    nav('/products')

}
const addItemPurchase = async (type, dispatch, myCollection, obj, nav, purObj) => {
    const q = query(collection(db, myCollection));
    const purchaseQ = query(collection(db, 'purchases'));

    let purId;
    let qDocId;

    // Add obj to the 'q' collection
    await addDoc(q, obj).then(async (docRef) => {
        qDocId = docRef.id;
        obj = { ...obj, id: qDocId }; // Add the document ID to the obj

        // Now, add purObj to the 'purchases' collection
        await addDoc(purchaseQ, purObj).then((purchaseDoc) => {
            purId = purchaseDoc.id;
            dispatch({ type: 'CREATE-PURCHASE', payload: { ...purObj, id: purchaseDoc.id } });

            // Update the purchaseQ document with the qDocId
            updateDoc(doc(purchaseQ, purId), { customerId: qDocId });

            // Update the obj with the purId
            const newObj = { ...obj, purId: [purId] };

            // Update the 'q' document with the newObj
            updateDoc(doc(q, qDocId), newObj);

            dispatch({ type: type, payload: newObj });
        });
    });



    // Call the updateDocId function with the purId
    updateDocId(purId);

    nav('/products');
};
async function custPurchase(custId, purObj, custObj, dispatch) {
    const purQ = query(collection(db, 'purchases'))
    const custQ = query(doc(db, 'customers', custId));
    let purchaseId

    await addDoc(purQ, purObj).then(async (d) => {
        const q = query(doc(db, 'purchases', d.id))
        purObj = { ...purObj, id: d.id }
        purchaseId = d.id
        await updateDoc(q, purObj)
    })

    let obj = { ...custObj }
    obj = { ...obj, purId: [...obj.purId, purchaseId] }


    await updateDoc(custQ, obj)
    dispatch({ type: 'UPDATE-CUST', payload: obj })


}

const updateDocId = async (purId) => {
    // Implement your logic to update the 'purchases' document with its own ID
    // For example, you can use updateDoc here
    const purchaseQ = query(collection(db, 'purchases'));
    await updateDoc(doc(purchaseQ, purId), { id: purId });
};



const removeItem = async (type, dispatch, myCollection, id) => {
    const q = query(doc(db, myCollection, id));

    await deleteDoc(q);
    dispatch({ type: type, payload: id })
}

const getQueryData = async (myCollection, myKey, myOperator, myValue) => {
    const collectionRef = collection(db, myCollection)
    let final = []
    const q = await query(collectionRef,
        where(myKey, myOperator, myValue)
    )
    const data = await getDocs(q)
    data.forEach(d => {
        final.push(d.data());
    })
    return final
}


export default { getAll, getByID, update, addItem, removeItem, getQueryData, addItemPurchase, updateDocId, custPurchase };