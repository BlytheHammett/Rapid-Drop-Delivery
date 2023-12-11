import { BoxContainer, FormContainer, MutedLink, SubmitButton, Input, BoldLink } from "./common"
import React, { useState } from "react";
import { Marginer } from "./marginer";
import Navbar from "./Navbar"
import { APIProvider,
         Map,
         AdvancedMarker,
         Pin,
         InfoWindow,
         } from "@vis.gl/react-google-maps"
import '../styles/login.css'
import Axios from 'axios'
import { useParams } from "react-router-dom"

export default function CustomerTracking(props) {

    const [trackingId, setTrackingId] = useState("")
    const [trackingSent, setTrackingSent] = useState(false)
    const [position, setPosition] = useState("")
    const { user_id } = useParams()

    function handleTrackingSubmit(event) {

        Axios.post('http://localhost:3002/customer/location', {
            trackingId: trackingId
        })
            .then(data => {
                setPosition({lat: parseFloat(data.data.lat), lng: parseFloat(data.data.lng)})
                setTrackingSent(true)
                console.log(data.data.lat)
            })

        event.preventDefault()
    }

    return (
        <>
            <Navbar id={user_id}></Navbar>
            {!trackingSent && <BoxContainer className="center">
    <FormContainer>
        <Input type="trackingId" placeholder="Tracking ID" onChange={(e) => {
            setTrackingId(e.target.value)
        }}/>
    </FormContainer>
        <Marginer direction="vertical" margin="1.6em"/>
        <SubmitButton type="submit" onClick={handleTrackingSubmit}>Check Location</SubmitButton>
</BoxContainer>}
            {console.log(position)}
            {trackingSent && 
            <APIProvider apiKey="AIzaSyCxd2YX3TN44rhNREIc3-VdbIda1xByl9Y">
                <div style={{height: "100vh"}}>
                    <Map zoom={9} center={position} mapId="647a65bedb86caa4">
                        <AdvancedMarker position={position}>
                        </AdvancedMarker>
                    </Map>
                </div>
            </APIProvider>}
        </>
    )

}