import React from "react";
import { Button } from "react-bootstrap";
import MailComponent from "../mailbox/MailComponent";

import {
  CDBSidebar,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

const Sidebar = () => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <MailComponent show={modalShow} onHide={() => setModalShow(false)} />
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          float: "left",
        }}
      >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <Button
              variant="outline-success"
              onClick={() => setModalShow(true)}
            >
              Compose
            </Button>
          </CDBSidebarHeader>

          <CDBSidebarMenu>
            <CDBSidebarMenuItem>MailBox</CDBSidebarMenuItem>
          </CDBSidebarMenu>

          <CDBSidebarFooter></CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default Sidebar;