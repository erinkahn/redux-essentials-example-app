import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Tianna HAy' },
    {id: '1', name: 'Jimmy Jones' },
    {id: '2', name: 'Rachel Ray' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer