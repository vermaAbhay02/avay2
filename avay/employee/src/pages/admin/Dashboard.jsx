import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from './table/TableComponent ';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  const columns = [
    {
      Header: 'S.No.',
      accessor: (row, index) => index + 1, // Add serial numbers starting from 1
      width: 100,
    },
    {
      Header: 'Name',
      accessor: 'name',
      width: 100,
    },
    {
      Header: 'Login Time',
      accessor: 'loginTime',
      width: 200,
      Cell: ({ value }) => {
        const formattedTime = new Date(value).toLocaleString();
        return <span>{formattedTime}</span>;
      },
    },
    {
      Header: 'Logout Time',
      accessor: 'logoutTime',
      width: 200,
      Cell: ({ value }) => {
        if (!value) return <span>-------------------</span>;
        const formattedTime = new Date(value).toLocaleString();
        return <span>{formattedTime}</span>;
      },
    },
    {
      Header: 'Status',
      accessor: row => (
        <div>
          <span style={{ marginRight: '5px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: row.islogin ? 'green' : 'red', display: 'inline-block' }}></span>
          <span>{row.islogin ? 'Online' : 'Offline'}</span>
        </div>
      ),
      width: 100,
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/user/getuser');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData(); 

    const intervalId = setInterval(fetchData, 1000); 

    return () => {
      clearInterval(intervalId); // Cleanup interval
    };
  }, []); 

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const filteredData = data.filter(row =>
    row.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className='container mt-3 shadow1 p-4'>
      <div className="row">
        <div className="col-lg-10">
          <div className="head-title">
            <h2 className='mr-4'>Welcome <span className='text-danger'>Admin</span>!</h2>
            <small className='text-muted'>Employee Presence Table:</small>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="search">
            <input
              className='mr-3 form-control'
              type="search"
              placeholder='Search Names'
              value={filterValue}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TableComponent columns={columns} data={filteredData} />
      )}
    </div>
  );
}

export default Dashboard;
