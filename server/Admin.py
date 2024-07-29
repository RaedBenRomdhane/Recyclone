from pymongo import MongoClient


def verify_password(data):
    #data={'username': username,'password': password}
    client= MongoClient("localhost",27017)
    db= client.Waste_Sorting
    Admins=db.Admins
    result=Admins.find({},{"_id":False})
    l=[]
    for el in result:
        l.append(el)
    
    if data in l :
        verification=True
    else:verification=False


    return (verification )



def extarct_fro_history(data):
    if verify_password(data):
        client= MongoClient("localhost",27017)
        db= client.Waste_Sorting
        History=db.History
        
        result=History.find({"type":"real"},{"_id":False}).sort({"_id":-1}) 
        l=[]
        for el in result:
            l.append(el)
        return(l)
    else:
        return(False)


def get_file_name(ch):
    return(ch.split('/').pop())