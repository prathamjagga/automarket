## AutoMarket is the online platform to create microautomations, publish them and use them.

### So, how does it works?

#### (i) Use a prebuilt action, or create your own action in actions folder. (An action is nothing but a python file/script which takes only one command line argument and prints an output to the console after running the file.)

#### (ii) Run this command from the root project:

`python sequentialFlow.py <list of action files seperated by space> <input> `

#### You can try running this example:

`python sequentialFlow.py ./actions/readFile.py ./actions/textSummarizer.py https://www.dwsamplefiles.com/?dl_id=176`

The above will summarize the text file at the url https://www.dwsamplefiles.com/?dl_id=176["https://www.dwsamplefiles.com/?dl_id=176"].
