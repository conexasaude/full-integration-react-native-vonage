# 📚 SDK Vonage

## <img src="icons/iconset-conexa-prod/mipmap-hdpi/ic_launcher_round.png" width="30"> CONEXA SAÚDE

### To start Conexa Saúde app development run the following commands:

    git clone https://gitlab.com/conexasaude/conexa-b2c/poc-s/poc-full-integration-mobile-vonage.git
    yarn install
    npx pod-install (ios)
    yarn build:ios

    yarn android || yarn ios

## How this poc works?


    Firstly, this poc generate a call token on useEffect at the firs screen. This token is necessary to create a new video call.
