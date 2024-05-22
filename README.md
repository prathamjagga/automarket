![alt text](image.png)

# 🌟 Project Description 
## 📄AutoMarket is the online platform . It is used for creating , publishing , and utilizing microautomations. These microautomations are simple scripts that automate repetitive tasks by taking an input, processing it, and providing an output.

# 🌟 Why It Matters 🚀
n today's fast-paced digital world, efficiency is paramount. AutoMarket addresses the need for streamlined automation solutions, empowering users to focus on high-value tasks while minimizing manual effort.

# 💡 What Sets Us Apart 💡
 - Advanced automation capabilities
 - Customizable workflows
 - Robust security measures
 - Dedicated customer support

# 🔥 Requirements 🔑
### So, how does it works, you can try it out using the steps below:
#### Before you begin, ensure that your system meets the following requirements:
- `Python >=3.10`
- `Postgres instance running on port 5832`
- `NodeJS >=20.10.0 (Only required for frontend.)` 

#### (i) Use a prebuilt action, or create your own action in actions folder. (An action is nothing but a python file/script which takes only one command line argument and prints an output to the console after running the file.)

#### (ii) Run the following command from the root of the project:

`pip install -r requirements.txt`

#### (iii) Run this command from the root of the project:

`python sequentialFlow.py <list of action files seperated by space> <input> `

#### You can try running this example:

`python sequentialFlow.py ./actions/readFile.py ./actions/textSummarizer.py https://www.dwsamplefiles.com/?dl_id=176`



 # 🚀 Getting Started

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

# 🆕 Features
## 🌟 Prebuilt Actions
readFile.py: Reads content from a file or URL.
textSummarizer.py: Summarizes text content.

## 🌟 Create Custom Actions
Easily create custom actions by adding Python scripts in the actions folder.

## 🌟 Integration with Postgres
Store and manage your automation workflows using a Postgres database.

## 🌟 Web Interface
Utilize the web interface (requires NodeJS) to manage and trigger automations from a user-friendly dashboard.

## 🌟 Sequential Execution
Chain multiple actions together and execute them in sequence with a single command.

## 🌟 Error Handling
Robust error handling to ensure smooth execution of your automation workflows.

python sequentialFlow.py ./actions/readFile.py ./actions/textSummarizer.py https://www.dwsamplefiles.com/?dl_id=176

# 🤝 Contributing
We welcome contributions! Please check out our Contributing Guidelines and Code of Conduct.

# 📝 License
This project is licensed under the MIT License. See the LICENSE file for details.

The above will summarize the text file at the url https://www.dwsamplefiles.com/?dl_id=176.

 
<h2 align = "center">Our Contributors ❤️</h2>
<div align = "center">
 <h3>Thank you for contributing to our repository</h3>

![Contributors](https://contrib.rocks/image?repo=knight1001d/automarket)

</div>




