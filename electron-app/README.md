# Stake Pool Management

## Install dependencies

- Use nodejs v10.16.3: `nvm install 10.16.3 && nvm alias default 10.16.3`
- Node dependencies: `yarn install`

## Run Development Build

In project folder run:

```console
yarn start
```

## Build installers

#### Build installers for your current OS

In project folder run:

```console
yarn run dist
```

#### Build installers for Linux (.deb, .rpm, .AppImage, .snap)

In project folder run:

```console
yarn run dist:linux
```

#### Build installers for Windows (.zip)

In project folder run:

```console
yarn run dist:win
```

The installers can be found in the `dist` folder
