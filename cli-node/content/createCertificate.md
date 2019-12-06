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
