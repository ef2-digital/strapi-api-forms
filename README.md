# Strapi Form Generator Plugin
This is a plugin for [Strapi](https://strapi.io/), a headless CMS, that allows you to generate API forms with multiple input fields and email handling capabilities.

## NEW RELEASE
As of 26-04-2024 there is a new release (1.2.0) which adds the following:
### Upload field
A new upload field, for processing files from a form, including uploading to uploads folder and as attachment in notifications

### Checkbox group field
A checkbox group field, for multiple grouped checkboxes with one label

### Export submissions
Export form submissions to CSV format

### Start / End date setting
Each form has an optional start/end date function, with a cron tasks that runs each night to check if a form needs to be active/inactive

## Upcoming features
### Date field
### Relational field
### Multiple steps form


## Features

- Generate API forms with multiple input fields
- Email handling capabilities

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Strapi installed on your machine. If you don't have it installed, you can follow the instructions [here](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/installation/cli.html).

### Installation

1. Clone the repository: `git clone https://github.com/your-username/strapi-form-generator-plugin.git`
2. Install dependencies: `cd strapi-form-generator-plugin && npm install`
3. Start Strapi: `npm run develop`

### Usage

1. Access the Strapi admin panel at `http://localhost:1337/admin`
2. Go to the Plugins section and enable the Strapi Form Generator Plugin
3. Create a new API form with the desired input fields
4. Customize the email handling settings as needed

### Contributing

Contributions are welcome! Please read our [contribution guidelines](CONTRIBUTING.md) for more information.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
