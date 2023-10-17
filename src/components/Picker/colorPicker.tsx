import { MuiColorInput } from 'mui-color-input'
import { useState } from 'react'

const ColorPickerComponent = (props:any) => {
    const [value, setValue] = useState('#ffffff')

    const {handleChangeUserColor} = props

    const handleChange = (newValue:string) => {
        setValue(newValue)
        handleChangeUserColor(newValue)
      }

    return (
        <MuiColorInput value={value} onChange={handleChange} />
    )
}

export default ColorPickerComponent