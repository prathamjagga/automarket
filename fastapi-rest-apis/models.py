from pydantic import BaseModel

class ActionsContent(BaseModel):
    name: str
    input_type: str
    output_type: str

class FlowsContent(BaseModel):
    nodes: list

class RunFlowInput(BaseModel):
    nodes: list
    input: str