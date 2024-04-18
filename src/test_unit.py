from controller import *
from bundle import *

#We will test controller functions to see if they work. These functions are used by the frontend

def test_controller():
    lst_of_bundles = list_of_bundles()
    bundle_1 : Bundle = lst_of_bundles[0]

    bundle_1.return_non_peak_bundle_overall_revenue_info()
    bundle_1.return_peak_bundle_overall_revenue_info()

    bundle_1.return_non_peak_revenue_split()
    bundle_1.return_peak_revenue_split()

    get_popularity()

    get_bundle_with_highest_revenue()

    get_best_bundle_revenue_split()

    get_bundles_with_at_least_one_mflg()

    get_bundle_2()
    
    print("Controller has no problems")

test_controller()