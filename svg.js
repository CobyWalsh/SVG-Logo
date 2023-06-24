var inquirer = require('inquirer');
const fs = require('fs');
const chalkPipe = require('chalk-pipe')
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
const fileName = 'logo.svg';

inquirer.registerPrompt('chalk-pipe', require('inquirer-chalk-pipe'));
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
            type: "chalk-pipe",
            name: "pickAColor",
            message: "Choose a text color",
            
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
        
    ])
    //  Writing my prompt data into my README file
    .then((promptData) => {
        console.log(promptData);
        writeToSvg(promptData);
    })
    //  If there are any errors the "There is an error" will generate
    .catch((error) => {
        if (error.isTtyError) {
            console.log("There is an error");
        }
    });

      //  Creating my function variables to write the prompt information to my README file
      function writeToSvg(answers) {
        var title = answers.titleQuestion;
        var description = answers.descriptionQuestion;
        var installation = answers.installationQuestion;
        var usage = answers.usageInformationQuestion;
        var license = answers.licenseQuestion;
        var contribution = answers.contributionGuidelinesQuestion;
        var testInstructions = answers.testInstructionsQuestion;
        var userName = answers.userNameQuestion;
        var email = answers.emailQuestion;
    
        // Created the function to write my README in the following format
        function returnSvgContent() {
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
        fs.writeFile(fileName, returnSvgContent(), 'utf-8', err => {
            err ? console.error(err) : console.log('readme file created!')
        });
    
    }