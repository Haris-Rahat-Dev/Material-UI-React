import React from 'react';
import {Avatar, Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";


const NoteCard = ({note, handleDelete}) => {


    return (
        <div>
            <Card elevation={2}>
                <CardHeader avatar={ <Avatar>{note.category[0].toUpperCase() }</Avatar>}
                    action={
                        <IconButton onClick={ ()=> handleDelete(note.id)} aria-label="settings">
                            <DeleteOutline />
                        </IconButton>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                <CardContent>
                    <Typography variant={"body2"} color={"textSecondary"}>
                        { note.details }
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default NoteCard;