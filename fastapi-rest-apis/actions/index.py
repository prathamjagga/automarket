from db.index import runSQL

def addAction(name, inputs):
    try:
        runSQL(f"INSERT INTO \"actions_content\" (\"name\") VALUES ('{name}')")
        for val in inputs:
            runSQL(f"INSERT INTO \"action_inputs\" (\"action\", \"input_name\", \"input_type\") VALUES ('{name}', '{val['input_name']}', '{val['input_type']}')")
        return "Success"
    except Exception as e:
        print("ERROR", e)

def getAllActions():
    try:
        result = runSQL(f"select distinct * from action_inputs INNER join actions_content on actions_content.name = action_inputs.action")
        result = result.fetchall()
        print("RESULT", result)
        return result
    except Exception as e:
        print("ERROR while getting actions", e)
        return False

def getAction(name):
    try:
        result = runSQL(f"select distinct * from action_inputs INNER join actions_content on actions_content.name = action_inputs.action where actions_content.name = '{name}'")
        result = result.fetchall()
        return result
    except:
        pass