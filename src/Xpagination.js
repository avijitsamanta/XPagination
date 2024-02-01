import React, { useState, useEffect } from 'react';
import './Xpagination.css'; // Import a CSS file for styling (create this file)

const Xpagination = () => {
  const apiUrl = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
  const itemsPerPage = 10;
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setEmployeeData(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      alert('Error fetching employee');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalItems = employeeData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employeeData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1>Employee Data Table</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Xpagination;
