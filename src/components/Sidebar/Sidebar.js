import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Sidebar.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import SidebarOption from "./SidebarOption/SidebarOption";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import HistoryIcon from '@material-ui/icons/History';
// ... other imports

function Sidebar() {
    const [channels, setChannels] = useState([]);
    const [{ user }] = useStateValue();
  
    useEffect(() => {
      const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
        setChannels(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
      });
      return () => unsubscribe();
    }, []);
    
  const history = useHistory(); // Get the history object
  const goToHistory = () => {
    history.push('/history');
  };


  const goToProfile = () => {
    history.push('/profile'); // This will navigate to the /profile route
  };

  const messageIndividual = () => {
    // Placeholder for messaging individual logic
    const email = prompt("Enter the email of the user you want to message:");
    if (email) {
      // You might search for the user by email in your database
      // Then, either navigate to a chat with that user or start a new chat
      console.log('Messaging user with email:', email);
      // This might involve updating your Firestore structure to handle direct messages
    }
  };

return (
  <div className="sidebar">
    <div className="siderbar-header">
      <div className="sidebar-info">
        <h2>ChatSphere</h2>
        <h3>
          <FiberManualRecordIcon />
          {user?.displayName}
        </h3>
      </div>
      <CreateIcon onClick={goToProfile} /> 
    </div>
    <SidebarOption Icon={InsertCommentIcon} title="Threads" />
    <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
    <SidebarOption Icon={DraftsIcon} title="Saved items" />
    <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
    <SidebarOption Icon={FileCopyIcon} title="File browser" />
    <SidebarOption Icon={HistoryIcon} title="History" onClick={goToHistory} />
    <SidebarOption Icon={PeopleAltIcon} title="Message Individual" onClick={messageIndividual} />
    <SidebarOption Icon={ExpandLessIcon} title="Show less" />
    <hr />
    <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
    <hr />
    <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />

    {/* Connect to db and list all the channels*/}
    {/* SidebarOptionn */}
    {channels.map((channel) => (
      <SidebarOption title={channel.name} id={channel.id} />
    ))}
  </div>
);
    }

export default Sidebar;