def get_output(json_input):
    import json
    import pandas as pd
    df = pd.read_excel(json_input["url"])
    print(df)
    column = df[json_input["column"]]
    print(column.values.tolist())
    return json.dumps({"output": {"type": "json", "content": {"array": column.values.tolist()}}})
# get_output({"url":"https://file-examples.com/storage/feab15190e668af9da02618/2017/02/file_example_XLSX_50.xlsx", "column":"First Name"})
