import numpy as np
from scipy.optimize import minimize_scalar
import matplotlib.pyplot as plt

from attraction import Attraction

class Bundle:
    
    # This percentage is a conservative value for the amount of people opting for bundles over 
    PERCENTAGE_OF_PEOPLE_BUYING_BUNDLE = 0.3
    PERCENTAGE_NON_PEAK_POPULARITY_MULTIPLIER = 1
    PERCENTAGE_PEAK_POPULARITY_MULTIPLIER = 2
    PROFIT_MARGIN = 0.8
    
    def __init__(self, list_of_attractions):
        # List of Attractions
        self.list_of_attractions = list_of_attractions
        self.scaled_popularity = None
    
    def get_name(self):
        name = ""
        for attraction in self.list_of_attractions:
            name += attraction.name + "+"
        return name[:-1]
    
    """Basic functions for bundles that the rest of the code depends on
    """
    
    # Bundle price upper limit
    def get_max_possible_price(self):
        max_price = 0
        for attraction in self.list_of_attractions:
            max_price += attraction.cost
        return max_price

    # Bundle price lower limit based on profit margin
    def get_min_possible_price(self):
        return self.get_max_possible_price() * Bundle.PROFIT_MARGIN
    
    # Get average popularity of attractions and turn it into a fraction of range [0, 1]
    def get_scaled_popularity(self):
        if self.scaled_popularity == None:
            pop = 0
            for attraction in self.list_of_attractions:
                pop += attraction.get_popularity_score()
            scaled_popularity = pop / (10 * len(self.list_of_attractions))
            self.scaled_popularity = scaled_popularity
            return scaled_popularity
        else:
            return self.scaled_popularity
    
    # Checks if the bundle has at least one mflg attraction
    def has_at_least_one_mflg_attraction(self):
        for attractions in self.list_of_attractions:
            if not attractions.mflg:
                return False
        return True
    
##################################### Yearly functions #####################################
    
    """Get values such as customers per year, revenue per year
    """   
    
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
        popularity_percentage_after_dampen = popularity_percentage * Bundle.PERCENTAGE_NON_PEAK_POPULARITY_MULTIPLIER
        return (price) * (initial_customers * (percentage_change_in_price * popularity_percentage_after_dampen + 1))
    
##################################### Monthly peak functions #####################################

    """Get peak values such as customers per month, revenue per month and best price
    """
    
    def get_peak_customer_per_month(self):
        cust = 0
        
        for attraction in self.list_of_attractions:
            cust += attraction.get_peak_customer_per_month() * Bundle.PERCENTAGE_OF_PEOPLE_BUYING_BUNDLE
        return cust
    
    def get_peak_revenue_per_month(self, price):
        initial_customers = self.get_peak_customer_per_month()
        initial_price = self.get_max_possible_price()
        popularity_percentage = self.get_scaled_popularity()
        
        percentage_change_in_price = (initial_price - price) / initial_price
        popularity_percentage_after_multiplier = popularity_percentage * Bundle.PERCENTAGE_PEAK_POPULARITY_MULTIPLIER
        return (price) * (initial_customers * (percentage_change_in_price * popularity_percentage_after_multiplier + 1))
    
    def get_peak_best_price(self):
        func = lambda x: -self.get_peak_revenue_per_month(x)
        best_price = minimize_scalar(func, bounds = (self.get_min_possible_price(),self.get_max_possible_price()))
        return best_price.x
    
    def get_peak_best_revenue(self):
        return self.get_peak_revenue_per_month(self.get_peak_best_price())

    def plot_peak_price_revenue_graph(self):
        self.plot_price_revenue_graph(self.get_peak_revenue_per_month)
    
