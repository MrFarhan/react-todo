import React, { useState } from 'react'

export const Todo = () => {
    const [inputVal, setInputVal] = useState()
    const [arr, setArr] = useState([])
    const [editIndex, setEditIndex] = useState()
    const [data, setData] = useState([[]]);



    //FUNCTIONS 
    const Add = () => {
        let temp = [...arr]
        if (inputVal.trim().length) {
            let temp1 = [...data]
            temp1.unshift(arr)
            setData(temp1)
            temp.push(inputVal?.toUpperCase())
            setArr(temp)
            setInputVal("")
        }
    }




    const Delete = (DeleteIndex) => {
        let temp = [...arr]
        let temp1 = [...data]
        temp1.unshift(arr)
        setData(temp1)
        temp = temp.filter((value, index) => index !== DeleteIndex)
        setArr(temp)
        setInputVal("")

    }

    const Edit = (Editvalue, EditIndex) => {
        let temp = [...arr]
        setInputVal(temp[EditIndex])
        setEditIndex(EditIndex)

    }

    const Update = () => {
        if (inputVal.trim().length) {
            let temp = [...arr]
            let temp1 = [...data]
            temp1.unshift(arr)
            setData(temp1)
            temp[editIndex] = inputVal?.toUpperCase()
            setArr(temp)
            setEditIndex(false)
            setInputVal("")

        }
    }

    const Deleteall = () => {
        let temp1 = [...data]
        temp1.unshift(arr)
        setData(temp1)
        let temp = [...arr]
        temp = []
        setArr(temp)
    }


    const UndoDelete = () => {
        let temp1 = [...data]
        console.log(temp1, "temp 1")
        if (temp1.length) {
            setArr(temp1[0])
            temp1.shift()
            setData(temp1)

        }
    }


    return (


      /* eslint-disable-line no-script-url */ <form action="javaScript:void(0)" >

            <input type="text" onChange={((e) => setInputVal(e.target.value))} value={inputVal} /><br /><br />
            {arr.map((value, index) => {
                return <div key={index}>{value}  <span onClick={() => Delete(index)}>X</span><input type="button" onClick={() => Edit(value, index)} value="Edit" /> </div>
            })}
            <br /><br />        {editIndex || editIndex === 0 ? <input type="submit" onClick={() => Update()} value="Update" /> : <button onClick={() => Add()}>Add</button>}
            <input type="button" onClick={Deleteall} value="Delete all" />
            <input type="button" value="Undo delete" onClick={UndoDelete} />

        </form>
    )
}
