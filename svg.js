var inquirer = require('inquirer');
const fs = require('fs');
const fileName = 'README.md';
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)
//  Using inquirer and prompt to generate my questions into my command line.
inquirer
    .prompt([
        {
            type: "maxlength-input",
            name: "enterThreeCharacters",
            message: "Enter three characters",
            maxLength: 3
        },
        {
            type: "input",
            name: "descriptionQuestion",
            message: "What is the description of your project?"
        },
        {
            type: "input",
            name: "installationQuestion",
            message: "What is the installation instructions of your project?"
        },
        {
            type: "input",
            name: "usageInformationQuestion",
            message: "What is the usage information for your project?"
        },
        {
            type: "list",
            name: "licenseQuestion",
            message: "Choose a license for your project",
            choices: ['MIT', 'APACHE 2.0', 'GNU General Public Lcense 3.0', 'Boost Software 1.0']
        },
        {
            type: "input",
            name: "contributionGuidelinesQuestion",
            message: "What are the contribution guidelines for your project?"
        },
        {
            type: "input",
            name: "testInstructionsQuestion",
            message: "What are the test instuctions for your project?"
        },
        {
            type: "input",
            name: "userNameQuestion",
            message: "What is your GitHub username?"
        },
        {
            type: "input",
            name: "emailQuestion",
            message: "What is your email?"
        },
    ])
    //  Writing my prompt data into my README file
    .then((promptData) => {
        console.log(promptData);
        writeToReadMe(promptData);
    })
    //  If there are any errors the "There is an error" will generate
    .catch((error) => {
        if (error.isTtyError) {
            console.log("There is an error");
        }
    });

      //  Creating my function variables to write the prompt information to my README file
      function writeToReadMe(answers) {
        var title = answers.titleQuestion;
        var description = answers.descriptionQuestion;
        var installation = answers.installationQuestion;
        var usage = answers.usageInformationQuestion;
        var license = answers.licenseQuestion;
        var contribution = answers.contributionGuidelinesQuestion;
        var testInstructions = answers.testInstructionsQuestion;
        var userName = answers.userNameQuestion;
        var email = answers.emailQuestion;
    
        // Creating the badge for each license choice
        function renderLicenseBadge(licenseBadge) {
            let yourLicense = ''
            if (licenseBadge === 'MIT') {
                yourLicense = `![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)`
            } else if (licenseBadge === 'Apache 2.0') {
                yourLicense = `![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)`
            } else if (licenseBadge === 'GNU GPL 3.0') {
                yourLicense = `![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)`
            } else {
                yourLicense = '![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)'
            }
            return yourLicense;
        }
    
        // Created the function to write my README in the following format
        function returnReadmeContent() {
            return `
    ${renderLicenseBadge(license)}
        
     # ${title}
                
    ## Description
                
    ${description}
        
    ## Table of Contents
        
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [Contribution](#contribution)
    * [Test](#test)
    * [Questions](#questions) 
                
    ## Installation
                
    ${installation}
                
    ## Usage Information
                
    ${usage}
        
    ## License
        
    ${license}
                
    ## Contribution Guidelines
                
    ${contribution}
                
    ## Test Instructions
                
    ${testInstructions}
        
    # Questions:
        
    If you have any questions, feel free to reach out: 
        
    GitHub: [GitHub](https://github.com/${userName}) 
        
    Email: ${email}
            `;
        }
    
        //  This creates the README with the correct filename 
        fs.writeFile(fileName, returnReadmeContent(), 'utf-8', err => {
            err ? console.error(err) : console.log('readme file created!')
        });
    
    }