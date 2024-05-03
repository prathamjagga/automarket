![alt text](image.png)

## AutoMarket is the online platform to create microautomations, publish them and use them.

### So, how does it works, you can try it out using the steps below:

#### But first sure your system meets the following requirements:
`Python >=3.10`
`Postgres instance running on port 5832`
`NodeJS >=20.10.0 (Only required for frontend.)` 


#### (i) Use a prebuilt action, or create your own action in actions folder. (An action is nothing but a python file/script which takes only one command line argument and prints an output to the console after running the file.)

#### (ii) Run the following command from the root of the project:

`pip install -r requirements.txt`

#### (iii) Run this command from the root of the project:

`python sequentialFlow.py <list of action files seperated by space> <input> `

#### You can try running this example:

`python sequentialFlow.py ./actions/readFile.py ./actions/textSummarizer.py https://www.dwsamplefiles.com/?dl_id=176`

The above will summarize the text file at the url https://www.dwsamplefiles.com/?dl_id=176.
