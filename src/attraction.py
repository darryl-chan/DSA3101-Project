import numpy as np
import pandas as pd

class Attraction:
    # Class attributes (optional)
    REVIEW_TO_CUSTOMER_MULTIPLIER = 455
    

    # Constructor method (initialize object)
    def __init__(self, name, cost, df):
        # Instance attributes
        self.name = name
        self.cost = cost
        self.df = df
        self.customer_per_year = self.get_customer_per_year()


    def get_customer_per_year(self):
        number_of_reviews_in_3_years = len(self.df)
        estimate_of_customers_in_3_years = number_of_reviews_in_3_years * Attraction.REVIEW_TO_CUSTOMER_MULTIPLIER
        return estimate_of_customers_in_3_years

    def get_mean_score(self):
        mean_score = np.mean(self.df['Score'])
        return mean_score
    
    def get_popularity(self):
        number_of_reviews_in_3_years = len(self.df)
        