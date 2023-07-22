# Gamification System


## Table of Contents

- [About](#about)

- [Key Features](#key-features)

- [Tech Stack](#tech-stack)

- [Architecture](#architecture)

- [Getting Started](#getting-started)

- [Clone Repository](#clone-repository)

- [Installation](#installation)

- [Deployment](#deployment)

- [GitLab CI/CD Pipeline Setup Instructions](#GitLab-CICD-Pipeline-Setup-Instructions)

## About

PullMaster.io is a software application designed to streamline the code review process and empower junior developers to improve their skills and gain recognition for their work. This platform caters to both developers and managers, offering a seamless and efficient code evaluation system that saves time and effort while ensuring thorough assessments of all pull requests.

## Key Features

- Dynamic Trackers for Code Reviews: Managers can easily review pull requests against a list of dynamic trackers, facilitating a comprehensive evaluation of code quality and its impact on the project.

- Star-Based Rating System: Managers can rate pull requests with stars based on their quality and significance to the project, providing a quantifiable and standardized evaluation method.

- Time-Saving and Efficient: PullMaster.io streamlines the code review process, allowing managers to conduct reviews swiftly without compromising on accuracy and thoroughness.

## Motivation for Junior Developers

- Earn Recognition: Junior developers can earn recognition for their contributions by getting their pull requests rated and accumulating stars.

- Rewards and Incentives: By earning stars, developers can unlock rewards and incentives, providing motivation for continuous improvement.

- Friendly Competition: The leaderboard showcases the order of stars earned by developers, encouraging friendly competition and inspiring excellence.


## Tech stack


PullMaster.io is built using the MERN stack, a powerful and popular combination of technologies that allows for the development of robust and scalable web applications. The MERN stack comprises four main technologies, each serving a specific purpose in the application's architecture:

- **MongoDB**:
  MongoDB is a NoSQL database that provides a flexible and scalable approach to storing and managing data. It allows us to model complex relationships and handle large
  amounts of data efficiently, making it an ideal choice for a dynamic platform like PullMaster.io.

- **Express**:
  Express.js is a minimal and flexible Node.js web application framework that simplifies the process of building server-side applications. It provides a set of essential 
  features and middleware, allowing us to create a robust and performant backend to handle various API endpoints and business logic.

- **React**:
  React is a widely used JavaScript library for building user interfaces. With its component-based architecture and virtual DOM, React enables us to create dynamic and   
  responsive front-end interfaces for PullMaster.io. The use of React components facilitates code reusability, making the application easier to maintain and extend.

- **Node.js**:
  Node.js is a server-side JavaScript runtime that allows us to execute JavaScript code outside the browser. It provides an event-driven, non-blocking I/O model, which   
  ensures high scalability and performance for our backend. Node.js is the foundation of the entire MERN stack, enabling seamless communication between the front-end and 
  back-end components of PullMaster.io.


## Architecture

**System Context Diagram**

![SystemContextDiagram](https://github.com/Mahrukhz/PullMaster.io/assets/68380691/b0d0c353-f05e-48ac-a043-eaecf1c584c6)




**Container Diagram**

![Picture1](https://github.com/Mahrukhz/PullMaster.io/assets/68380691/94cabc5b-35bb-4b62-9186-71afb5b1175b)



## Getting started


### Clone Repository

  

Clone the repository:

```

git clone https://github.com/Mahrukhz/PullMaster.io.git

```

  

**Read the next section to learn how to install the required NPM packages**

  

### Installation

  
- To setup your machine to work on the server(api), consult to the `README.md` in `/api` directory.

- To setup your machine to work on the user interface(ui), consult to the `README.md` in `/ui` directory.


### Deployment

- The website is deployed using AWS
- The link is http://pullmaster.io-react.s3-website.eu-north-1.amazonaws.com
- The code is deployed every time code is committed to the main branch


### GitLab CI/CD Pipeline Setup Instructions

This guide will help you set up the GitLab CI/CD pipeline defined in the .gitlab-ci.yml file for this project. The pipeline consists of two stages, "Builds" and "Unit Tests", and is executed using the Docker image node:16.15.0.

**Prerequisites:**
- Make sure you have a GitLab account and access to the project repository
- Install Git and Docker on your local machine

**Instructions:**
- After cloning the project to the machine 
- Set up the GitLab runner on your local machine following the official GitLab documentation https://docs.gitlab.com/runner/install/

- Register the GitLab runner for the project repository. Follow the official GitLab documentation for instructions https://docs.gitlab.com/runner/register/

- Once the GitLab runner is registered and running, it should automatically pick up the .gitlab-ci.yml file from the project repository and execute the pipeline when you push a commit to the default branch or create a merge request

- To trigger the pipeline manually, push a new commit to the default branch or create a merge request:

```
git checkout <branch>
git add .
git commit -m "Trigger pipeline"
git push origin <branch>

```

- Replace <branch> with the name of the branch you want to push the commit to 
- Visit the project's CI/CD Pipelines page on GitLab to view the pipeline's progress and logs https://gitlab.com/<your-gitlab-username>/<project-name>/-/pipelines
- Replace <your-gitlab-username> with your GitLab username and <project-name> with the name of the project repository
- Once the pipeline is completed, the build artifacts will be available under the "Job artifacts" section on the pipeline details page

### Debugging

- If the pipeline fails or you encounter issues, you can:
- Check the logs of the GitLab runner to get more information about the error
- Modify the .gitlab-ci.yml file to include more debugging information (such as printing the current directory using pwd or listing files using ls)
- Ensure that you have the latest versions of Git and Docker installed on your local machine
- Verify that the GitLab runner is running and registered correctly
- For more information on GitLab CI/CD, consult the official GitLab CI/CD documentation https://docs.gitlab.com/ee/ci/README.html
