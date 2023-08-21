import React, {useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import { useParams, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const OpenMails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const mails = useSelector((state) => state.email.recieved);

  const email = localStorage.getItem("email");
  const changedMail = email.replace(/[@.]/g, "");

  const selectedMail = mails.filter((item) => item.id === id);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://mail-box-client-3e379-default-rtdb.firebaseio.com//${changedMail}Inbox/${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({
            read: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response;
      console.log(data);
    };
    fetchData();
  }, [id, changedMail]);

  return (
    <Fragment>
      <Card bg="light" className="vh-100">
        <Card.Header
          style={{
            fontFamily: "sans-serif",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "28px",
          }}
        > <span style={{float:"left"}}><Link to="/inbox"><BiArrowBack/></Link></span>
          Message
        </Card.Header>
        {selectedMail[0] && (
          <Card.Body>
            <Card.Title>From: {selectedMail[0].from}{"   "} 
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
        {!selectedMail[0] && navigate("/inbox")}
      </Card>
    </Fragment>
  );
};

export default OpenMails;