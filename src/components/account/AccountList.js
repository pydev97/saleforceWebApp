import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddForm from "./AddForm";
import Account from "./Account";
import { API_BASE_URL } from "../../apiCaller/constant";

function AccountList() {
  const [show, setShow] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
    const url = API_BASE_URL + "/api/demo";

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAccounts(result);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
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
