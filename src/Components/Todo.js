import React, { useState } from 'react'

export const Todo = () => {
    const [inputVal, setInputVal] = useState()
    const [arr, setArr] = useState([])
    const [editIndex, setEditIndex] = useState()
    const [data, setData] = useState([[]]);
    const [redo, setRedo] = useState([[]]);



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


    const Undo = () => {

        let temp1 = [...data]
        let temp2 = [...redo]
        console.log(temp1, "temp 1")
        if (temp1.length) {
            temp2.unshift(data[0])
            setRedo([arr])
            setArr(data[0])
            temp1.shift()
            setData(temp1)

        }
    }    
    
    const Redo = () => {
        let temp1 = [...redo]
        if (redo.length) {
            setArr(redo[0])
            temp1.shift()
            setRedo(temp1)

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
            <input type="button" value="Undo" onClick={Undo} />
            <input type="button" value="Redo" onClick={Redo} />

        </form>
    )
}
