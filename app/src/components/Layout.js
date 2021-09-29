import React from 'react';
import { Drawer, Typography, List,ListItem, ListItemIcon,ListItemText, AppBar, Toolbar, Avatar } from "@mui/material";
import {AddCircleOutlined, SubjectOutlined} from "@mui/icons-material";
import {useHistory, useLocation} from "react-router-dom";
import { format } from "date-fns";

const drawerWidth = 240;

const classes = {
    page: {
        background: '#f9f9f9',
        width: '100%'
    },
    active:{
        background: '#f4f4f4'
    }

}

const Layout = ({ children }) => {

    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color={"secondary"} />,
            path : '/'
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlined color={"secondary"} />,
            path : '/create'
        }
    ]

    return(
        <div >
            <AppBar elevation={0} sx={{
                maxWidth: 1470,
                background: '#f5f5f5'
            }}>
                <Toolbar>
                    <Typography sx={{
                        flexGrow: 1
                    }}>
                        Today is the { format( new Date(), 'do MMMM Y' ) }
                    </Typography>
                    <Typography>
                        Logged in User
                    </Typography>
                    <Avatar src={"/mario-av.png"} sx={{
                        marginLeft: '16px'
                    }}/>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={"permanent"}
                anchor={"left"}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <div>
                    <Typography variant={"h5"} gutterBottom style={{
                        marginTop: 15,
                        marginLeft: 20
                    }}>
                        Ninja Notes
                    </Typography>
                </div>
                <List>
                    { menuItems.map((item, i)=> {
                        return(
                            <ListItem key={i} button onClick={ () => history.push(item.path) } sx={ location.pathname === item.path ? classes.active : null }>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div style={{ height: 100}} />
                {children}
            </div>

        </div>
    );
};

export default Layout;