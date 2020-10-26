import React, { useState } from 'react'


export const Todo = () => {
    const [updateVal, setUpdateVal] = useState("");
    const [arr, updatedarr] = useState([]);
    const [updateInd, setUpdateInd] = useState();

    const updatedarray = () => {
        let data = [...arr]
        if (updateVal !== "" || " ") {
            data.push(updateVal)
            updatedarr(data)
            setUpdateVal("")
        }
    }
    const RemoveInd = (remIndex) => {
        let Updatedarray = [...arr]
        Updatedarray = Updatedarray.filter((item, index) => remIndex !== index)
        updatedarr(Updatedarray)
    }

    const updateValue = (updateValInd)=>{
        let updatevalue = [...arr]
        let temp = updatevalue.filter((item, index)=> updateValInd === index)[0]
        setUpdateVal(temp)
        setUpdateInd(updateValInd)
    }


    return (
        <div>
            <input type="text" onChange={(e) => setUpdateVal(e.target.value)} value={updateVal} />
            <br />
            {arr.map((item, index) =>
                <div key={index}> {item}  <button value={index} onClick={()=> updateValue(index)}>Edit</button> <button value={index} onClick={() => RemoveInd(index)}>X</button> </div>
            )}
            <br />
            {updateInd || updateInd === 0 ? 
            <button onClick={updatedarray}> Update </button>:
            <button onClick={updatedarray}> Add </button>
        }
            {/* {console.log(updatedarray)} */}
        </div>
    )
}

    // {{console.log(updateVal, "updateval")} }
    // {console.log(updatedarray, "updatedarray")}
