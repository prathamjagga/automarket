# 🚀 AutoMarket 🎨

AutoMarket is an online platform for creating, publishing, and utilizing microautomations. This guide will walk you through the steps to get started with AutoMarket.

## 👨‍💻 Demo
![image](https://github.com/IP80808080/automarket/assets/94137507/db80df97-568e-4b0d-8739-31a2cff8ba26)

<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#Project-Description">Project Description</a>
    </li>
    <li>
      <a href="#2 Requirement">🔥 Requirement 🔑</a>
    </li>
    <li>
      <a href="#3 Why It Matters">🌟 Why It Matters 🚀</a>
    </li>
    <li>
      <a href="#4 What Sets Us Apart">💡 What Sets Us Apart 💡</a>
    </li>
    <li>
      <a href="#5 Tutorial">🌟 Tutorial 💡</a>
    </li>
    <li>
      <a href="#6 Building Your Project">Building Your Project 🏗️</a>
    </li>
    <li>
      <a href="#7 Contributing">Contributing 🤝</a>
    </li>
    <li>
      <a href="#8 About AutoMarket">About AutoMarket ℹ️</a>
    </li>
    <li>
      <a href="#9 Conclusion">Conclusion 🎉</a>
    </li>
  </ol>
</details>

<h2 id="Project-Description">Project description:</h2>
📄AutoMarket is an online platform that enables users to create, publish, and utilize microautomations. 
By leveraging the power of Python and Postgres, AutoMarket streamlines repetitive tasks and enhances productivity.


## <a name="2 Requirement">🔥 Requirement 🔑</a>
Before you begin, ensure that your system meets the following requirements:
- Python >=3.10
- PostgreSQL instance running on port 5832
- NodeJS >=20.10.0 (Only required for the frontend)

## <a name="3 Why It Matters">🌟 Why It Matters 🚀</a>
In today's fast-paced digital world, efficiency is paramount. AutoMarket addresses the 
need for streamlined automation solutions, empowering users to focus on high-value tasks while minimizing manual effort.

## <a name="4 What Sets Us Apart">💡 What Sets Us Apart 💡</a>
- Advanced automation capabilities
- Customizable workflows
- Robust security measures
- Dedicated customer support

## <a name="5 Tutorial">🌟 Tutorial 💡</a>
Our step-by-step tutorial to kickstart your automation journey with AutoMarket.

### 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/knight1001d/automarket.git
```

### 2. Install Required Packages
Install dependencies by running the following command from the root of the project:

```bash
cd automarket
pip install -r requirements.txt
```

### 3. Run the following command from the root of the project to execute the sequential flow:
To start the development server, run the following command:

```bash
python sequentialFlow.py <list of action files separated by space> <input>
```
Example:
```bash
python sequentialFlow.py ./actions/readFile.py ./actions/textSummarizer.py https://www.dwsamplefiles.com/?dl_id=176
```

### 4. View Your Project
```bash
cd frontend
npm i
npm start
```

### 5. Watch the development server
```bash
Local:        http://localhost:3000
```

## <a name="6 Building Your Project">Building Your Project 🏗️</a>
Get started with building your project using AutoMarket:

- Create a new project folder.
- Initialize AutoMarket within your project.
- Define your automation tasks.
- Run your automation scripts.

## <a name="7 Contributing">Contributing 🤝</a>
Contributions to AutoMarket are welcome! Whether you're a developer, designer, or enthusiast, join us in making automation accessible to everyone.

## <a name="8 About AutoMarket">About AutoMarket ℹ️</a>
AutoMarket is developed and maintained by a team of automation enthusiasts dedicated to simplifying complex tasks.

## <a name="9 Conclusion">Conclusion 🎉</a>
Wrap up your automation journey with AutoMarket. Celebrate your achievements and explore new possibilities for automation.
