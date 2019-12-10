# 2. Install Node and Command Line Tool (CLI)

## Linux/macOS
**1\. Download Jormungandr (https://github.com/input-output-hk/jormungandr/releases/) latest version**

* Linux
See the Assest Section in Github
`jormungandr-v[the latest version number]-x86_64-unknown-linux-gnu.tar.gz`

* macOS
See the Assets Section in GitHub
`jormungandr-v[the latest version number]-x86_64-apple-darwin.tar.gz`

**2\. Extract the files, either use Terminal or Finder**

* Terminal
Using the command line navigate to the directory where you downloaded the archive and execute:
`tar -xvzf jormungandr-vx.x.x-x86_64-unknown-linux-gnu.tar.gz`

OR

* Finder
Navigate to the folder where you saved the archive and double click it to extract it (the default is the Downloads folder).

**3\. Verify the files were installed correctly**

* In Terminal just type:
`./jcli -V`

* It should return something like:
`jcli 0.7.2`

> **Note:** If you have any issues while installing Jormungandr and JCLI, please refer to our support portal macOS/Linux instructions (https://iohk.zendesk.com/hc/en-us/articles/360036898153) to make sure you are following the most up to date procedure.
