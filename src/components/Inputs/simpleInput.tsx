import TextField from '@mui/material/TextField';

const SimpleInput = (props:any) => {
    const {handleChangeUserName, error} = props
    return (
        <div>
                <TextField id="outlined-basic" label="User" variant="outlined" onChange={(e) => handleChangeUserName(e.target.value)} placeholder="Veuiller entrer un nom" />
                {error && <div style={{color: "red"}}>{error}</div>}
        </div>)
    // return (<input onChange={(e) => handleChangeUserName(e.target.value)}/>)
}

export default SimpleInput