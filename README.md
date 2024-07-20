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

<div>
  <h2><img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.webp" width="35" height="35"> Ready to Contribute?</h2>
</div>

Kindly go through [CONTRIBUTING.md](https://github.com/prathamjagga/automarket/blob/main/CONTRIBUTING.md) to understand everything from setup to contributing guidelines.

If you would like to contribute to the project, please follow our contribution guidelines.

<!-- Open Source Programs -->
  <div>
    <h2><img src="https://github.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/blob/master/Emojis/Hand%20gestures/Flexed%20Biceps.png?raw=true" width="35" height="35" > Open Source Programs</h2>
  </div>

  <table border="1" cellpadding="10">
        <tr>
            <td rowspan="2">
                <img src="https://github.com/user-attachments/assets/6bcde2b3-a688-4ef8-a018-d83f912dae7c" alt="GSSOC Logo" width="100" height="55">
            </td>
            <td>
                <strong>GSSOC 2024</strong>
            </td>
        </tr>
        <tr>
            <td>
                This project is part of GirlScript Summer of Code. We welcome contributions from the community.
            </td>
        </tr>
    </table>

<hr>

<!-- Code of conduct -->
<div>
<h2><img src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png" width="35" height="35"> Code of Conduct</h2>
</div>

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

<hr>

<!-- License -->
<div>
<h2><img src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Page%20with%20Curl.png" width="35" height="35"> License</h2>
</div>

This project is licensed under the [GPL-3.0](./LICENSE).

<hr>

<div>
  <h2><img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.webp" width="35" height="35"> Show Your Support</h2>
</div>

If you find this project interesting and inspiring, please consider showing your support by starring it on GitHub!

<hr>
 
<h2 >Our Contributors ❤️</h2>
<div>
 <h3>Thank you for contributing to our repository</h3>

![Contributors](https://contrib.rocks/image?repo=knight1001d/automarket)

</div>
