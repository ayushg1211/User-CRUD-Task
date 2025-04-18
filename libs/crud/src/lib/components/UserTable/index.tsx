import React, { useEffect, useState } from 'react';
import { Modal, Space, Table, Tag } from 'antd';
import { AsyncLocalStorage } from 'async_hooks';
import toast from 'react-hot-toast';
import EditUser from '../EditUser';

const { Column } = Table;

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

const UserTable: React.FC = () => {
  const [userData, setUserData] = useState<DataType[]>();

  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) {
      setUserData(JSON.parse(stored) as DataType[]);
    } else {
      fetchUserData();
    }

    async function fetchUserData() {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/users');
        const data = (await res.json()) as DataType[];
        setUserData(data);
        localStorage.setItem('users', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
  }, []);

  // Show delete confirmation
  const showDeleteConfirm = (id: number) => {
    let confirmation = confirm("Are You Sure");

    if(confirmation){
        handleDelete(id) ;
    }

  };

  const handleDelete = async (id: number) => {
    console.log(id) ;
    try{
        // const res = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
        //     method: 'DELETE',
        // });
      
        // if (!res.ok) {
        //     throw new Error('Network response was not ok');
        // }

        const updatedUsers = userData?.filter(user => user.id !== id) || [];

        // Update state & localStorage
        setUserData(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));


        toast.success(`User with ID ${id} deleted`);
      }

    catch(error){
        console.log("unable to delete", error) ;
        toast.error("Unable To Delete Account")
    }
  };

  return (
    <Table<DataType> dataSource={userData} rowKey="id">
      <Column title="ID" dataIndex="id" key="id" />
      <Column title="Name" dataIndex="name" key="id" />

      <Column title="Email" dataIndex="email" key="id" />
      <Column title="password" dataIndex="password" key="id" />
      <Column title="Role" dataIndex="role" key="id" />

      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <EditUser userid={record?.id}/>
            <a 
                      onClick={() => {
                        showDeleteConfirm(record.id);
                      }}
                      style={{ color: 'red' }}
             
            >
                Delete
            </a>
          </Space>
        )}
      />
    </Table>
  );
};

export default UserTable;
