import React, { useContext, useEffect, useState } from 'react';
import Todo from './Todo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMyContext } from '../utilitiz/Contexapi';

function Home() {
  const [data, setData] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const { change, setchange } = useMyContext();
  const navgate = useNavigate();
 
  const handleTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/users/todo/create',
        { title: newTodo },
        { withCredentials: true }
      );

      toast.success('Todo added successfully');
      console.log(response);
      setchange(true);
      setNewTodo('');
    }
    catch (err) {
      toast.error(err.response.data.messages);
      console.error(err);
    }
  };


  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/users/logout',
      {},
      { withCredentials: true })
      .then((Response) => {
        toast.success("Logout successfully");
        console.log(Response);
        navgate('/login');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/users/todo',
          {},
          { withCredentials: true }
        );
        
        setData(response.data.data);
        console.log(response.data.data);
        setchange(false);
      } catch (error) {
  
        console.error(error);
        navgate('/login');
      }
    };
    fetchData();
  }, [change]);

 




  

  return (
    <div>
      <div className='flex justify-end p-4 '>

        <button
          className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          type="submit"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className='flex justify-center p-24 w-full'>
        <form className="flex flex-col max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
          <div className="relative">
            <input
              type="text"
              id="&quot;form-subscribe-Subscribe"
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-64 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add Todo"
            />
          </div>
          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            type="submit"
            onClick={handleTodo}
          >
            POST
          </button>
        </form>
      </div>
      {data.map((todo) => (
        <div key={todo._id}>
          <Todo title={todo.title} 
            id={todo._id}
           created={todo.updatedAt} />
        </div>
      ))}
    </div>
  );
}

export default Home;
