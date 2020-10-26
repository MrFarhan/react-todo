import React, { useState } from 'react'


export const Todo = () => {
    const [arr, setArr] = useState();
    const [showArr, setShowArr] = useState([]);
    const [editInd, setEditInd] = useState();

    const ShowArrFunc = () => {
        let temp = [...showArr]
        temp.push(arr)
        setShowArr(temp)
        setArr("")
    }

    const Remove = (remIndex) => {
        let temp = [...showArr]
        temp = temp.filter((item, index) => index !== remIndex)
        setShowArr(temp)
    }

    const Edit = (editIndex) => {
        let temp = [...showArr]
        temp = temp.filter((item, index) => editIndex === index)[0]
        setArr(temp)
        setEditInd(editIndex)
    }

    const Update = () => {
        let temp = [...showArr]
        temp[editInd] = arr
        setShowArr(temp)
        setEditInd(false)
        setArr("")


    }

    return (
        <div>
            <input type="text" onChange={(e) => setArr(e.target.value)} value={arr} />
            <br />
            {showArr.map((item, index) =>
                <div key={index}>{item} <button onClick={() => Edit(index)}>Edit</button>     <button onClick={() => { Remove(index) }}>X</button> </div>
            )}
            <br />
            {editInd || editInd === 0 ? <button onClick={Update}>Update</button> : <button onClick={ShowArrFunc}>Add</button>}
            <br />

            {console.log(arr, "arr")}
        </div>
    )
}