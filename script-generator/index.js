const fs = require('fs');
var path = require('path');
const inquirer = require("inquirer");
const { exit } = require('process');

let ticketNumber, startingID, dispostionName, productType;
let countryPPWC = ['US', 'UK', 'AU', 'DU'];
let countryGPL = ['US', 'UK', 'AU'];
let country;

inquirer
  .prompt([
    {
        name: "ticketNumber",
        type: "input",
        message: "Please input your ticket Number, If you want to skip, please enter any string",
        default: "SDS-TEST",
    },
    {
        name: "startingID",
        type: "input",
        message: "Please provide the input DSPTN_ID",
    },
    {
        name: "dispostionName",
        type: "input",
        message: "Please provide the input DSPTN_NAME",
    },
    {
        name: "productType",
        type: "list",
        message: "Please choose the product type",
        choices: [ "P1", "P2" ]
    },
  ])
  .then((answer) => {
      ticketNumber = answer.ticketNumber;
      if (answer.startingID) {
        startingID = answer.startingID;
      } else {
        console.log('Invalid starting ID provided, exiting')
        exit();
      }
      if (answer.dispostionName) {
        dispostionName = answer.dispostionName;
      } else {
        console.log('Invalid dispostion Name provided, exiting')
        exit();
      }
      if (answer.productType) {
        productType = answer.productType;
        country = productType === 'PPWC' ? countryPPWC : countryGPL;
      }
      console.log(ticketNumber, startingID, dispostionName, productType);
      createInsertScript();
  }).catch(error => {
        if (error.isTtyError) {
            console.log(`Prompt couldn't be rendered in the current environment`);
        } else {
            console.log(`Error occured, please retry`, error);
        }
  });

const createInsertScript = () => {
    let insertTemplate ;

    console.log('Creating Insert SQL Script....');

    const insertFilePath = `${path.basename(__dirname)}/output/${ticketNumber}/APPLYSQL.${ticketNumber}.INSERT_T_DSPTN_AGENT_ROLE_DSPTN_LKP.4.sql`;

    const inputFile =  `${path.basename(__dirname)}/input-templates/insert-template.txt`;
    fs.readFile(inputFile, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        const dataTowrite = '';
        // loop for country
        // country.forEach(element => {
        //     const updated = data.replace(/string to be replaced/g, 'replacement');
        //     data
        // });
        
        var dataTowrite = data.replace(/string to be replaced/g, 'replacement');

        fs.writeFile(insertFilePath, dataTowrite, 'utf8', function (error) {
            if (error) return console.log(error);
            console.log('Created Insert Script, successfully');
        });
    });

};