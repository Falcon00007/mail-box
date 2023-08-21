import React,{useState} from "react";
import { Button } from "react-bootstrap";
import MailComponent from "../mailbox/MailComponent";
import { BiMailSend,BiTrash } from "react-icons/bi";
import { TbMailPlus,TbMailOpenedFilled } from "react-icons/tb";
import { RiMailUnreadFill    } from "react-icons/ri";
import { Link } from "react-router-dom"; 
import { useSelector } from "react-redux";

import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
  CDBBadge,
} from "cdbreact";

const Sidebar = () => {
  const [modalShow, setModalShow] = useState(false);
  const inboxMails = useSelector((state)=> state.email.unreadMails)
  console.log(inboxMails);
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
        <CDBSidebar>
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"/>}>
            <Button
              variant="outline-primary"
              onClick={() => setModalShow(true)}
            >
              Compose <TbMailPlus/>
            </Button>
          </CDBSidebarHeader>

          <CDBSidebarContent>
          <CDBSidebarMenu>
          <CDBSidebarMenuItem suffix={
            <CDBBadge color="danger" size="small" borderType="pill">{inboxMails}</CDBBadge>}> <Link to="inbox"><RiMailUnreadFill/> Inbox</Link></CDBSidebarMenuItem>
            <CDBSidebarMenuItem suffix={<CDBBadge>4</CDBBadge>}> <TbMailOpenedFilled/> All Mails</CDBSidebarMenuItem>
             <CDBSidebarMenuItem><BiMailSend/> Outbox</CDBSidebarMenuItem>
             <CDBSidebarMenuItem><BiTrash/> Trash</CDBSidebarMenuItem>
          </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{padding: '20px 5px'}}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    </>
  );
};

export default Sidebar;