##################################### Monthly non peak functions #####################################
    
    """Get non peak values such as customers per month, revenue per month and best price
    """
    
    def get_non_peak_customer_per_month(self):
        cust = 0
        
        for attraction in self.list_of_attractions:
            cust += attraction.get_non_peak_customer_per_month() * Bundle.PERCENTAGE_OF_PEOPLE_BUYING_BUNDLE
        return cust
    
    def get_non_peak_revenue_per_month(self, price):
        initial_customers = self.get_non_peak_customer_per_month()
        initial_price = self.get_max_possible_price()
        popularity_percentage = self.get_scaled_popularity()
        
        percentage_change_in_price = (initial_price - price) / initial_price
        popularity_percentage_after_multiplier = popularity_percentage * Bundle.PERCENTAGE_NON_PEAK_POPULARITY_MULTIPLIER
        return (price) * (initial_customers * (percentage_change_in_price * popularity_percentage_after_multiplier + 1))

    def get_non_peak_best_price(self):
        func = lambda x: -self.get_non_peak_revenue_per_month(x)
        best_price = minimize_scalar(func, bounds = (self.get_min_possible_price(),self.get_max_possible_price()))
        return best_price.x
    
    def get_non_peak_best_revenue(self):
        return self.get_non_peak_revenue_per_month(self.get_non_peak_best_price())
    
    def plot_non_peak_price_revenue_graph(self):
        self.plot_price_revenue_graph(self.get_non_peak_revenue_per_month)

##################################### Graph #####################################

    def plot_price_revenue_graph(self, function):
        """ Creates a graph for the visualization of revenue against price
        """
        x = np.linspace(0, self.get_max_possible_price(), 500)
        
        y = function(x)
        plt.plot(x, y)
        plt.xlabel('Price')
        plt.ylabel('Revenue')
        plt.title('Function Graph: Revenue vs price')
        plt.suptitle(self.get_name())
        plt.axvline(x=self.get_min_possible_price(), color='r', linestyle='--', label='Min price')
        plt.text(self.get_min_possible_price()-0.5, self.get_min_possible_price() + 0.5, f'{round(self.get_min_possible_price(), 2)}', color='black', fontsize=10)
        plt.axvline(x=self.get_max_possible_price(), color='r', linestyle='--', label='Max price')
        plt.text(self.get_max_possible_price()-0.5, self.get_max_possible_price() + 0.5, f'{round(self.get_max_possible_price(), 2)}', color='black', fontsize=10)
        plt.grid(True)
        plt.show()

##################################### Bundle helper functions #####################################

                                        #### Peak ####
    """ These functions are helper or inner functions to send peak bundle information to the front end
    """
    def get_peak_attraction_revenue_after_bundle(self, attraction: Attraction):
        return attraction.get_peak_revenue_per_month() * (1 - Bundle.PERCENTAGE_OF_PEOPLE_BUYING_BUNDLE)
    
    def get_peak_bundle_revenue_split(self, attraction: Attraction):
        return self.get_peak_best_revenue() * (attraction.cost / self.get_max_possible_price())
    
    ## To find the overall revenue of attraction after bundling and single
    def get_peak_attraction_revenue_after_bundle_and_split(self, attraction: Attraction):
        return self.get_peak_attraction_revenue_after_bundle(attraction) + self.get_peak_bundle_revenue_split(attraction)
       
    def return_peak_bundled_single_attraction_revenue_in_json(self, attraction : Attraction):
        json = {
            "name" : attraction.name,
            "revenue": self.get_peak_attraction_revenue_after_bundle(attraction),
            "mflg" : attraction.mflg
        }
        return json

    def return_peak_single_attraction_revenue_in_json(self, attraction : Attraction):
        json = {
            "name" : attraction.name,
            "revenue": attraction.get_peak_revenue_per_month(),
            "mflg" : attraction.mflg
        }
        return json
    
    def return_peak_bundled_attraction_revenue_after_split(self, attraction : Attraction):
        json = {
            "name" : attraction.name,
            "revenue": self.get_peak_attraction_revenue_after_bundle_and_split(attraction),
            "mflg" : attraction.mflg
        }
        return json
    
                                        #### Non Peak ####
    """These functions are helper or inner functions to send non-peak bundle information to the front end
    """
    def get_non_peak_bundle_revenue_split(self, attraction: Attraction):
        return self.get_non_peak_best_revenue() * (attraction.cost / self.get_max_possible_price())

    def get_non_peak_attraction_revenue_after_bundle(self, attraction: Attraction):
        return attraction.get_non_peak_revenue_per_month() * (1 - Bundle.PERCENTAGE_OF_PEOPLE_BUYING_BUNDLE)

    def get_non_peak_attraction_revenue_after_bundle_and_split(self, attraction: Attraction):
        return self.get_non_peak_attraction_revenue_after_bundle(attraction) + self.get_non_peak_bundle_revenue_split(attraction)

    def return_non_peak_bundled_single_attraction_revenue_in_json(self, attraction : Attraction):
        json = {
            "name" : attraction.name,
            "revenue": self.get_non_peak_attraction_revenue_after_bundle(attraction),
            "mflg" : attraction.mflg
        }
        return json
    
    def return_non_peak_single_attraction_revenue_in_json(self, attraction : Attraction):
        json = {
            "name" : attraction.name,
            "revenue": attraction.get_non_peak_revenue_per_month(),
            "mflg" : attraction.mflg
        }
        return json
    
    def return_non_peak_bundled_attraction_revenue_after_split(self, attraction : Attraction):
        json = {
            "name" : attraction.name,
            "revenue": self.get_non_peak_attraction_revenue_after_bundle_and_split(attraction),
            "mflg" : attraction.mflg
        }
        return json


