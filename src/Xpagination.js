import React,{useEffect,useState} from 'react';
import './Xpagination.css';


function Xpagination() {
  const apiUrl = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
  const itemsPerPage = 10;
  const [employeeData,setEmployeeData] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await fetch(apiUrl);
        const res = await response.json();
        setEmployeeData(res)
      } catch (error) {
        console.error('Error fetching employee data:', error);
        alert("Error fetching employee data")
      }
    }
    fetchData();
  },[])
  const totalItems = employeeData.length;
  const totalPages = Math.ceil(totalItems/itemsPerPage);

  const handleNextPage = ()=>{
    if(currentPage < totalPages){
      setCurrentPage(currentPage+1)
    }
  }

  const handlePrevPage = ()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  }

  const indexOfLastItem = currentPage*itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = employeeData.slice(indexOfFirstItem,indexOfLastItem); 
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
            {
              currentData.map((employee)=>(
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
            <div className='pagination'>
              <button onClick={handlePrevPage} disabled={currentPage===1}>
                Previous
              </button>
              <span>{currentPage}</span>
              <button onClick={handleNextPage} disabled={currentPage===totalPages}>
                Next
              </button>
            </div>
    </div>
  );
}

export default Xpagination;
