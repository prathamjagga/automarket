from db.index import runSQL

def addAction(name, input, output):
    try:
        result = runSQL(f"INSERT INTO \"actions_content\" (\"name\", \"input_type\", \"output_type\") VALUES ('{name}', '{input}', '{output}')")
        return result
    except Exception as e:
        print("ERROR", Exception)

def getAllActions():
    try:
        result = runSQL("SELECT * from \"actions_content\"")
        result = result.fetchall()
        print("RESULT", result)
        return result
    except Exception as e:
        print("ERROR while getting actions", e);
        return False