#Get started
## Understand stake pool minimal system requirements 

### Hardware 
* 4 GB of RAM
* A Good network connection and about 1 GB of * bandwidth / hour
* A public ip4 address
* Processor speed is not a significant factor

### Operating System 
Supported stakepool operating systems

We support Linux, Berkeley Software Distribution (BSD), Mac, and Windows platforms. The following versions are required:

* Linux (2.6.18 or later)
* BSD (NetBSD 8.x and FreeBSD 12.x)
* macOS (10.7 Lion or later)
* Windows 10

### Jormungandr

Latest version of jormungandr and jcli

## Install node and command line tool (CLI)

NOTE: If you have any issues while installing Jormungandr and JCLI, please refer to our zendesk [macOS/Linux instructions](https://iohk.zendesk.com/hc/en-us/articles/360036898153) or [Windos instructions](https://iohk.zendesk.com/hc/en-us/articles/360036898353-How-to-Install-Jormungandr-Networking-Windows-) to make sure you are following the most up to date procedure. 

### How to install Jormungandr Networking (Linux/macOS)

**1. Download the latest version jormungandr from [GitHub](https://github.com/input-output-hk/jormungandr/releases/)**

Linux

Under Assets select the jormungandr-v[the latest version number]-x86_64-unknown-linux-gnu.tar.gz for example  jormungandr-v0.5.6-x86_64-unknown-linux-gnu.tar.gz and double click to download this archive. 

macOS

Under Assets select the jormungandr-v[the latest version number]-x86_64-apple-darwin.tar.gz for example jormungandr-v0.5.6-x86_64-apple-darwin.tar.gz and double click to download this archive. 

**2. Extract the files, either use Terminal or Finder**

Using the command line in terminal navigate to the directory where you downloaded the archive: tar -xvzf jormungandr-vx.x.x-x86_64-unknown-linux-gnu.tar.gz

OR

In Finder, navigate to the folder where you saved the archive (the default is the Downloads folder), Double click the archive to extract it. This will create a folder with the same name as the archive and the folder will have two files in it. 

**3. Using the command line in Terminal you can list the files: ls -lrt,** 

You shoud see jormungandr and jcli in your directory. 

## Configure your node

**Download** the node-config.yaml file from this [link] (https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest) and save it to the same location that jormungandr and jcli. 

Use a plain text editor to open the node-config.yaml and add

* Public ip address and,
* Listen address 
* Blocks and messages update priority

```
  "p2p": {
    "listen_address": "/ip4/0.0.0.0/tcp/3100",
    "public_address": "/ip4/0.0.0.0/tcp/3100",
    "topics_of_interest": {
      "blocks": "high",
      "messages": "high"
    },
```  

**Start the node** by executing the below command in the same location where all 3 files were saved.   

`./jormungandr --config node-config.yaml --genesis-block-hash adbdd5ede31637f6c9bad5c271eec0bc3d0cb9efb86a5b913bb55cba549d0770`

## Create a stake pool certificate 

### Create a Stake Pool using a script (Linux/macOS)

* Download the `createStakePool.sh` and `send-certificate.sh` scripts

* Open the terminal in the location where you have the rest of the files (jcli, jormungandr, `node-config.yaml, etc)

* Run the below commands to download the createStakePool.sh and send-certificate.sh scripts into that location:

`wget https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/createStakePool.sh`
`wget https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/send-certificate.sh`

* Check that the scripts were downloaded into the current location by executing ls command into the terminal

* Change the scripts permissions in order to be able to execute them

`chmod +x createStakePool.sh`
`chmod +x send-certificate.sh`

* Check the parameters required by the script

```
./createStakePool.sh --help
usage: ./createStakePool.sh <REST-LISTEN-PORT> <ACCOUNT_SK>
	<REST-PORT>   The REST Listen Port set in node-config.yaml file (EX: 3101)
	<SOURCE-SK>   The Secret key of the Source address`

```
Execute the createStakePool script

Note: In the below command, for the --host parameter, make sure to use the same value you used in node configuration (node-config.yaml) for the rest/listen parameter.

* Update the value of the second parameter with the Private Key of your own Account address

```
./createStakePool.sh 3101 ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk

```
* Check the results

If everything is fine and you did not receive any error, the last line of the script output is your `Stake Pool ID`. Now you can check if your stake pool id appears in the list of available stake pools by executing the below command.

`./jcli rest v0 stake-pools get --host "http://127.0.0.1:3101/api"`

* Now you can start the node as a 'leader candidate', using the `--secret node-config.yaml` parameter. The `node-config.yaml` file was automatically created in the same location as `createStakePool.sh`.



## Send your Stake Pool certificate (Linux/macOS)

**Scenario Prerequisites**

* You already started the node (it is up and synced to the testnet)
* You already have a signed certificate (Stake Pool creation or Account delegation);
* You already have an account with some **funds **in order to pay for the transaction fee;
* For all the below commands, for `--host` parameter you need to use the port/address you configured under the node configuration file for `rest/listen` parameter.


**Check the parameters** required by the script

```
$ ./send-certificate.sh --help
usage: send-certificate.sh <CERTIFICATE-PATH> <REST-LISTEN-PORT> <ACCOUNT-SOURCE-SK>
    <CERT-PATH>   Path to a readable certificate file
    <REST-PORT>   The REST Listen Port set in node-config.yaml file (EX: 3101)
    <SOURCE-SK>   The Secret key of the Source address
```

### Execute the send-certificate.sh script 

Notes: In the below command, for the `<REST-PORT>` parameter, make sure to use the same value you used in node configuration (node-config.yaml) for the rest/listen parameter.

In the below command, we suppose that the signed certificate (the file named stake_pool.signcert) is in the same location with the send-certificate.sh script.

In the below command, for the `SOURCE-SK` parameter, you need to use the private key of an account with enough funds for the transaction fees. 

```
./send-certificate.sh stake_pool.signcert 3101 ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk

```

## Test Stake Pool

### Check that your stake pool is visible

Check that your Stake Pool appears in the list of available stake pools.

`$ jcli rest v0 stake get --host "http://127.0.0.1:3100/api"`

## View reporting





