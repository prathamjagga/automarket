![alt text](image.png)

## Project Description 📄
AutoMarket is the online platform . It is used for creating , publishing , and utilizing microautomations. These micro-apps/micro-automations are simple scripts arranged in flow that automate repetitive tasks by taking an input, processing it, and providing an output.

## Why It Matters? 🤔
In today's fast-paced digital world, efficiency is paramount. AutoMarket addresses the need for streamlined automation solutions, empowering users to focus on high-value tasks while minimizing manual effort.


## Requirements 🔑
So, how does it works, you can try it out using the steps below:
Before you begin, ensure that your system meets the following requirements:
- `Python >=3.10`
- `Postgres instance running on port 5832`
- `NodeJS >=20.10.0 (Only required for frontend.)` 

## 🚀 Getting Started

Our step-by-step tutorial to kickstart your automation journey with AutoMarket.

### 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/knight1001d/automarket.git
```

### 2. Install Required Packages
Install dependencies by running the following command from the root of the project:

```bash
cd fastapi-rest-apis
python -m venv venv
./venv/Scripts/activate
pip install -r requirements.txt
cd ../frontend-app
npm i
```

### 3. Run the following command:
To start the development server, run the following command:
```bash
cd ../fastapi-rest-apis
fastapi dev main.py
```

### 4. View Your Project (run this command from frontend-app folder)
```bash
npm start
```

### 5. Watch the development server
```bash
Local:        http://localhost:3000
```

### 🆕 Features

#### 🌟 Prebuilt Actions
readFile.py: Reads content from a file or URL.
textSummarizer.py: Summarizes text content.

#### 🌟 Create Custom Actions
Easily create custom actions by adding Python scripts in the actions folder.

#### 🌟 Web Interface
Utilize the web interface (requires NodeJS) to manage and trigger automations from a user-friendly interface.

#### 🌟 Error Handling
Robust error handling to ensure smooth execution of your automation workflows.

python sequentialFlow.py ./actions/readFile.py ./actions/textSummarizer.py https://www.dwsamplefiles.com/?dl_id=176

## 🤝 Contributing
We welcome contributions! Please check out our Contributing Guidelines and Code of Conduct.

## 📝 License
This project is licensed under the GNU License. See the LICENSE file for details.
 
<h2 align = "center">Our Contributors ❤️</h2>
<div align = "center">
 <h3>Thank you for contributing to our repository</h3>

![Contributors](https://contrib.rocks/image?repo=knight1001d/automarket)

</div>




