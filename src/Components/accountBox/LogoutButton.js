import { GoogleLogout } from 'react-google-login'

const clientId = "73712902965-e3seb15rmsp7153hf80i69cdtbcrq07b.apps.googleusercontent.com"

function LogoutButton() {

    function onSuccess() {
        console.log("log out successful")
    }

    return (

        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess} 
            />
        </div>

    )

}

export default LogoutButton