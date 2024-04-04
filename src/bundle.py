import pandas as pd
import numpy as np
import scipy
import matplotlib.pyplot as plt

class Bundle:
    
    PERCENTAGE_OF_PEOPLE_BUYING_BUNDLE = 0.3
    PERCENTAGE_POPULARITY_DAMPEN = 2.5
    
    def __init__(self, list_of_attractions):
        self.list_of_attractions = list_of_attractions
    
    def get_name(self):
        name = ""
        for attraction in self.list_of_attractions:
            name += attraction.name + "+"
        return name[:-1]
    
    def get_max_possible_price(self):
        max_price = 0
        for attraction in self.list_of_attractions:
            max_price += attraction.cost
        return max_price

    def get_min_possible_price(self):
        return self.get_max_possible_price() / 2
    
    def get_scaled_popularity(self):
        pop = 0
        for attraction in self.list_of_attractions:
            pop += attraction.get_popularity_score()
        
        return pop / (10 * len(self.list_of_attractions))
    
    def get_customers_per_year(self):
        cust = 0
        
        for attraction in self.list_of_attractions:
            cust += attraction.get_customer_per_year() * Bundle.PERCENTAGE_OF_PEOPLE_BUYING_BUNDLE
        
        return cust

    def revenue_for_price(self, price):
        initial_customers = self.get_customers_per_year()
        initial_price = self.get_max_possible_price()
        popularity_percentage = self.get_scaled_popularity()
        
        percentage_change_in_price = (initial_price - price) / initial_price
        popularity_percentage_after_dampen = popularity_percentage * Bundle.PERCENTAGE_POPULARITY_DAMPEN
        #print(f"popularity percentage {popularity_percentage_after_dampen}, initial_customers  = {initial_customers}")
        return (price) * (initial_customers * (percentage_change_in_price * popularity_percentage_after_dampen + 1))
    
    def get_best_price(self):
        
        best_price = scipy.optimize.fmin(lambda x: -self.revenue_for_price(x), 0)
        return best_price[0]
    
    def get_price_revenue_graph(self):
        x = np.linspace(0, self.get_max_possible_price(), 500)
        
        y = self.revenue_for_price(x)
        plt.plot(x, y)
        plt.xlabel('Price')
        plt.ylabel('Revenue')
        plt.title('Function Graph: Revenue vs price')
        plt.axvline(x=self.get_min_possible_price(), color='r', linestyle='--', label='Min price')
        plt.axvline(x=self.get_max_possible_price(), color='r', linestyle='--', label='Max price')
        plt.grid(True)
        plt.show()
        
    def bundle_info(self):
        dic = {
            "name" : self.get_name(),
            "price" : self.get_best_price()
        }
        
        return dic
