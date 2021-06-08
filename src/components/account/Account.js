import { useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import EditForm from "./EditForm";
import { API_BASE_URL } from "../../apiCaller/constant";
export default function Account({ account }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const deleteEmployee = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
    var raw = JSON.stringify({ id: account.id });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const url = API_BASE_URL + "/api/deleteAccount";
    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          alert("delete thanh cong");
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <td>{account.id}</td>
      <td>{account.name}</td>
      <td>{account.industry}</td>
      <td>{account.rating}</td>
      <td>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Edit</Tooltip>}>
          <button
            onClick={handleShow}
            className="btn text-warning btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE254;</i>
          </button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-top`}>Delete</Tooltip>}>
          <button
            onClick={() => deleteEmployee()}
            className="btn text-danger btn-act"
            data-toggle="modal"
          >
            <i className="material-icons">&#xE872;</i>
          </button>
        </OverlayTrigger>
      </td>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm account={account} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
