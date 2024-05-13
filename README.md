# Transaction Broadcasting and Monitoring

This is the Transaction Broadcasting and Monitoring client module that will broadcasting a transaction and you can monitor its status
until it finish.

The module have inputs for adding the symbol of currency and price. When you add all of the input and click on submit button, it will send a request to "https://mock-node-wgqbnxruha-as.a.run.app/broadcast" with symbol, price and timestamp. If it's finish, the HTTP server will response
and send back the transaction hash. Then it will use the transaction hash for getting the status of transaction by sending a request with the hash to "https://mock-node-wgqbnxruha-as.a.run.app/check/<transaction hash>". You will get the status of transaction after the process is complete.
