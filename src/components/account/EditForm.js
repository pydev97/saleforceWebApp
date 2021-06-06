import { Form, Button } from "react-bootstrap";

import { useState } from "react";

const EditForm = ({ account }) => {
  const id = account.id;

  const [name, setName] = useState(account.name);
  const [industry, setIndustry] = useState(account.industry);
  const [rating, setRating] = useState(account.rating);

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
      id: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/editAccount", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          name="industry"
          value={industry ? industry : " "}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          name="rating"
          value={rating ? rating : " "}
          onChange={(e) => setRating(e.target.value)}
        />
      </Form.Group>
      <Button variant="success" type="submit" block>
        Edit Employee
      </Button>
    </Form>
  );
};

export default EditForm;
