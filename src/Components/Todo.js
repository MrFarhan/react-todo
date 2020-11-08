import firebase from 'firebase'
import React, { useState, useEffect } from 'react'





export const Todo = () => {
    const [inputVal, setInputVal] = useState()
    const [arr, setArr] = useState([])
    const [editIndex, setEditIndex] = useState()
    const [data, setData] = useState([[]]);
    const [redo, setRedo] = useState([[]]);

    useEffect(() => {
        firebase.database().ref('Todo/Data').on('value', function (snapshot) {
            var dbData = (snapshot.val()) ? snapshot.val() : [];
            setArr(dbData)
        });
        firebase.database().ref('Todo/Undo').on('value', function (snapshot) {
            var dbData = (snapshot.val()) ? snapshot.val() : [];
            setData(dbData)
        });
        firebase.database().ref('Todo/Redo').on('value', function (snapshot) {
            var dbData = (snapshot.val()) ? snapshot.val() : [];
            setRedo(dbData)
        });


    }, [])

    //FUNCTIONS 
    const Add = () => {
        let temp = [...arr]
        if (inputVal?.trim().length) {
            let temp1 = data?.length ? [...data] : [""]
            if (temp.length)
                temp1?.unshift(temp)
            firebase.database().ref('Todo/Undo').set(temp1)
                .then(() => {
                    temp.push(inputVal?.toUpperCase())
                    firebase.database().ref('Todo/Data').set(temp)
                    setInputVal("")
                })
        }
    }




    const Delete = (DeleteIndex) => {
        let temp = [...arr]
        let temp1 = [...data]
        temp1.unshift(arr)
        firebase.database().ref('Todo/Undo').set(temp1)
        temp = temp.filter((value, index) => index !== DeleteIndex)
        firebase.database().ref('Todo/Data').set(temp);
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
            firebase.database().ref('Todo/Undo').set(temp1)
            temp[editIndex] = inputVal?.toUpperCase()
            firebase.database().ref('Todo/Data').set(temp);
            setEditIndex(false)
            setInputVal("")
        }
    }

    const Deleteall = () => {
        let temp1 = [...data]
        temp1.unshift(arr)
        firebase.database().ref('Todo/Undo').set(temp1)
        let temp = [...arr]
        temp = []
        setArr(temp)
        firebase.database().ref('Todo/Data').remove();

    }


    const Undo = () => {
        let temp1 = data.length ? [...data] : [""]
        let temp2 = [...redo]
        console.log(temp1, "temp 1")
        if (temp1.length) {
            if(arr.length)
            temp2.unshift(arr)
            firebase.database().ref('Todo/Redo').set(temp2)
                .then(() => {
                    firebase.database().ref('Todo/Data').set(temp1[0])
                        .then(() => {
                            if (data.length)
                                temp1.shift()
                            firebase.database().ref('Todo/Undo').set(temp1)
                        })
                })

        }
    }

    const Redo = () => {
        let temp1 = [...redo]
        let temp2 = data?.length ? [...data] : [""]
        let temp3 = arr.length ? [...arr] : [""]
        if (temp1.length) {
            if (arr.length)
                temp2.unshift(temp3)
            firebase.database().ref('Todo/Undo').set(temp2)
                .then(() => {
                    firebase.database().ref('Todo/Data').set(temp1[0])
                        .then(() => {
                            temp1.shift()
                            firebase.database().ref('Todo/Redo').set(temp1)
                        })
                })
        }
    }


    return (


        /* eslint-disable-line no-script-url */ <form action="javaScript:void(0)" >

            <input type="text" onChange={((e) => setInputVal(e.target.value))} value={inputVal} autoFocus={true} /><br /><br />
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
