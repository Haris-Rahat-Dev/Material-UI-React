import React, {useState,} from 'react';
import { useHistory } from "react-router-dom";
import {Typography, Button, Container, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const styles = {
    field: {
        marginTop: 5,
        marginBottom: 5,
        display: "block"
    }
}

export default function Create() {

    const [ title, setTitle ] = useState('');
    const [ details, setDetails ] = useState('');
    const [ titleError, setTitleError ] = useState(false);
    const [ detailsError, setDetailsError ] = useState(false);
    const [ category, setCategory ] = useState('todos');

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError(false);
        setDetailsError(false);

        if(title === '') setTitleError(true)
        if(details === '') setDetailsError(true)
        if( title && details ){
            fetch('http://localhost:8000/notes', {
                method: 'POST',
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({ title, details, category })
            }).then(res => res.json)
                .then(data => console.log(data))
                .then(()=> {
                    history.push("/");
            })
        }
    }
    return (
    <Container size = {"sm"} >
        <Typography
            variant={"h6"}
            component={"h2"}
            gutterBottom
            color={"textSecondary"}
            >Create a New Note
        </Typography>
        <form noValidate autoComplete={"off"} onSubmit={ (e) => handleSubmit(e)}>
            <TextField
                onChange={(e)=> setTitle(e.target.value)}
                sx={{
                    marginTop: 5,
                    marginBottom: 5,
                    display: "block"
                }}
                label={"Note Title"}
                variant={"outlined"}
                color={"secondary"}
                fullWidth
                required
                error={titleError}
            />
            <TextField
                onChange={(e)=> setDetails(e.target.value)}
                sx={{
                    marginTop: 5,
                    marginBottom: 5,
                    display: "block"
                }}
                label={"Details"}
                variant={"outlined"}
                color={"secondary"}
                fullWidth
                required
                multiline
                rows={4}
                error={detailsError}
            />
            <FormControl sx={{
                marginTop: 5,
                marginBottom: 5,
                display: "block"
            }}>
                <FormLabel>
                    Note Category
                </FormLabel>
                <RadioGroup sx={{mb: 2}} value={category} onChange={(e) => setCategory( e.target.value )}>
                    <FormControlLabel control={<Radio color={"secondary"}/>}  label={"Money"} value={"money"}/>
                    <FormControlLabel control={<Radio color={"secondary"}/>}  label={"Todos"} value={"todos"}/>
                    <FormControlLabel control={<Radio color={"secondary"}/>}  label={"Reminders"} value={"reminders"}/>
                    <FormControlLabel control={<Radio color={"secondary"}/>}  label={"Work"} value={"work"}/>
                </RadioGroup>
            </FormControl>
            <Button
                type={"submit"}
                color={"secondary"}
                endIcon={<KeyboardArrowRightIcon/>}
                variant={"contained"}>
                Submit
            </Button>
        </form>
    </Container>
    )
}