##################################### Bundle analysis #####################################

                                        #### Peak ####

    """These information will be sent to the front end
    """
    def return_peak_bundle_overall_revenue_info(self):
        json = {}
        
        ## Revenue for singular attraction after bundle
        for attraction in self.list_of_attractions:
            name = f"bundled_single_{attraction.name}"
            json[name] = self.return_peak_bundled_single_attraction_revenue_in_json(attraction)
        
        json[self.get_name()] = self.return_peak_bundle_with_revenue()
        
        for attraction in self.list_of_attractions:
            name = f"single_{attraction.name}"
            json[name] = self.return_peak_single_attraction_revenue_in_json(attraction)
        return json
    
    """Finds best price of bundle along with the revenue
    """
    def return_peak_bundle_with_revenue(self):
        json = {
            "name" : self.get_name(),
            "price" : self.get_peak_best_price(),
            "revenue": self.get_peak_best_revenue()
        }
        return json
    
    """Finds the revenue split of the two attractions after bundling. (Currently based on ticket price)
    """
    def return_peak_revenue_split(self):
        json = {}
        
        for attraction in self.list_of_attractions:
            name = f"bundled_single_{attraction.name}"
            json[name] = self.return_peak_bundled_attraction_revenue_after_split(attraction)
        
        for attraction in self.list_of_attractions:
            name = f"single_{attraction.name}"
            json[name] = self.return_peak_single_attraction_revenue_in_json(attraction)
        
        return json
    
                                        #### Non Peak ####
    """Repeated from peak bundles
    """
    
    def return_non_peak_bundle_overall_revenue_info(self):
        json = {}
        
        ## Revenue for singular attraction after bundle
        for attraction in self.list_of_attractions:
            name = f"bundled_single_{attraction.name}"
            json[name] = self.return_non_peak_bundled_single_attraction_revenue_in_json(attraction)
        
        json[self.get_name()] = self.return_non_peak_bundle_with_revenue()
        
        for attraction in self.list_of_attractions:
            name = f"single_{attraction.name}"
            json[name] = self.return_non_peak_single_attraction_revenue_in_json(attraction)
        return json   
    

    def return_non_peak_bundle_with_revenue(self):
        json = {
            "name" : self.get_name(),
            "price" : self.get_non_peak_best_price(),
            "revenue": self.get_non_peak_best_revenue()
        }
        return json
    
    def return_non_peak_revenue_split(self):
        json = {}
        
        for attraction in self.list_of_attractions:
            name = f"bundled_single_{attraction.name}"
            json[name] = self.return_non_peak_bundled_attraction_revenue_after_split(attraction)
        
        for attraction in self.list_of_attractions:
            name = f"single_{attraction.name}"
            json[name] = self.return_non_peak_single_attraction_revenue_in_json(attraction)
        
        return json 