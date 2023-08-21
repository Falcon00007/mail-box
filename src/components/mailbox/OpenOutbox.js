import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import { useParams, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";


const OpenOutbox = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const mails = useSelector((state) => state.email.sent);
    
    const selectedMail = mails.filter((item) => item.id === id);

  return (
    <>
      <Card bg="light" className="vh-100">
        <Card.Header
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "28px",
          }}
        > <span style={{float:"left"}}><Link to="/outbox"><BiArrowBack/></Link></span>
          Message
        </Card.Header>
        {selectedMail[0] && (
          <Card.Body>
            <Card.Title>To: {selectedMail[0].to}{"   "} 
            </Card.Title>
            <br />
            <Card.Text>
            <b>Date & Time: </b> {selectedMail[0].time}
            </Card.Text>
            <br/>
            <Card.Text>
              <b>Subject: </b>
              {selectedMail[0].subject}
              <br />
              <br />
              <b>Message: </b>
              {selectedMail[0].message}
              <br />
              <br />
            </Card.Text>
          </Card.Body>
        )}
        {!selectedMail[0] && navigate("/outbox")}
      </Card>
    </>
  )
}

export default OpenOutbox;