import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useViewEmployeeQuery } from "../../rtk/EmployeeRtk";
import { FidgetSpinner } from "react-loader-spinner";
import { Button } from "react-bootstrap";

const ViewEmployee = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const { data, isFetching, isLoading } = useViewEmployeeQuery(id);

  return (
    <div>
      <div className="d-flex flex-column  justify-content-center align-items-center min-vh-100 bg-light ">
        {isFetching && isLoading ? (
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
        ) : (
          <>
            <h3>Name : {data?.name}</h3>
            <h3>Email : {data?.email}</h3>
            <h3>Name : {data?.phone}</h3>
            <Button onClick={()=>navigate(-1)}>Go back</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewEmployee;
