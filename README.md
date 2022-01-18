# 📚 SDK React Native Vonage Overview

## <img src="icons/iconset-conexa-prod/mipmap-hdpi/ic_launcher_round.png" width="30"> CONEXA SAÚDE

### To run this poc follow these commands:

    git clone https://gitlab.com/conexasaude/conexa-b2c/poc-s/poc-full-integration-mobile-vonage.git
    yarn install
    npx pod-install (ios)
    yarn build:ios

    yarn android || yarn ios

## How this poc works?


    Firstly, this poc generate a call token on useEffect at the first screen. This token is necessary to create a new video call.

    Your app will need generate this token in your app flow to connect with professional.

#### Receiving the professional url

    Thereafter, you will need to get this token and do a post request to:

    https://hml-meet.conexasaude.com.br/api/integration/vonage/obter/url/profissional/CONEXA

    with this payload:

    {
      "sessionId" : {YOUR_CALL_TOKEN_HERE},
      "userId" : {YOUR_USER_ID},
      "userName" : {YOUR_USER_NAME},
      "isDocpass" : false
    }

    You will receive the url to connect with the pacient.

#### Continuing the app flow

    After generate the call token, the app needs to navigate to Vonage screen sending as parameters:

    id_chamada:{YOUR_CALL_TOKEN},
    tokenParticipante: (generated automaticaly),
    idAtendimento: {YOUR_ATTENDANCE_ID}

    With these parameters, the screen Vonage will be opened and the video call will be started.

    Will need to open the professional url to establish connection.
