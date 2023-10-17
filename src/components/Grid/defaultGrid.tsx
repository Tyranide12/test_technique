import { rgbToHex } from '@mui/material';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import SimpleInput from '../Inputs/simpleInput';
import ColorPickerComponent from '../Picker/colorPicker';
import './style.css'

const Pixels = (props:any) => {
    const gridSize = 50;
    const grid: JSX.Element[] = [];

    const {currentGrid, handleChangeColor, handleHoverDetails} = props
  
    for (let i = 0; i < gridSize; i++) {
      const row: JSX.Element[] = [];
      for (let j = 0; j < gridSize; j++) {
        var currentPerson = null
        if (currentGrid?.hasOwnProperty(`${i}-${j}`))
            currentPerson = currentGrid[`${i}-${j}`]
        row.push(<div onMouseOver={() => handleHoverDetails(currentGrid[`${i}-${j}`], `${i}-${j}`)} id={`${i}-${j}`} key={`current-cell-${i}-${j}`} style={{backgroundColor: currentPerson ? currentPerson.color : "#fff"}} className={`pixel-layout`}>
            <div style={{position: "absolute", top: 0, right: 0, bottom: 0, left: 0}} onClick={() => handleChangeColor(`${i}-${j}`)}></div>
        </div>);
      }
      grid.push(
        <div key={i} className="grid-row">
          {row}
        </div>
      );
    }
    return <div className="pixels-container">{grid}</div>;
}

interface UserSelect {
    name: string;
    color: string;
    position: string;
  }

const DefaultGrid = () => {
    const [currentGrid, setCurrentGrid] = useState(null);
    const [currentUserSelect, setCurrentUserSelect] = useState<UserSelect>({
            name: "",
            color: "#FFFFFF",
            position: ""
          });
    const [currentUserOvered, setCurrentUserOvered] = useState<any>(null);
    const [error, setError] = useState<string>("")

      useEffect(() => {
        API.get('/')
        .then(res => setCurrentGrid(res.data))
        .catch(err => console.log(err))
    }, [])

    function handleChangeUserName(value: string){
        setCurrentUserSelect(prev => ({...prev, name: value}))
    }

    function handleChangeUserColor(color: string){
        setCurrentUserSelect(prev => ({...prev, color: color}))
    }

    function handleChangeColor(position: string){
        if (!currentUserSelect.name) {
            setError("Veuillez choisir un pseudo")
        }
        if (currentUserSelect.name && currentUserSelect.color)
        API.post('/', {coordinates: position, user: currentUserSelect.name, color: currentUserSelect.color})
        .then(_ => {
            const currentPixel = document.getElementById(position)
            if (currentPixel)
                currentPixel.style.backgroundColor = currentUserSelect.color
        })
        .catch(err => console.log(err))
    }

    function handleHoverDetails(person: any, position: string) {
        setCurrentUserOvered({name: person?.user, color: person?.color, position: position})
    }

    const numberPixels:number = 50 * 50

    return (
        <div>
            <div className="input-top-placement">
                <SimpleInput {...{handleChangeUserName, error}}/>
                <ColorPickerComponent {...{handleChangeUserColor}}/>
            </div>
            <Pixels {...{numberPixels, currentGrid, handleChangeColor, handleHoverDetails}}/>

            {currentUserOvered && <div>{currentUserOvered.color && rgbToHex(currentUserOvered.color)} - {currentUserOvered.name} ({currentUserOvered.position})</div>}

        </div>
    )
}

export default DefaultGrid