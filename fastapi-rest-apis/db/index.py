from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

DB_URL = "postgresql://postgres:mysecretpassword@localhost:5432/automarket"

def createDBSession():
    engine = create_engine(DB_URL)
    Session = sessionmaker(bind=engine)
    session = Session()
    return session

session = createDBSession()

def getDBStatus():
    try:
        session.execute(text("SELECT 1"))
        return 1
    except Exception as e:
        print("ERROR: ", e)
        return 0