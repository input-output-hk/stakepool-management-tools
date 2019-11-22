#Get started
## Understand stake pool minimal system requirements 

### Hardware 
* 4 GB of RAM
* A Good network connection and about 1 GB of * bandwidth / hour
* A public ip4 address
* Processor speed is not a significant factor

### Operating System 
Supported stake pool operating systems

We support Linux, Berkeley Software Distribution (BSD), Mac, and Windows platforms. The following versions are required:

* Linux (2.6.18 or later)
* BSD (NetBSD 8.x and FreeBSD 12.x)
* macOS (10.7 Lion or later)
* Windows 10

### Jormungandr

Latest version of jormungandr and jcli. Check the [repository](https://github.com/input-output-hk/jormungandr/releases)

## Install node and command line tool (CLI)

NOTE: If you have any issues while installing Jormungandr and JCLI, please refer to our zendesk [macOS/Linux instructions](https://iohk.zendesk.com/hc/en-us/articles/360036898153) or [Windos instructions](https://iohk.zendesk.com/hc/en-us/articles/360036898353-How-to-Install-Jormungandr-Networking-Windows-) to make sure you are following the most up to date procedure. 

### How to install Jormungandr Networking (Linux/macOS)

**1. Download the latest version of jormungandr from [GitHub](https://github.com/input-output-hk/jormungandr/releases/)**

Linux

Under **Assets**, select the jormungandr-v[the latest version number]-x86_64-unknown-linux-gnu.tar.gz (For example jormungandr-v0.5.6-x86_64-unknown-linux-gnu.tar.gz) and double click to download the archive. 

macOS

Under **Assets**, select the jormungandr-v[the latest version number]-x86_64-apple-darwin.tar.gz (For example jormungandr-v0.5.6-x86_64-apple-darwin.tar.gz) and double click to download the archive. 

**2. Extract the files, either use Terminal or Finder**

* Using the command line: in terminal, navigate to the directory where you downloaded the archive: tar -xvzf jormungandr-vx.x.x-x86_64-unknown-linux-gnu.tar.gz

OR

* In Finder: navigate to the folder where you saved the archive (the default is the Downloads folder), Double click the archive to extract it. This will create a folder with the same name as the archive and the folder will have two files in it. 

**3. Using the command line in Terminal you can list the files: ls -lrt,** 

You shoud see `jormungandr` and `jcli` in your directory. 

## Configure your node

**Download** the config.yaml file from [here] (https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest) and save it to the same location that jormungandr and jcli. 

Use a plain text editor to open the config.yaml and add

* Public ip address,
* Listen address, 
* Blocks and messages update priority

```
  "p2p": {
    "listen_address": "/ip4/0.0.0.0/tcp/3100", 
    "public_address": "/ip4/0.0.0.0/tcp/3100", # Replace 0.0.0.0 with your public IP 
    "topics_of_interest": {
      "blocks": "high",
      "messages": "high"
    },
```  

**Start the node** by executing the below command in the same location where all 3 files were saved.   

`./jormungandr --genesis-block-hash $(curl -sL https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest/download/2) --config config.yaml`

## Create an account address using the script

* Open the terminal in the location where you have the rest of the files (jcli, jormungandr, config.yaml, etc )

* Run the following command to download the `createAddress.sh` script into that location

`curl -SLOJ https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/createAddress.sh`

* You can check that the script was downloaded into the current location by executing `ls` command.

* Change the script permissions before you execute it:

`chmod +x createAddress.sh`

* The script accepts these parameters: account, utxo; execute the script with the account parameter to create a new account address. 

`./createAddress.sh account`


The result is similar to the following,  **IT IS EXTREMELY IMPORTANT THAT YOU SAVE YOUR KEYS FOR FUTURE USE** 


```
PRIVATE_KEY_SK: ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk
PUBLIC_KEY_PK: ed25519_pk165szfu0nd37eakuurxpvmesdmss6c7fdkzmqxrs8cxnyx9rxrhsqnv7dj5
ADDRESS: ca1sh2jqf837dk8m8kmnsvc9n0xphwzrtre9kctvqcwqlq6vsc5vcw7q63gc9l
```


## Send funds to your stake pool account 

Later, you will need to create a stake pool certificate and send it to the blockchain, this will require you to have enough funds to pay for the transaction fees. 

Fund your stakepool account from your *Daedalus Incentivized Wallet* or your *Yoroi Incentivized Wallet* with a regular transaction. 


## Create a stake pool certificate 

### Create a Stake Pool using a script (Linux/macOS)

* Download the `createStakePool.sh` and `send-certificate.sh` scripts from the [repository](https://github.com/input-output-hk/jormungandr-qa/tree/master/scripts) and save them to the directory where you stored the rest of the files (jcli, jormungandr, config.yaml, etc)


OR

* Open the terminal in the location where you have the rest of the files (jcli, jormungandr, config.yaml, etc) and run the below commands to download the `createStakePool.sh` and `send-certificate.sh` scripts into that location:

`curl -SLOJ https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/createStakePool.sh`

`curl - SLOJ https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/send-certificate.sh`

* Check that the scripts were downloaded into the current location by executing ls command into the terminal

* Change the scripts permissions in order to be able to execute them

`chmod +x createStakePool.sh`

`chmod +x send-certificate.sh`

* Check the parameters required by the script

```
./createStakePool.sh --help

```
Output: 

```
usage: ./createStakePool.sh <REST-LISTEN-PORT> <ACCOUNT_SK>
	<REST-PORT>   The REST Listen Port set in config.yaml file (EX: 3100)
	<SOURCE-SK>   The Secret key of the Source address`

```
Execute the `createStakePool.sh` script with the required parameters:

* For the --host parameter, use the same value you used in node configuration (config.yaml) for the **rest/listen** parameter.

* For the second parameter use the **Private Key** of your recently funded stake pool account address. 

```
./createStakePool.sh 3100 ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk

```
* Check the results

If everything is fine and you did not receive any error, the last line of the script output is your `Stake Pool ID`. Now you can check if your stake pool id appears in the list of available stake pools by executing the below command.

`./jcli rest v0 stake-pools get --host "http://127.0.0.1:3100/api"`

* Now you can start the node as a **leader candidate**, using the `--secret node_secret.yaml` parameter. The `node_secret.yaml` file was automatically created in the same location as `createStakePool.sh`.

## Send your Stake Pool certificate (Linux/macOS)

**Scenario Prerequisites**

* You already started the node (it is up and synced to the testnet)
* You already have a signed certificate (Stake Pool creation or Account delegation);
* You already have an account with **enough funds** to pay for the transaction fee;

**Check the parameters** required by the script

```
$ ./send-certificate.sh --help
```
Output

```
usage: send-certificate.sh <CERTIFICATE-PATH> <REST-LISTEN-PORT> <ACCOUNT-SOURCE-SK>
    <CERT-PATH>   Path to a readable certificate file
    <REST-PORT>   The REST Listen Port set in config.yaml file (EX: 3100)
    <SOURCE-SK>   The Secret key of the Source address
```

### Execute the send-certificate.sh script 

Execute the `send-certificate.sh`script with the required parameters:

* Make sure that the signed certificate **(stake_pool.signcert)** is in the **same location** of the `send-certificate.sh` script, 

* For the `<REST-PORT>` parameter, use the same value you used in node configuration (config.yaml) for the rest/listen parameter,

* For the `SOURCE-SK` parameter, use the **private key** of your stake pool account address.

```
./send-certificate.sh stake_pool.signcert 3100 ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk

```

## Check that your stake pool is visible


Check that your Stake Pool appears in the list of available stake pools.

`$ jcli rest v0 stake get --host "http://127.0.0.1:3100/api"`

## View reporting

**To be filled by Ana Clara (ATIX)**







