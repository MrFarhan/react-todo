import React, { useState } from 'react'

export const Todo = () => {
    const [todoVal, updateTodoVal] = useState("");
    const [arr, showArr] = useState([]);
    const [editIndex, setEditIndex] = useState();

    const Add = () => {
        console.log(arr, "arr add")
        if (todoVal !== " " && todoVal !== "") {
            let temp = [...arr]
            temp.push(todoVal)
            console.log(temp)
            showArr(temp)

            updateTodoVal("")
        }
    }

    const Delete = (deleteIndex) => {
        let temp = [...arr]
        temp = temp.filter((value, index) => index !== deleteIndex)
        showArr(temp)

    }

    const Edit = (editValue, editIndex) => {

        updateTodoVal(editValue)
        console.log(editValue, "temp")
        setEditIndex(editIndex)

    }

    const Update = () => {

        let temp = [...arr]

        temp[editIndex] = todoVal
        // temp.push(todoVal)[updateIndex]
        showArr(temp)
        updateTodoVal("")
        setEditIndex(false)


    }
    return (



        <div>
            <input type="text" onChange={((e) => updateTodoVal(e.target.value))} value={todoVal} /><br /><br />
            {arr?.map((value, index) => (<div key={index}>{value} &nbsp; &nbsp; &nbsp; <span onClick={() => Delete(index)}>X</span><button onClick={() => Edit(value, index)}>Edit</button> </div>)
            )}
            {console.log(todoVal)}
            <br /><br />

            {editIndex || editIndex === 0 ? <button onClick={Update}>Update</button> : <button onClick={Add}>Add</button>}

        </div>
    )
}
