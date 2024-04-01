import numpy as np
import pandas as pd
import os

from attraction import Attraction

cwd = os.getcwd()

data_dir = os.path.join(cwd, 'data')

def get_popularity():
    dic = {
        "name" : ["Singapore cable car", "Sea aquarium"],
        "csv_name" : ["cablecar.csv", "sea_aquarium.csv"],
        "cost" : [28, 30]
    }
    
    df = pd.DataFrame(dic)
    
    names = np.array(df['name'])
    csv_names = np.array(df['csv_name'])
    costs = np.array(df['cost'])
    
    lst_to_store_json = []
    
    for i in range(len(names)):
        name = names[i]
        csv = csv_names[i]
        cost = costs[i]
        
        df_of_attraction = pd.read_csv(data_dir + f"/{csv}")
        
        curr_attraction = Attraction(name, cost, df_of_attraction)
        
        lst_to_store_json.append(curr_attraction.return_popularity_analysis())
    
    return lst_to_store_json


print(get_popularity())