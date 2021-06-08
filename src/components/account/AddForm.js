import { Form, Button } from "react-bootstrap";

import { useState } from "react";
import { API_BASE_URL } from "../../apiCaller/constant";

const AddForm = () => {
  const [newAccount, setNewAccount] = useState({
    name: "",
    industry: "",
    rating: "",
  });

  const onInputChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
  };

  const { name, industry, rating } = newAccount;

  const handleSubmit = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );

    var raw = JSON.stringify({
      name: name,
      industry: industry,
      rating: rating,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const url = API_BASE_URL + "/api/createAccount";
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log("aadddd" + JSON.stringify(result)))
      .catch((error) => console.log("error", error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name *"
          name="name"
          value={name}
          onChange={(e) => onInputChange(e)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          name="industry"
          value={industry}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          rows={3}
          name="rating"
          value={rating}
          onChange={(e) => onInputChange(e)}
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Add New Employee
      </Button>
    </Form>
  );
};

export default AddForm;
