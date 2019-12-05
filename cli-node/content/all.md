# 1. Understand Stake Pool Minimum Requirements

**Hardware**
*   4 GB of RAM
*   Processor speed is not a significant factor

**Network**
*   1 GB/hour
*   A public ip4 address

**Operating System**
*   Linux (2.6.18 or later)
*   BSD (NetBSD 8.x and FreeBSD 12.x)
*   macOS (10.7 Lion or later)
*   Windows 10

**Cardano**
*   Install RUST version called Jormungandr (https://github.com/input-output-hk/jormungandr/releases)

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




# 3. Configure Node

**1\. Download the config.yaml file**

Download the `config.yaml` file (https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest) and save it to the same location that jormungandr and jcli.  
The `config.yaml` file has the list of trusted peers. From this list the node is going to download its copy of the blockchain.

**2\. Download the genesis-hash.txt file**

From the same location you can also download the genesis-hash.txt file.  
The genesis-hash contains the initial configuration of the testnet.  

`curl -sLOJ https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest/download/2/genesis-hash.txt`

**3\. Edit config.yaml file**

By default the config file comes setup for passive node, but since we want to creat a stake pool we need to edit the file.

Use a plain text editor to open the config.yaml and add

*   Public ip address
*   Listen address
*   Blocks and messages update priority

```
"p2p": {
  listen_address: '/ip4/0.0.0.0/tcp/3000',  
  public_address: '/ip4/0.0.0.0/tcp/3000', # Replace 0.0.0.0 with your public IP  
  topics_of_interest: {
    blocks: 'high',  
    messages: 'high'  
  }
}
```

**4\. Start the node**

Start the node by executing the below command in the same location where all 3 files were saved.

`./jormungandr --genesis-block-hash $(cat genesis-hash.txt) --config config.yaml`

**5\. Check that the node syncing**

Execute the following command in your command-line interface to check if your node is syncing.

`./jcli rest v0 node stats get --host "http://127.0.0.1:3100/api"`

It will output something like this:

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

Your node is synced with the blockchain when it receives all the blocks that are created in the network/blockchain in real-time.

You can check that by following the below 2 rules:

1\.  Execute the `node stats` command from above multiple times and check that the value of the `lastBlockHash` field is updated (with the actual blockchain values, there should bea new block created every 2-5 minutes);
2\.  Compare the value of the `lastBlockTime` field (that is in UTC) with the local time of the node. If the difference if more than 10 minutes, the node might not be synced even the node received blocks in the past `(blockRecvCnt > 0);`

# 4. Create and Send Certificate

## Linux/macOS

**1\. Download the `createStakePool.sh` and `send-certificate.sh` scripts and save them to the directory where you stored the rest of the files (jcli, jormungandr, config.yaml, etc):**

`curl -sLOJ https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/createStakePool.sh`

`curl - sLOJ https://raw.githubusercontent.com/input-output-hk/jormungandr-qa/master/scripts/send-certificate.sh`

- Check that the scripts were downloaded into the current location by executing `ls` command into the terminal
- Change the scripts permissions in order to be able to execute them
`chmod +x createStakePool.sh`
`chmod +x send-certificate.sh`
- Check the parameters required by the script
`./createStakePool.sh --help`
- Output:

```
  usage: `./createStakePool.sh <REST-LISTEN-PORT>`
  <ACCOUNT_SK>  
  <REST-PORT> The REST Listen Port set in node-config.yaml file (EX: 3101)  
  <SOURCE-SK> The Secret key of the Source address`
```

**2\. Execute the `createStakePool.sh` script**

- For the `--host` parameter, use the same value you used in node configuration (config.yaml) for the **rest/listen** parameter.
- For the second parameter use the **Private Key** of your recently funded stake pool account address.
`./createStakePool.sh 3100 ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk`

- Check the results
- If everything is fine and you did not receive any error, the last line of the script output is your **Stake Pool ID**. Now you can check if your stake pool id appears in the list of available stake pools by executing the below command.
`./jcli rest v0 stake-pools get --host "http://127.0.0.1:3100/api"`
- Now you can start the node as a **leader candidate**, using the `--secret node-config.yaml` parameter. The `node-config.yaml` file was automatically created in the same location as `createStakePool.sh`.

**3\. Send your Stake Pool certificate**

- Check the parameters required by the script
`$ ./send-certificate.sh --help`
- Output

```
  usage: send-certificate.sh <CERTIFICATE-PATH> <REST-LISTEN-PORT> <ACCOUNT-SOURCE-SK>
  <CERT-PATH> Path to a readable certificate file
  <REST-PORT> The REST Listen Port set in node-config.yaml file (EX: 3101)
  <SOURCE-SK> The Secret key of the Source address
```

**4\. Execute the `send-certificate.sh` script**

- Make sure that the signed certificate **(stake_pool.signcert)** is in the **same location** of the `send-certificate.sh` script
- For the `REST-PORT` parameter, use the same value you used in node configuration (config.yaml) for the rest/listen parameter
- For the `SOURCE-SK` parameter, use the **private key** of your stake pool account address.
`./send-certificate.sh stake_pool.signcert 3100 ed25519e_sk1nqh6fk0dm9p3tgvqcgt9had3ajn5pcmme04qp256p3g7tahxd9q9j4wgn2n250huxc5t38u0yjd9rtalrzae9t7xcwzhcz98jf4hamsgfmydk`

# 5. Check that your stake pool is visible

Check that your Stake Pool appears in the list of available stake pools.

`$ jcli rest v0 stake get --host "http://127.0.0.1:3100/api"`
