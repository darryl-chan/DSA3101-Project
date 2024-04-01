import numpy as np
import pandas as pd

class Attraction:
    # Class attributes (optional)
    REVIEW_TO_CUSTOMER_MULTIPLIER = 455
    MIN_REVIEW_SCORE = 4
    MAX_REVIEW_SCORE = 4.8
    WEIGHT_FOR_REVIEW = 0.65
    WEIGHT_FOR_NUMBER_OF_CUSTOMERS = 0.35
    SCALING_FACTOR = 0.001
    SHIFTING_FACTOR = 2000
    

    # Constructor method (initialize object)
    def __init__(self, name, cost, df):
        # Instance attributes
        self.name = name
        self.cost = cost
        self.df = df
        self.customer_per_year = self.get_customer_per_year()

    def get_number_of_review(self):
        return len(self.df)

    def get_customer_per_year(self):
        number_of_reviews_per_year = self.get_number_of_review() / 3
        estimate_of_customers_per_years = number_of_reviews_per_year * Attraction.REVIEW_TO_CUSTOMER_MULTIPLIER
        return estimate_of_customers_per_years

    def get_revenue_per_year(self):
        return self.get_customer_per_year() * self.cost

    def get_mean_score(self):
        mean_score = np.mean(self.df['Score'])
        return mean_score
    
    def get_scaled_score(self):
        return (self.get_mean_score() - Attraction.MIN_REVIEW_SCORE) / (Attraction.MAX_REVIEW_SCORE - Attraction.MIN_REVIEW_SCORE)
    
    def get_popularity_score(self):
        review_scaled_score = self.get_scaled_score() * Attraction.WEIGHT_FOR_REVIEW
        number_of_customer_score = (1 / (1 + np.exp(-Attraction.SCALING_FACTOR * (self.get_number_of_review() - Attraction.SHIFTING_FACTOR)))) \
            * Attraction.WEIGHT_FOR_NUMBER_OF_CUSTOMERS
            
        return (review_scaled_score + number_of_customer_score) * 10

    def get_popularity_level(self):
        # Very High > 8.5
        # High > 7
        # Medium > 5.5
        # Low > 4
        # Very low < 4
        
        pop_score = self.get_popularity_score()
        
        level = None
        if pop_score >= 8.5 :
            level = "Very high"
        elif pop_score >= 7:
            level = "High"
        elif pop_score >= 5.5:
            level = "Medium"
        elif pop_score >= 4:
            level = "Low"
        else:
            level = "Very Low"
        return level

    def return_popularity_analysis(self):
        json = {
            "name" : self.name,
            "pop" : self.get_popularity_level(),
            "rating" : self.get_popularity_score(),
            "customers" : self.get_customer_per_year(),
            "revenue" : self.get_revenue_per_year()
        }
        return json


# aq = pd.read_csv('./data/sea_aquarium.csv')
# name = "sea aquarium"
# cost = 33

# sea_aquarium_attraction = Attraction(name, cost, aq)
# print(sea_aquarium_attraction.return_popularity_analysis())

# cc = pd.read_csv('./data/cablecar.csv')
# name = "cable car"
# cost = 35

# cablecar = Attraction(name, cost, cc)
# print(cablecar.return_popularity_analysis())