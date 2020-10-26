import React, { useState } from 'react'
import '../App.css';


export const Todo = () => {

    const [input, setInput] = useState();
    const [showArr, SetShowArr] = useState([]);
    const [editIndex, SetEditIndex] = useState();
    const [update, setUpdate] = useState();


    const ShowArrFunc = () => {
        let temp = [...showArr]
        temp.push(input)
        SetShowArr(temp)
        setInput("")

    }


    const Remove = (remIndex) => {
        let temp = [...showArr]
        temp = temp.filter((item, index) => index !== remIndex)
        SetShowArr(temp)
    }


    const Edit = (EditIndex) => {
        let temp = [...showArr]
        temp = temp.filter((item, index) => index === EditIndex)[0]
        console.log(temp)
        setInput(temp)
        SetEditIndex(EditIndex)
    }

    const Update = () => {
        let temp = [...showArr]
        temp[editIndex] = input
        SetShowArr(temp)
        SetEditIndex(false)
        setInput("")

    }

    const DeleteAll = () => {
        SetShowArr([])
    }

    return (
        <form action="javaScript:void(0)" onSubmit={() => {
            if (editIndex || editIndex === 0) {
                Update()
            } else ShowArrFunc()
        }}>
            <input type="text" onChange={(e) => { setInput(e.target.value) }} value={input} />
            <br />
            {showArr.map((item, index) =>
                <div key={index}>{item} <input type="button" onClick={() => Edit(index)} className="edit" value="Edit" /><input type="button" onClick={() => Remove(index)} value="X" /></div>
            )}
            <br />
            {(editIndex || editIndex === 0) ? <input type="submit" className="add" value="Update" /> : <input type="submit" className="update" value="add" />}
            <button onClick={() => DeleteAll()} className="deleteall">Delete All</button>
            {console.log(input, "input")}
        </form>
    )
}
