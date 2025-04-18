import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// Context Type
interface DataType {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
    creationAt: string;
    updatedAt: string;
}

interface ContextType{
    users: DataType[];
    addUser: (user:DataType) =>void ;
    removeUser: (user:DataType) =>void ;
    editUser: (user:DataType) => void ;
    setUsers: React.Dispatch<React.SetStateAction<DataType[]>>
}

// Create Context
const Context = createContext<ContextType | undefined>(undefined);

// Provider Component
export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<DataType[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    let allUsers: DataType[] = [];

    if (storedUsers) {
      try {
        allUsers = JSON.parse(storedUsers);
      } catch (error) {
        console.error('Error parsing users from localStorage:', error);
      }
    }

    setUsers(allUsers) ;

  }, []);

  const addUser= (user:DataType) => {
    let allusers = [...users, user] ;
    localStorage.setItem("users", JSON.stringify(allusers));
    setUsers(allusers);
  };

//   Edit User
  const editUser = (user:DataType) => {
    let allusers = [...users] ;
    let idx = users.findIndex((item)=> item.id === user?.id) ;
    allusers[idx] = {...user} ;
    localStorage.setItem("users", JSON.stringify(allusers)) ;
    setUsers(allusers) ;
  }

  const removeUser = (user:DataType) => {
        try{
            console.log(user)
            const updatedUsers = users?.filter(item => item.id !== user.id);
            console.log(updatedUsers) ;
            // Update state & localStorage

            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            toast.success(`User with ID ${user.id} deleted`);
        }

        catch(error){
            console.log("unable to delete", error) ;
            toast.error("Unable To Delete Account")
        }
  };

  return (
    <Context.Provider value={{ users, addUser, removeUser, editUser, setUsers }}>
      {children}
    </Context.Provider>
  );
};

// Custom hook
export const useAllUsers = () => {
  const context = useContext(Context);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};