# 📚 Developer Docs

## <img src="icons/iconset-conexa-prod/mipmap-hdpi/ic_launcher_round.png" width="30"> CONEXA SAÚDE

### To start Conexa Saúde app development run the following commands:

    git clone https://gitlab.com/conexasaude/conexa-b2c/app-react/conexa-app-paciente.git
    yarn install
    npx pod-install (ios)
    git checkout –b branch_name
    git pull origin homolog

## <img src="icons/iconset-docpass-hml/mipmap-hdpi/ic_launcher_round.png" width="30"> DOCPASS

### To start Docpass app development run the following commands:

    git clone https://gitlab.com/conexasaude/conexa-b2c/app-react/conexa-app-paciente.git
    yarn install
    npx pod-install (ios)
    yarn android:docpass:hml
    git checkout –b branch_name
    git pull origin homolog

## 🌿 Branchs creation pattern

**_Example: feature/docpass-BA-300-new_feature_for_example_**
|||
|-|-|
| **Prefix** | _hotfix, bugfix, feature_ |
| **Product** | _docpass, conexa_ |
| **Squad** | _BA, ADF, SIGN, etc._ |
| **Jira Card Number** | _200, 300, etc._ |
| **Description** | _Something that describes the changes, without spaces, separated by underline._ |

**If you wish to create a mirroring to homolog:**
feature/docpass-BA-624-wrong-card-color-mirroring-conexa

> **⚠️ Important**
> Everything has to be in english.\*\*

## 🌿 Default Branchs

- **master** - Production branch for Conexa Saúde app.
- **staging** - Pre-Production branch for Conexa Saúde app.
- **homolog** - Tests branch for Conexa Saúde app.
- **docpass** - Production branch for Docpass app.
- **docpass-homolog** - Tests branch for Docpass app.

## 🔄 Merge Request Description Pattern

    ## Merge request description
    *Insert here your description*
    ## Is it necessary the same features to Docpass app?
    *Yes it is, I will make a new MR to it. | No, it's not. *
    ## Libs added
    *yarn add axios*
    ## Files changed
    *Insert here the name of new or changed files*
    ## Does this merge change or insert native files?
    *Yes, it does. | No, it doesn’t.*
    ## How did you solve the problem?
    *Insert here your solution*
    ## miscelaneous?
    *Insert here other infos*

> **⚠️ Important**
> Only merge the branchs that will be test in the next release.
> There will be a row to not release what wasn't tested.

## Tips on MR

### MR on Master

- Pull master

  `git pull origin master`

- Push to branch

  `git add .`<br>
  `git commit -m "My commit"`<br>
  `git push origin my_branch`<br>

### MR on Homolog and Hero-Homolog

- Create a new branch with sufix mirror - Ex: branch_name_mirror

  `git checkout -b my_branch_mirror`

- Reset the branch to origin - Ex: homolog or hero-homolog

  `git reset --hard origin/homolog` - To homolog<br>
  `git reset --hard origin/hero-homolog` - To hero-homolog

- Merge the local branch in current branch

  `git merge my_branch`

- Solve the conflicts
- Push to branch

  `git add .`<br>
  `git commit -m "My commit"`<br>
  `git push origin my_branch`<br>

  ### Installing Hero and @conexasaude scope librarys

- Run on your terminal using yarn

  `npm config set @conexasaude:registry https://gitlab.com/api/v4/packages/npm/`<br>
  `npm config set -- '//gitlab.com/api/v4/packages/npm/:_authToken' "<your_token>"`<br>
  `npm config set -- '//gitlab.com/api/v4/projects/28272521/packages/npm/:_authToken' "<your_token>"`<br>

- `<your_token>` is your personal gitlab access token.

  To get your access token:

  - Access: [Personal tokens](https://gitlab.com/profile/personal_access_tokens)
  - Check the items on Scopes
  - Click 'create personal access token'
  - Copy the generated token

<br/>

- Navigate to your user root folder
- Create an file named .npmrc
- Paste this link on this file, save and close: @conexasaude:registry=https://gitlab.com/api/v4/packages/npm/
- Now you should be able to install @conexasaude scope librarys by running yarn add @conexasaude/`<library_name>`

## Criando estilos personalizáveis que são alterados dinamicamente.

- Encapsular todos os estilos que serão alterados em uma função React.
- A função React começa com a letra maiúscula, para que o código entenda que é um componente React e seja possível utilizar os hooks.

```{javascript}<space>
RootStyles: () => {
    const { theme } = useContext(ThemeContext);
    const { colors } = theme;
    return {
      activeText: css`
        font-weight: 600;
        font-family: ${variables.nunitoRegular};
        font-size: 18px;
        line-height: 24px;
        color: ${colors.primary[500]};
        margin-top: 20px;
      `,
      mainText: css`
        font-weight: normal;
        font-family: ${variables.nunitoRegular};
        font-size: 18px;
        line-height: 24px;
        color: ${colors.secondary[500]};
        margin-bottom: 10px;
      `,
    };
  },
```

- A importação dos estilos continua a mesma, podendo fazer uma desestruturação de objeto do RootStyles e capturar o estilo.

## Alterando cores das imagens e ícones

##### Adicionar o arquivo .svgrrc na raiz do projeto, com o código abaixo:

```{javascript}<space>
{
  "replaceAttrValues": {
    "#E6EAF7": "{props.primary100}",
    "#BFCBEC": "{props.primary200}",
    "#8098D8": "{props.primary300}",
    "#4064C5": "{props.primary400}",
    "#0031B2": "{props.primary500}",
    "#002A97": "{props.primary600}",
    "#00227D": "{props.primary700}",
    "#001B62": "{props.primary800}",
    "#001447": "{props.primary900}",
    "#FCE6E6": "{props.secondary100}",
    "#FACCCC": "{props.secondary200}",
    "#F7B3B3": "{props.secondary300}",
    "#F59999": "{props.secondary400}",
    "#F28080": "{props.secondary500}",
    "#CE6D6D": "{props.secondary600}",
    "#A95A5A": "{props.secondary700}",
    "#854646": "{props.secondary800}",
    "#613333": "{props.secondary900}",
  }
}
```

> Atenção: as imagens devem possuir as cores alteráveis, que são as listadas no arquivo acima.

### Test magic link (Universal Link) on simulator iOS

`xcrun simctl openurl booted https://hml-paciente.conexasaude.com.br/redirecionar/3298b0c7494e4da2be5d2f301607bf55/atendimento-agendado_MEDICO_agendamento-sem-preferencia`
