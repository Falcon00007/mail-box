import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, Form, InputGroup, Spinner, Button } from "react-bootstrap";

const MailComponent = (props) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mailBody, setMailBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMailBody(editorState.getCurrentContent().getPlainText());
  }, [editorState]);

  const senderEmail = localStorage.getItem("email");
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };
  const formattedDate = formatDate(new Date());

  const handleSend = async () => {
    setLoading(true);
    const changedSenderMail = senderEmail.replace(/[@.]/g, "");
    const mailData = {
      to: to,
      subject: subject,
      message: mailBody,
      read: true,
      time: formattedDate,
      send: true,
      receive: false,
    };

    try {
      const response = await fetch(
        `https://mail-box-client-2c07a-default-rtdb.firebaseio.com/${changedSenderMail}SentMail.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    try {
      const mail = to.replace(/[@.]/g, "");
      const response = await fetch(
        `https://mail-box-client-2c07a-default-rtdb.firebaseio.com/${mail}Inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: senderEmail,
            subject: subject,
            message: mailBody,
            read: false,
            time: formattedDate,
            send: false,
            receive: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }

    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="custom-modal">
        <div className="bg-light custom-modal-content">
          <Modal.Header closeButton>
            <Modal.Title className="text-center text-dark w-100">
              Compose Mail
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup size="md" className="mb-3 ml-5">
              <InputGroup.Text id="inputGroup-sizing-sm">To</InputGroup.Text>
              <Form.Control
                required
                aria-label="Email"
                aria-describedby="inputGroup-sizing-sm"
                type="email"
                placeholder="Enter email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Subject</InputGroup.Text>
              <Form.Control
                aria-label="Subject"
                aria-describedby="inputGroup-sizing-sm"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </InputGroup>
            <Card className="border-0">
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                placeholder="Write your message here..."
              />
            </Card>
            <Button onClick={handleSend} className="btn-primary mt-3">
              Send
            </Button>
            {loading && (
              <span className="d-flex justify-content-center align-items-center">
                <Spinner
                  animation="border"
                  variant="primary"
                  role="status"
                  size="md">
                  <span className="visually-hidden">Sending...</span>
                </Spinner>
              </span>
            )}
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default MailComponent;
