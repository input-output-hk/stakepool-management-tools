# 3. Configure Node

**1\. Download the config.yaml file**

**Download** the `config.yaml` file (https://hydra.iohk.io/job/Cardano/jormungandr/jormungandrConfigs.itn_balance_check/latest) and save it to the same location that jormungandr and jcli.  
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

**Start the node** by executing the below command in the same location where all 3 files were saved.

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
