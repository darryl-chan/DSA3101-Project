import numpy as np
import pandas as pd
import os

from attraction import Attraction
from bundle import Bundle

cwd = os.getcwd()

data_dir = os.path.join(cwd, 'data')

def get_popularity():
    
    df = pd.read_csv(data_dir + f"/attractions.csv")
    
    names = np.array(df['Name'])
    csv_names = np.array(df['CSV name'])
    costs = np.array(df['Price'])
    
    lst_to_store_json = []
    
    for i in range(len(names)):
        name = names[i]
        csv = csv_names[i]
        cost = costs[i]
        
                
        df_of_attraction = pd.read_csv(data_dir + f"/{csv}")
        
        curr_attraction = Attraction(name, cost, df_of_attraction)
        
        lst_to_store_json.append(curr_attraction.return_popularity_analysis())
    
    return lst_to_store_json

def get_bundle_2():
    
    df = pd.read_csv(data_dir + f"/attractions.csv")
    
    names = np.array(df['Name'])
    csv_names = np.array(df['CSV name'])
    costs = np.array(df['Price'])
    
    lst_to_store_json = []
    
    for i in range(len(names)):
        
        for j in range(i+1, len(names)):
            lst_of_attraction = []
            lst_to_iterate = [i, j]
            
            for index in lst_to_iterate:
                
                name = names[index]
                csv = csv_names[index]
                cost = costs[index]
                
                df_of_attraction = pd.read_csv(data_dir + f"/{csv}")
                curr_attraction = Attraction(name, cost, df_of_attraction)
                lst_of_attraction.append(curr_attraction)

            
            bundle = Bundle(lst_of_attraction)

            lst_to_store_json.append(bundle.return_peak_bundle_overall_revenue_info())
    
    return lst_to_store_json

def get_bundle_3():
    
    df = pd.read_csv(data_dir + f"/attractions.csv")
    
    names = np.array(df['Name'])
    csv_names = np.array(df['CSV name'])
    costs = np.array(df['Price'])
    
    lst_to_store_json = []
    
    for i in range(len(names)):
        
        for j in range(i+1, len(names)):
            
            for k in range(j+1, len(names)):
                lst_of_attraction = []
                lst_to_iterate = [i, j, k]
                
                for index in lst_to_iterate:
                    
                    name = names[index]
                    csv = csv_names[index]
                    cost = costs[index]
                    
                    df_of_attraction = pd.read_csv(data_dir + f"/{csv}")
                    curr_attraction = Attraction(name, cost, df_of_attraction)
                    lst_of_attraction.append(curr_attraction)

                
                bundle = Bundle(lst_of_attraction)

                lst_to_store_json.append(bundle.return_peak_bundle_overall_revenue_info())
    
    return lst_to_store_json
            
            
            