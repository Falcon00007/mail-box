import React, { useCallback, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";

const Inbox = () => {
  const [data, setData] = useState([]);

  const email = localStorage.getItem("email");
  const changedMail = email.replace(/[@.]/g, "");
        localStorage.setItem("numberOfMails", data.length);


  const getData = useCallback(async () => {
    try {
      let res = await fetch(
        `https://mail-box-client-3e379-default-rtdb.firebaseio.com//${changedMail}Inbox.json`
      );
      let data = await res.json();
      console.log(data);
      let arr = [];
      for (let i in data) {
        arr.push(data[i]);
        setData(arr);
      }
    } catch (err) {
      console.log(err);
    }
  }, [changedMail]);

  const getMessage = () => {};
  useEffect(() => {
    getData();
  }, [getData]);
  console.log("mail...." + data);

  return (
    <>
      <Card bg="light">
        <h2 style={{ textAlign: "center" }}>Inbox</h2>
        <ListGroup>
          {data.length === 0 && <h5 style={{textAlign:"center", margin:"1rem auto"}}>No Mails in Inbox!!</h5>}
          {data !== null &&
            Object.keys(data).map((email, index) => {
              return (
                <ListGroup.Item
                  onClick={() => getMessage}
                  style={{ cursor: "pointer", backgroundImage:'linear-gradient(to right, white, grey)' }}
                  key={index}
                >
                  <span>
                    <b>From:</b> {data[email].from}
                  </span>
                  <br />
                  <span>
                    <b>Subject: </b> {data[email].subject}
                  </span>
                  <br />
                  <span>
                    <b>Message: </b> {data[email].message}
                  </span>
                  <br />
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card>
    </>
  );
};

export default Inbox;