import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common";
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios'
import { useState } from 'react'
import '../../styles/login.css'

export default function Authenticate(props) {

    const navigate = useNavigate()
    const [entered_code, setEnteredCode] = useState("")
    const user_id = useParams()

    function handleSubmit(event) {

        Axios.post('http://localhost:3002/mfa/authenticate', {
            entered_code: entered_code,
            user_id: user_id
        })
            .then((data) => {
                const verified = data.data.verified
                const id = data.data.id

                if (verified) {
                    navigate(`/customer/${id}`)
                }
            })

        event.preventDefault()
    }

    return <BoxContainer className="center">
        <FormContainer>
            <Input placeholder="Google MFA code" onChange={(e) => {
                setEnteredCode(e.target.value)
            }}></Input>
        </FormContainer>
            <SubmitButton type="submit" onClick={handleSubmit}>Submit</SubmitButton>
    </BoxContainer>

}