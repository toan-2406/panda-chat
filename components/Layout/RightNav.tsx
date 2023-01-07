import * as React from "react";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import People from "@mui/icons-material/People";
import PermMedia from "@mui/icons-material/PermMedia";
import Dns from "@mui/icons-material/Dns";
import Public from "@mui/icons-material/Public";
import RecipientAvatar from "../RecipientAvatar";
import { useRecipient } from "../../core/hooks/useRecipient";
import { Conversation, IMessage } from "../../core/types";

const data = [
  { icon: <People />, label: "Authentication" },
  { icon: <Dns />, label: "Database" },
  { icon: <PermMedia />, label: "Storage" },
  { icon: <Public />, label: "Hosting" },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});
interface Props {
  conversation: Conversation
}
export default function RightNav({conversation}:Props) {
  const [open, setOpen] = React.useState(true);
  const conversationUser = conversation.users
  const { recipientEmail, recipient } = useRecipient(conversationUser);
  console.log(conversationUser)
  return (
    <Box sx={{ display: "flex" }}>
      <Paper
        elevation={0}
        sx={{
          maxWidth: 256,
          bgcolor: "background.default",
          borderLeft: "1px solid #4A545C",
          boxShadow:
            "0px 0px 4px rgba(2, 17, 37, 0.08), -2px 0px 8px rgba(2, 17, 37, 0.08), -6px 0px 16px rgba(2, 17, 37, 0.04)",
          borderRadius: "16px 0px 0px 0px",
          overflow: "hidden"
        }}
      >
        <FireNav component="nav" disablePadding>
          <ListItem component="div">
            <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail}/>
            <ListItemText
              sx={{ my: 0 }}
              primary={recipientEmail} 
              primaryTypographyProps={{
                fontSize: 16,
                fontWeight: "medium",
                letterSpacing: 0,
              }}
            />
            <ListItemButton>
            <ListItemIcon>
                <Home color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem component="div" disablePadding>
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Home color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Project Overview"
                primaryTypographyProps={{
                  color: "primary",
                  fontWeight: "medium",
                  variant: "body2",
                }}
              />
            </ListItemButton>
            <Tooltip title="Project Settings">
              <IconButton
                size="large"
                sx={{
                  "& svg": {
                    color: "rgba(255,255,255,0.8)",
                    transition: "0.2s",
                    transform: "translateX(0) rotate(0)",
                  },
                  "&:hover, &:focus": {
                    bgcolor: "unset",
                    "& svg:first-of-type": {
                      transform: "translateX(-4px) rotate(-20deg)",
                    },
                    "& svg:last-of-type": {
                      right: 0,
                      opacity: 1,
                    },
                  },
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    height: "80%",
                    display: "block",
                    left: 0,
                    width: "1px",
                    bgcolor: "divider",
                  },
                }}
              >
                <Settings />
                <ArrowRight
                  sx={{ position: "absolute", right: 4, opacity: 0 }}
                />
              </IconButton>
            </Tooltip>
          </ListItem>
          <Divider />
          <Box
            sx={{
              bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
              pb: open ? 2 : 0,
            }}
          >
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: open ? 0 : 2.5,
                "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
              }}
            >
              <ListItemText
                primary="Build"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
                secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: 12,
                  lineHeight: "16px",
                  color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: open ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            {open &&
              data.map((item) => (
                <ListItemButton
                  key={item.label}
                  sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium",
                    }}
                  />
                </ListItemButton>
              ))}
          </Box>
        </FireNav>
      </Paper>
    </Box>
  );
}
