# Get started setting up a stake pool on Linux from binaries.

# Understand stake pool minimal system requirements

There are hardware, operating system and software requirements to set up a stake pool.

## Hardware
* 4 GB of RAM
* A Good network connection and about 1 GB of * bandwidth / hour
* A public ip4 address
* Processor speed is not a significant factor

## Operating System
Supported stake pool operating systems

We support Linux, Berkeley Software Distribution (BSD), Mac, and Windows platforms. The following versions are required:

* Linux (2.6.18 or later)
* BSD (NetBSD 8.x and FreeBSD 12.x)
* macOS (10.7 Lion or later)
* Windows 10

## Software (Jormungandr)

Latest version of jormungandr and jcli. Check the [repository](https://github.com/input-output-hk/jormungandr/releases)

# Start Jormungandr node

Installing the Jormungandr node and CLI tool JCLI is as easy as: downloading, extracting and checking

Note: If you have any issues while installing Jormungandr and JCLI, please refer to our support portal [macOS/Linux instructions](https://iohk.zendesk.com/hc/en-us/articles/360036898153) to make sure you are following the most up to date procedure.

## 1. Download Jormungandr from [GitHub](https://github.com/input-output-hk/jormungandr/releases/)

* For Linux download the file ending in `...-x86_64-unknown-linux-gnu.tar.gz`
* For MacOS download the file ending in `...-x86_64-apple-darwin.tar.gz`

## 2. Extract the files, either use Terminal or Finder

* Using the command line: in terminal, navigate to the directory where you downloaded the archive and execute
``` shell
tar -xvzf jormungandr-vx.x.x-x86_64-unknown-linux-gnu.tar.gz
```

OR

* In Finder: navigate to the folder where you saved the archive (the default is the Downloads folder), Double click the archive to extract it. This will create a folder with the same name as the archive and the folder will have two files in it.

## 3. Verify the files were installed correctly

In Terminal just type

``` shell
./jcli -V
```

and it will return something like

``` shell
jcli 0.7.2
```

## 4. Configure your node

### 4.1. Download the config.yaml file

The config.yaml file has the list of trusted peers. From this list the node is going to downlod it's copy of the blockchain.
You can find it [here](https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest) and save it to the same location that `jormungandr` and `jcli`.

### 4.2. Download the genesis-hash.txt file

From the same location you can also download the genesis-hash.txt file.
The genesis-hash contains the initial configuration of the testnet.

``` shell
curl -sLOJ https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest/download/2/genesis-hash.txt
```

### 4.3. Edit config.yaml file

By the defaul the config file comes setup for passive node, but since we want to creat a stake pool we need to edit the file.
Use a plain text editor to open the config.yaml and add

* Public ip address,
* Listen address,
* Blocks and messages update priority

``` json
  "p2p": {
    "listen_address": "/ip4/0.0.0.0/tcp/3000",
    "public_address": "/ip4/0.0.0.0/tcp/3000", # Replace 0.0.0.0 with your public IP
    "topics_of_interest": {
      "blocks": "high",
      "messages": "high"
    },
```

## 5 Start the node
Executing the command in the same location where all 3 files were saved.

``` shell
./jormungandr --genesis-block-hash $(cat genesis-hash.txt) --config config.yaml
```


## 6 Check that the node syncing
Execute the following command in your command-line interface to check if your node is syncing.

``` shell
./jcli rest v0 node stats get --host "http://127.0.0.1:3100/api"
```
It will output somethnig like this:

``` yaml
---
blockRecvCnt: 351
lastBlockDate: "220.1821"
lastBlockFees: 0
lastBlockHash: 13966f0025b46667f2a0ce8c13409025d10237e21b5d3f7083d3d795a9b39f2d
lastBlockHeight: "28663"
lastBlockSum: 0
lastBlockTime: "2019-09-30T08:54:17+00:00"
lastBlockTx: 0
txRecvCnt: 0
uptime: 1057
```

Your node is synced with the blockchain when it receives all the blocks that are created in the network/blockchain in real-time. You can check that by following the below 2 rules:

1. execute the `node stats` command from above multiple times and check that the value of the lastBlockHash field is updated (with the actual blockchain values, there should bea new block created every 2-5 minutes);
2. compare the value of the lastBlockTime field (that is in UTC) with the local time of the node. If the difference if more than 10 minutes, the node might not be `synced` even the node received blocks in the past (blockRecvCnt > 0);

# Fund stake pool owner account in JCLI
In order to register a stakepool in the blockchain, you will need to create a stake pool certificate and send it to the blockchain. This will require you to have enough funds to pay for the transaction fee.
Note: This step is going to change with the new Daedalus

## Create an account address using the script

- 1. Run the following command to download the `createAddress.sh` script into that location

``` shell
curl -sLOJ https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/createAddress.sh
```

- 2. Make the script executable

``` shell
chmod +x createAddress.sh
```

* Create a new account address.

``` shell
./createAddress.sh account
```

The result is similar to the following,  **IT IS EXTREMELY IMPORTANT THAT YOU SAVE YOUR KEYS FOR FUTURE USE**

``` shell
PRIVATE_KEY_SK: ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk
PUBLIC_KEY_PK: ed25519_pk165szfu0nd37eakuurxpvmesdmss6c7fdkzmqxrs8cxnyx9rxrhsqnv7dj5
ADDRESS: ca1sh2jqf837dk8m8kmnsvc9n0xphwzrtre9kctvqcwqlq6vsc5vcw7q63gc9l
```

## Send funds to your stake pool account

Fund your stakepool account from your *Daedalus Incentivized Wallet* or your *Yoroi Incentivized Wallet* with a regular transaction.

---

# Create a stake pool certificate in JCLI

## 1. Create a stake pool using a script

* Download the `createStakePool.sh` and `send-certificate.sh` scripts from the [repository](https://github.com/input-output-hk/jormungandr-qa/tree/master/scripts) and save them to the directory where you stored the rest of the files (jcli, jormungandr, config.yaml, etc)
  You can download the scripts using your browser or the following commands

* Open the terminal in the location where you have the rest of the files (jcli, jormungandr, config.yaml, etc) and run the below commands to download the `createStakePool.sh` and `send-certificate.sh` scripts into that location:

`curl -sLOJ https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/createStakePool.sh`

`curl - sLOJ https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/send-certificate.sh`

* Check that the scripts were downloaded into the current location by executing ls command into the terminal

* Change the scripts permissions in order to be able to execute them

``` shell
chmod +x createStakePool.sh
chmod +x send-certificate.sh
```

* Check the parameters required by the script

``` shell
./createStakePool.sh --help

```

Output:

``` shell
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

## Send your Stake Pool certificate

### Check parameters required by the script

``` shell
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

### Check that your stake pool is visible


Check that your Stake Pool appears in the list of available stake pools.

`$ jcli rest v0 stake get --host "http://127.0.0.1:3100/api"`

# View reporting

**To be filled by Ana Clara (ATIX)**
