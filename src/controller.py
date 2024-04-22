import numpy as np
import pandas as pd
import os

from attraction import Attraction
from bundle import Bundle

cwd = os.getcwd()

data_dir = os.path.join(cwd, 'data')

def create_attraction_from_df(df):
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
    mflg = np.array(df['Under MFLG?'])
    
    lst_to_store_json = []
    
    for i in range(len(names)):
        name = names[i]
        csv = csv_names[i]
        cost = costs[i]
        is_mflg = mflg[i]
        
                
        df_of_attraction = pd.read_csv(data_dir + f"/{csv}")
        
        curr_attraction = Attraction(name, cost, df_of_attraction, is_mflg)
        
        lst_to_store_json.append(curr_attraction.return_peak_popularity_analysis_monthly())
    
    return lst_to_store_json

def get_best_bundle_revenue_split():
    lst_of_bundles = list_of_bundles()
    
    lst_of_mflg_bundles = list(filter(lambda x: x.has_at_least_one_mflg_attraction(), lst_of_bundles))
    
    lst_of_revenues = list(map(lambda x : x.get_peak_best_revenue(), lst_of_mflg_bundles))
    
    max_revenue = max(lst_of_revenues)
    
    max_index = lst_of_revenues.index(max_revenue)
    
    bundle_with_highest_revenue = lst_of_bundles[max_index]
    
    return [bundle_with_highest_revenue.return_peak_revenue_split()]
    
    
def list_of_bundles():
    df = pd.read_csv(data_dir + f"/attractions.csv")
    
    names = np.array(df['Name'])
    csv_names = np.array(df['CSV name'])
    costs = np.array(df['Price'])
    mflg = np.array(df['Under MFLG?'])
    
    lst = []
    
    for i in range(len(names)):
        
        for j in range(i+1, len(names)):
            lst_of_attraction = []
            lst_to_iterate = [i, j]
            
            for index in lst_to_iterate:
                
                name = names[index]
                
                csv = csv_names[index]
                cost = costs[index]
                is_mflg = mflg[index]
                
                df_of_attraction = pd.read_csv(data_dir + f"/{csv}")
                curr_attraction = Attraction(name, cost, df_of_attraction, is_mflg)
                lst_of_attraction.append(curr_attraction)

            
            bundle = Bundle(lst_of_attraction)

            lst.append(bundle)
    return lst

def get_bundles_with_at_least_one_mflg():
    lst_of_bundles = list_of_bundles()
    
    lst_of_mflg_bundles = list(filter(lambda x: x.has_at_least_one_mflg_attraction(), lst_of_bundles))
    
    lst_of_revenues = list(map(lambda x : x.get_peak_best_revenue(), lst_of_mflg_bundles))
    
    max_revenue = max(lst_of_revenues)
    
    max_index = lst_of_revenues.index(max_revenue)
    
    bundle_with_highest_revenue = lst_of_bundles[max_index]
    
    return [bundle_with_highest_revenue.return_peak_bundle_overall_revenue_info()]
  