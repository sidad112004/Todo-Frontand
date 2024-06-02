import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMyContext } from '../utilitiz/Contexapi';

function Todo({ title, id, created }) {
    const { change, setchange } = useMyContext();
    const [inputDisabled, setInputDisabled] = useState(true);
    const [inputValue, setInputValue] = useState(title);

    const handleDelete = async (e) => {
        e.preventDefault();
        console.log(id);
        try {
            await axios.post(
                'http://localhost:8000/users/todo/delect',
                { id },
                { withCredentials: true }
            )
                .then((Response) => {
                    toast.success("Todo deleted successfully");
                    setchange(true);
                    console.log(Response);
                })
                .catch((err) => {
                    toast.error(err.response.data.messages);
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        // console.log(id);
        // console.log(inputValue);
        if (inputDisabled) {
            setInputDisabled(false);

        } else {
            try {
                await axios.post(
                    'http://localhost:8000/users/todo/update',
                    { id, upadatedtitle: inputValue },
                    { withCredentials: true }
                )
                    .then((Response) => {
                        toast.success("Todo updated successfully");
                        console.log(Response);
                        setInputDisabled(true);

                    })
                    .catch((err) => {
                        toast.error(err.response.data.messages);
                        console.log(err);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className='justify-center items-center flex p-1.5 m-1.5'>
            <form className="flex flex-col max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0 justify-center items-center ">

                <div className="relative">
                    <input
                        type="text"
                        id="form-subscribe-Subscribe"
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-96 py-2 px-4 bg-slate-900 text-white font-bold"
                        placeholder={title}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={inputDisabled}
                    />
                </div>
              
                <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-red-700 rounded-lg"
                    type="submit"
                    onClick={handleDelete}
                >
                    Delete
                </button>
                <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit"
                    onClick={handleUpdate}
                >
                    {inputDisabled ? "Edit" : "Update"}
                </button>
                <div className=''>{created.slice(0, 10)}</div>

               
            </form>
        </div>
    );
}

export default Todo;
