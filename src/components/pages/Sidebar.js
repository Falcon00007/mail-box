import React,{useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import MailComponent from "../mailbox/MailComponent";
import { BiMailSend,BiTrash } from "react-icons/bi";
import { TbMailPlus,TbMailOpenedFilled } from "react-icons/tb";
import { RiMailUnreadFill    } from "react-icons/ri";
import { Link } from "react-router-dom"; 
import { useSelector } from "react-redux";
import { CDBSidebar, CDBSidebarHeader, CDBSidebarContent, CDBSidebarMenu, CDBSidebarMenuItem, CDBSidebarFooter, CDBBadge,} from "cdbreact";

const Sidebar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [mailCount, setMailCount] = useState(0);
  const email= localStorage.getItem("email")
  const inboxMails = useSelector((state)=> state.email.unreadMails)
  const outbox= useSelector((state)=> state.email.sent);
  const outboxMails= outbox.length;
  console.log(outboxMails);

  useEffect(()=>{
    setMailCount(inboxMails);
  },[email,inboxMails])

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
            <CDBBadge color="success" size="small" borderType="pill">{mailCount}</CDBBadge>}> <Link to="/inbox"><RiMailUnreadFill/> Inbox</Link></CDBSidebarMenuItem>
            <CDBSidebarMenuItem suffix={<CDBBadge size="small">4</CDBBadge>}> <TbMailOpenedFilled/> All Mails</CDBSidebarMenuItem>
             <CDBSidebarMenuItem suffix={
              <CDBBadge color="danger" size="small" borderType="pill">{outboxMails}</CDBBadge>}><Link to="/outbox"><BiMailSend/> Outbox</Link></CDBSidebarMenuItem>
             <CDBSidebarMenuItem><Link to="/inbox/deletedMails/:id"><BiTrash/> Trash</Link></CDBSidebarMenuItem>
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