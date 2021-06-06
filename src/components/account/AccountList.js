import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import AddForm from "./AddForm";
import Account from "./Account";
function AccountList() {
  //   const [showAlert, setShowAlert] = useState(false);

  const [show, setShow] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [employeesPerPage] = useState(2);
  //   const handleShowAlert = () => {
  //     setShowAlert(true);
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 2000);
  //   };

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/demo", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAccounts(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  //   const indexOfLastEmployee = currentPage * employeesPerPage;
  //   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  return (
    <>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Manage <b>Employees</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <Button
                    className="btn btn-success"
                    data-toggle="modal"
                    onClick={handleShow}
                  >
                    <i className="material-icons">&#xE147;</i>{" "}
                    <span>Add New Employee</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* <Alert show={showAlert} variant="success">
        Emlployee List Updated Succefully!
      </Alert> */}

            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Account Name</th>
                  <th>Industry</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <Account account={account} />
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 
      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentEmployees={currentEmployees}
        sortedEmployees={sortedEmployees}
      /> */}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Employee</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddForm />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close Button
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountList;
