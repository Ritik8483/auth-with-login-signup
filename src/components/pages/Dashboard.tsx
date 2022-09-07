import React, { useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import { Audio, FidgetSpinner } from "react-loader-spinner";  
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeesQuery,
  useTotalEmployeesQuery,
} from "../../rtk/EmployeeRtk";
import { logoutUser } from "../../slice/AuthUserSlice";
import AddUserModal from "./AddUserModal";
import threeDots from "../../images/3Dots.svg";
import Form from "react-bootstrap/Form";
import Pagination from "react-responsive-pagination";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pageSize = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const [addUser, setAddUser] = useState(false);
  const [userDetail, setUserDetail] = useState<any>("");
  const [searchField, setSearchField] = useState<any>("");
  const [pageList, setPageList] = useState(0);
  const [sortBtn, setSortBtn] = useState(false);

  const { data, isSuccess, isError, error, isLoading, isFetching } =
    useGetAllEmployeesQuery(
      sortBtn
        ? {
            searchField: searchField,
            initialEntry: pageList,
            finalEntry: pageList + 3,
            orderType: "desc",
          }
        : {
            searchField: searchField,
            initialEntry: pageList,
            finalEntry: pageList + 3,
          }
    );
  const { data: totalNoEmployees } = useTotalEmployeesQuery();

  const [deleteEmployee] = useDeleteEmployeeMutation();
  const totalPages = Math.ceil(totalNoEmployees?.length / pageSize);
  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout")) {
      return;
    }
    dispatch(logoutUser());
    navigate("/");
    toast.success("User logout successfully");
  };
  const handleDelete = async (id: any) => {
    if (!window.confirm("Are you sure you want to delete employee!")) {
      return;
    } else if (id) {
      try {
        await deleteEmployee(id);
        toast.success("Employee deleted successfully!");
      } catch {
        console.log("error", error);
      }
    }
  };

  const handleEdit = async (id: any) => {
    const filterEmployee = data?.filter((item: any) => item.id === id);
    const filterEmployeeObj = filterEmployee && filterEmployee?.[0];
    setAddUser(true);
    setUserDetail(filterEmployeeObj);
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
    if (page === 1) {
      setPageList(0);
    } else {
      setPageList(page * pageSize - pageSize);
    }
  };
  const handleView=(id:any)=>{
    navigate(`/dashboard/view/${id}`)
  }

  console.log("sortBtn", sortBtn);

  return (
    <div>
      
      <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <Button
          onClick={() => {
            setAddUser(true);
            setUserDetail("");
          }}
        >
          Add User
        </Button>
        <Form.Group className="mb-0" controlId="formBasicEmail">
          <Form.Control
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            type="text"
            placeholder="search..."
          />
        </Form.Group>
        <Button onClick={handleLogout} variant='success'>Logout</Button>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100 w-100">
          <FidgetSpinner
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            ballColors={["#ff0000", "#00ff00", "#0000ff"]}
            backgroundColor="#F4442E"
          />
        </div>
      ) : isFetching ? (
        <div className="d-flex justify-content-center align-items-center vh-100 w-100">
          <Audio
            height="80"
            width="80"
            color="green"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : isError ? (
        <h2 className="text-align-center w-100 d-flex justify-content-center align-items-center h-100">
          Something went wrong
        </h2>
      ) : isSuccess && data?.length === 0 ? (
        <h1 className="text-align-center w-100 d-flex justify-content-center align-items-center h-100">
          No items found
        </h1>
      ) : isSuccess && data ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr
                onClick={() => setSortBtn(!sortBtn)}
                style={{ cursor: "pointer" }}
              >
                <th>S.no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee, index) => (
                <tr style={{cursor:'pointer'}} onClick={()=>handleView(employee.id)} key={index}>
                  <td>
                    {currentPage === 1 && sortBtn
                      ? totalNoEmployees?.length-index
                      : searchField ? index+1 : currentPage && sortBtn
                      ? totalNoEmployees?.length+pageSize-currentPage*pageSize-index
                      : currentPage === 1 && !sortBtn
                      ? index + 1
                      : currentPage * pageSize - pageSize + index + 1}
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td onClick={(e)=>e.stopPropagation()} >
                    <Dropdown className="maindropDown">
                      <Dropdown.Toggle
                        className="imageAfter"
                        style={{ background: "transparent", border: "none" }}
                        variant="success"
                        id="dropdown-basic"
                      >
                        <img src={threeDots} alt="threeDots" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="maindropDown">
                        <Dropdown.Item onClick={() => handleEdit(employee.id)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={(page) => handlePagination(page)}
          />
        </>
      ) : null}
      {addUser && (
        <AddUserModal
          addUser={addUser}
          onHide={() => setAddUser(false)}
          userDetail={userDetail}
        />
      )}
    </div>
  );
};

export default Dashboard;
