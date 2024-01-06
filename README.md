# Kindle Annotations to Markdown Converter

## Overview
This Node.js utility is designed to efficiently extract Kindle book annotations and convert them into Markdown format.

## Installation
Before running the script, ensure you have Node.js installed on your system.
Recommend using nvm to manage you node versions this project uses version 20.

```bash
nvm use
npm install
```

## Configuration
Copy the contents of the .env.example file into a new file named .env in the root directory of the project.
Fill in the .env file with your details.

### Environment Variables
| Variable | Description |
| --- | --- |
| `AMAZON_EMAIL_ADDRESS` | Your Amazon account email address |
| `AMAZON_PASSWORD` | Your Amazon account password |
| `OUTPUT_FOLDER_LOCATION` | Location to save the output Markdown files |

> Note: Keep your .env file secure as it contains sensitive information.

## Running the Script
To run the script, navigate to the root directory of the project in your terminal and execute the following command:

```bash
npm start
```

## Contribution
Contributions to improve this tool are welcome. Please adhere to the contribution guidelines outlined in CONTRIBUTING.md.

## License
This project is licensed under the MIT License.