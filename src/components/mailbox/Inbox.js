import React, { useCallback, useEffect, useState } from "react";
import { Card, ListGroup, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mailSlice";
import { Link } from "react-router-dom";

const Inbox = () => {
  const [loading, setLoading]= useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.email.recieved);
  console.log(data);


  const email = localStorage.getItem("email");
  const changedMail = email.replace(/[@.]/g, "");
        localStorage.setItem("numberOfMails", data.length);


  const getData = useCallback(async () => {
    try {
      setLoading(true);
      let res = await fetch(
        `https://mail-box-client-3e379-default-rtdb.firebaseio.com//${changedMail}Inbox.json`
      );
      let data = await res.json();
      let arr = [];
      let unreadMails=0;
       console.log(data);
      
       for (let i in data) {
        if(data[i].read===false){
          unreadMails++;
        }
        const id= i;
        arr=[{id:id, ...data[i]}, ...arr];
        dispatch(mailActions.recievedMail([...arr]));
        dispatch(mailActions.unreadMessage(unreadMails));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [changedMail,dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const DeleteHandler = async (id) => {
    console.log(id);
    const mail = data.filter((item)=> item.id===id);
    dispatch(mailActions.deleteMail(mail));
    console.log(mail);
    const res = await fetch(
      `https://mail-box-client-3e379-default-rtdb.firebaseio.com//${changedMail}Inbox/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let response = await res;
    console.log(response);
    getData();
  };

  return (
    <>
      <Card bg="light">
        <h2 style={{ textAlign: "center" }}>Inbox</h2>
        <ListGroup>
          {data.length === 0 && <h5 style={{textAlign:"center", margin:"1rem auto"}}>No Mails in Inbox!!</h5>}
          {loading && data.length>0 && <Spinner/>}

          {!loading && data !== null && 
            Object.keys(data).map((email, index) => {
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
                    to={`/inbox/${data[email].id}`} >  
                  {data[email].read===false && (
                    <p className="mt-3 me-3 ms-0" style={{ marginRight: "10px", float: "left" }}>
                      🟢
                    </p>
                  )}
                    {" "}
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
                  <Button  onClick={() => DeleteHandler(data[email].id)}
                  key={data[email].id}
                  style={{ float: "right" }}
                  variant="danger">
                    Delete
                  </Button>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card>
    </>
  );
};

export default Inbox;