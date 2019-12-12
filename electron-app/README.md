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

> All installers can be found in the `dist` folder

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

> On a Linux environment `yarn run dist:wl` can be run to build both Linux and Windows installers at once.

#### Build and sign application for macOS (.app)

> NOTE: This requires a valid Developer ID Application certificate and the file `electron-builder.env` properly configured

In project folder run:

```console
yarn run dist:mac
```

#### Build and sign the macOS installer (.pkg)

> NOTE: This requires a valid Developer ID Installer certificate

Package `.app` directory into a `.pkg` file:

```console
pkgbuild --install-location /Applications --component dist/mac/GUI-stake-pool-management.app dist/SPM-unsigned.pkg
```

Sign the `.pkg` file with a Developer ID Installer certificate:

```console
productsign -s "<certificate name>" dist/SPM-unsigned.pkg dist/GUI-stake-pool-management-v0.1.0-apple-darwin.pkg
```

You can check if the package was correctly signed with:

```console
pkgutil --check-signature dist/GUI-stake-pool-management-v0.1.0-apple-darwin.pkg
```

#### Notarize the macOS installer (.pkg)

Submit package to notarize:

```console 
xcrun altool --notarize-app -f dist/GUI-stake-pool-management-v0.1.0-apple-darwin.pkg --primary-bundle-id io.iohk.spm -u <apple-developer-username> -p <password>
```

If it was uploaded successfully the last command will return a `RequestUUID` token, copy it and use it with the following command to get the notarization status:

```console
xcrun altool --notarization-info <request-uuid> -u <apple-developer-username> -p <password>
```

Once it succeeds, staple and validate the noratization to the `.pkg`:

```console
xcrun stapler staple dist/GUI-stake-pool-management-v0.1.0-apple-darwin.pkg
```
```console
xcrun stapler validate dist/GUI-stake-pool-management-v0.1.0-apple-darwin.pkg
```

You can check if the notarization was successful running:

```console
spctl -a -v -t install dist/GUI-stake-pool-management-v0.1.0-apple-darwin.pkg 
```
