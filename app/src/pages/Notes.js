import React, {useEffect, useState} from 'react'
import {Container, Grid, Paper} from "@mui/material";
import NoteCard from "../components/NoteCard";
import Masonry from 'react-masonry-css';

export default function Notes() {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/notes')
            .then(res => res.json())
            .then(data => setNotes(data))
            .catch(e => console.log(e.message))
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:8000/notes/${id}`, {
            method: 'DELETE',
        })

        const newNotes = notes.filter( note => note.id !== id);
        setNotes(newNotes);
    };

    const breakPoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        <Container>
            {/*<Grid container>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper>1</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper>2</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper>3</Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper>4</Paper>
                </Grid>
            </Grid>*/}
            <Masonry className={"my-masonry-grid"} breakpointCols={ breakPoints } columnClassName="my-masonry-grid_column" >
                {notes.map((note) => {
                    return(
                        <div key={note.id}>
                            <NoteCard note={note} handleDelete={handleDelete}/>
                        </div>
                    );
                })}
            </Masonry>
        </Container>
    )
}
