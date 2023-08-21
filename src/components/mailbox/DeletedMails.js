import React from 'react'
import { Card, ListGroup, Button } from "react-bootstrap";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";


const DeletedMails = () => {

    const data = useSelector((state)=> state.email.trash);

  return (
    <>
    <Card bg="light">
      <h2 style={{ textAlign: "center" }}>Inbox</h2>
      <ListGroup>
        {data.length === 0 && <h5 style={{textAlign:"center", margin:"1rem auto"}}>No Mails in Inbox!!</h5>}

          {Object.keys(data).map((email, index) => {
            return (
              <ListGroup.Item
                key={index}
                className="bg-dark bg-gradient bg-opacity-50" 
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                >
                <Link
                  key={index}
                  style={{
                    textDecoration: "none",
                    color: "white",
                    alignItems: "center",
                  }}
                  to={`/inbox/deletedMail/${data[email].id}`} >  
                  <span style={{textDecoration:"none", color:"white"}}>
                    <b>From:</b> {data[email].from}                     
                  </span>
                  {" "}
                  <span>({data[email].time})</span>
                  <br />
                  <span>
                    <b>Subject: </b>
                    {data[email].subject}
                  </span>
                </Link>
                <Button>
                  Delete
                </Button>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Card>
  </>
  )
}

export default DeletedMails