from celery import Celery
from datetime import datetime
import time

# local imports
from flows.index import runFlow

app = Celery('am-wf', broker='redis://localhost:6379/0', backend="db+postgresql://avnadmin:AVNS_25aaE9ObriOz2qNOl5X@pg-1629d2c5-prathamjagga123-cbe1.h.aivencloud.com:13791/automarket")

app.conf.update(task_always_eager=False)

@app.task 
def wf_tree_runner_on_interval(interval, nodes, inputs, endTime):
    while True:
        runFlow(nodes, inputs, 1)
        time.sleep(interval)
        if datetime.now().timestamp() >= endTime:
            break
    return True
