# assignment-7feb
upstreet assignment

## Enviornment Variables 

Provide following attirbutes as runtime process.env

secret=

driverlicenceURL=

Command line ex: 

    ```
    export secret=
    ```
    
    ```
    export driverlicenceURL=
    ```

## How to run the service?

1. Clone the repository.
    ```
    https://github.com/mansiTT/assignment-7feb.git
    ```

2. Install Dependencies. 

    Using NPM
    ```
    npm install
    ```

    Or, using Yarn
    ```
    yarn
    ```
3. Run Test Cases 
   
    Using NPM
    ```
    npm test
    ```
    Or, using Yarn
    ```
    yarn test
    ```

4. Run Service  

    clean & build  

    Using NPM
    ```
    npm clean
    ```
    ```
    npm compile
    ```
    Or, using Yarn
    ```
    yarn clean
    ```
    ```
    yarn compile
    ```
    
    Start 

    Using NPM
    ```
    npm start
    ```
    Or, using Yarn
    ```
    yarn start
    
 ## Test Service using CURL 
 
 curl --location --request POST 'http://localhost:8080/customer/kyc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "birthDate": "1985-02-08",
    "firstName": "James",
    "middleName": "Robert",
    "lastName": "Smith",
    "licenceNumber": "94977000",
    "stateOfIssue": "NSW",
    "expiryDate": "2020-01-01"
}'
    
Response : 

```
{
    "errorStatus": false,
    "message": "Success",
    "code": "Successfully completed kyc for customer!!",
    "data": {
        "kycResult": false
    }
}
```

Server Error
```
{
    "errorStatus": true,
    "message": "Server Error",
    "code": "500",
    "data": {}
}
```

Document Error 

```
{
    "errorStatus": true,
    "message": "Document Error",
    "code": "500",
    "data": {}
}
```
