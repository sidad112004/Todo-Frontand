import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
function Signup() {

    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [fullname, setfullname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');


    const handlesignup = async (e) => {
        e.preventDefault();
        if(username===''||password===''||email===''||fullname===''){
            toast.error("Enter all information");
            return ;
        }   
        try {
            await axios.post('http://localhost:8000/users/register',
            {
                username,password,fullname,email
            },
            {withCredentials: true})
            .then((Response)=>{

                console.log(Response)
                toast.success("Signup successfully");
                navigate('/login')
            })
            .catch((err)=>{
                console.log("dsf");
                toast.error(err.response.data.messages);
                console.log(err)

            })

        } catch (error) {
            
             console.log(error);
        }

    }
    return (
        <div className='flex h-screen justify-center items-center '>

            <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10 ">
                <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
                    SignUp
                </div>
                <div className="mt-8 flex justify-center items-center">
                    <form action="#" autoComplete="off">
                        <div className="flex flex-col mb-2  ">
                            <div className="flex relative w-full ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white  border-gray-300 text-gray-500 shadow-sm text-sm w-24">
                                    USERNAME
                                </span>
                                <div>
                                    <input type="text" id="sign-in-username" className=" w-64 rounded-r-lg flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        value={username}
                                        onChange={(e) => setusername(e.target.value)}
                                        placeholder="Your usename" />
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col mb-2">
                            <div className="flex relative w-full">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-24">
                                    EMAIL
                                </span>
                                <div>
                                    <input type="text" id="sign-in-email" className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-64 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        placeholder="Your email" />
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-24">
                                    FULLNAME
                                </span>
                                <div>
                                    <input type="text" id="sign-in-fullname" className=" rounded-r-lg flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-64 "
                                        value={fullname}
                                        onChange={(e) => setfullname(e.target.value)}
                                        placeholder="Your Fullname" />
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-col mb-2">
                            <div className="flex relative ">
                                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-24">
                                    PASSWORD
                                </span>
                                <div>
                                    <input type="text" id="sign-in-password" className=" rounded-r-lg flex-1 appearance-none border border-gray-300  py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-64 "
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        placeholder="Your Password" />
                                </div>
                            </div>

                        </div>

                        <div className="flex w-full">
                            <button type="submit" className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-96 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "

                                onClick={handlesignup}>
                                SignUp
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <Link className="nav-link active" aria-current="page" to="/login">I have account
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Signup;
