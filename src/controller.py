import numpy as np
import pandas as pd
import os

from attraction import Attraction
from bundle import Bundle

cwd = os.getcwd()

data_dir = os.path.join(cwd, 'data')

def create_attraction_from_df(df):
    print(df)
    name = df.iloc[0]['Name']
    csv = df.iloc[0]['CSV name']
    cost = df.iloc[0]['Price']
    mflg = df.iloc[0]['Under MFLG?']
    
    df_of_attraction = pd.read_csv(data_dir + f"/{csv}")
    attraction = Attraction(name, cost, df_of_attraction, mflg)
    return attraction

def create_bundle(lst):
    df = pd.read_csv(data_dir + f"/attractions.csv")
    
    attraction_1_name = lst[0]
    attraction_2_name = lst[1]
    
    df_attraction_1 = df[df['Name'].str.replace(" ", "").str.lower() == attraction_1_name.replace(" ", "").lower()]
    df_attraction_2 = df[df['Name'].str.replace(" ", "").str.lower() == attraction_2_name.replace(" ", "").lower()]
    
    attraction_1 = create_attraction_from_df(df_attraction_1)
    attraction_2 = create_attraction_from_df(df_attraction_2)
    
    bundle = Bundle([attraction_1, attraction_2])
    return bundle
    

def bundle_2_attraction(lst):
    bundle = create_bundle(lst)
    
    if lst[-1] != "peak":
        return bundle.return_non_peak_bundle_overall_revenue_info()
    else:
        return bundle.return_peak_bundle_overall_revenue_info()
    

def get_revenue_split(lst):
    bundle = create_bundle(lst)
    
    if lst[-1] != "peak":
        return bundle.return_non_peak_revenue_split()
    else:
        return bundle.return_peak_revenue_split()
    
    

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

# def get_bundle_2():
    
#     df = pd.read_csv(data_dir + f"/attractions.csv")
    
#     names = np.array(df['Name'])
#     csv_names = np.array(df['CSV name'])
#     costs = np.array(df['Price'])
    
#     lst_to_store_json = []
    
#     for i in range(len(names)):
        
#         for j in range(i+1, len(names)):
#             lst_of_attraction = []
#             lst_to_iterate = [i, j]
            
#             for index in lst_to_iterate:
                
#                 name = names[index]
                
#                 csv = csv_names[index]
#                 cost = costs[index]
                
#                 df_of_attraction = pd.read_csv(data_dir + f"/{csv}")
#                 curr_attraction = Attraction(name, cost, df_of_attraction)
#                 lst_of_attraction.append(curr_attraction)

            
#             bundle = Bundle(lst_of_attraction)

#             lst_to_store_json.append(bundle.return_peak_bundle_overall_revenue_info())
    
#     return lst_to_store_json

# def get_bundle_3():
    
#     df = pd.read_csv(data_dir + f"/attractions.csv")
    
#     names = np.array(df['Name'])
#     csv_names = np.array(df['CSV name'])
#     costs = np.array(df['Price'])
    
#     lst_to_store_json = []
    
#     for i in range(len(names)):
        
#         for j in range(i+1, len(names)):
            
#             for k in range(j+1, len(names)):
#                 lst_of_attraction = []
#                 lst_to_iterate = [i, j, k]
                
#                 for index in lst_to_iterate:
                    
#                     name = names[index]
#                     csv = csv_names[index]
#                     cost = costs[index]
                    
#                     df_of_attraction = pd.read_csv(data_dir + f"/{csv}")
#                     curr_attraction = Attraction(name, cost, df_of_attraction)
#                     lst_of_attraction.append(curr_attraction)

                
#                 bundle = Bundle(lst_of_attraction)

#                 lst_to_store_json.append(bundle.return_peak_bundle_overall_revenue_info())
    
#     return lst_to_store_json
            
            
            