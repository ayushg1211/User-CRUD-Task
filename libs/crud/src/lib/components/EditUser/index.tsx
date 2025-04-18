import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';

interface Userid{
    userid:number ;
}

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

const EditUser: React.FC<Userid> = ({userid}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [user, setUser] = useState<DataType>();
  const [editData, setEditData] = useState({
    name:"",
    email:"" ,
    password:"",
    role:""
  })

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    // setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    // }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    let {name, value} = e.target ;
    setEditData(prev => ({...editData, [name]:value})) ;
  }


  useEffect(()=>{
    // Check if 'users' exist in localStorage and parse it if valid
    const storedUsers = localStorage.getItem('users');
    let users: DataType[] = [];

    if (storedUsers) {
      try {
        users = JSON.parse(storedUsers);
        setEditData
      } catch (error) {
        console.error('Error parsing users from localStorage:', error);
        // Handle the error if needed
      }
    }

    let theUser = (users?.find((item:DataType)=> item.id === userid)) as DataType ;
    setEditData(prev=> ({email:theUser.email, name:theUser.name, password:theUser.password, role:theUser.role}))
    setUser(prev=> theUser);

  },[])
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="">
            <Input placeholder='Name' type='text' id="name" name="name" value={editData.name} onChange={handleChange} />
            <Input placeholder='Email' type='email' id="email" name="email" value={editData.email} onChange={handleChange} />
            <Input placeholder='Password' type='password' id="password" name="password" value={editData.password} onChange={handleChange} />
            <Input placeholder='Role' type='text' id="role" name="role" value={editData.role} onChange={handleChange} />
        </form>
      </Modal>
    </>
  );
};

export default EditUser;