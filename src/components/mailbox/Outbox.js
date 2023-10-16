import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mailSlice";
import { Link } from "react-router-dom";

const Outbox = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.email.sent);

  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");
  const mail = email.replace(/[@.]/g, "");

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      let res = await fetch(
        `https://mail-box-client-2c07a-default-rtdb.firebaseio.com/${mail}SentMail.json`
      );
      let data = await res.json();
      let arr = [];
      console.log(data);

      for (let key in data) {
        const id = key;
        arr = [{ id: id, ...data[key] }, ...arr];

        dispatch(mailActions.sentMail([...arr]));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [mail, dispatch]);

  const DeleteHandler = async (id) => {
    console.log(id);
    const res = await fetch(
      `https://mail-box-client-2c07a-default-rtdb.firebaseio.com/${mail}SentMail/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data = await res;
    console.log(data);
    getData();
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Card bg="light">
        <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
          Sent Mails
        </h2>
        <ListGroup>
          {data.length === 0 && (
            <h5 style={{ textAlign: "center", margin: "1rem auto" }}>
              No Mails in Outbox!!
            </h5>
          )}
          {loading && data.length > 0 && <Spinner />}

          {!loading &&
            data !== null &&
            Object.keys(data).map((email, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  className="bg-dark bg-gradient bg-opacity-50"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Link
                    key={index}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      alignItems: "center",
                    }}
                    to={`/outbox/${data[email].id}`}>
                    <span style={{ textDecoration: "none", color: "white" }}>
                      <b>To:</b> {data[email].to}
                    </span>{" "}
                    <span>({data[email].time})</span>
                    <br />
                    <span>
                      <b>Subject: </b>
                      {data[email].subject}
                    </span>
                  </Link>
                  <Button
                    onClick={() => DeleteHandler(data[email].id)}
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

export default Outbox;
