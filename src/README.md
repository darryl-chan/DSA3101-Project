# Backend documentation

## Installation

## File description

### main.py

Is the Application Programming Interface (API) for the front end to the backe end

### controller.py

Is the python script that is called from main. It helps to create Attraction and Bundle objects for calculations to be done

### bundle.py

Contains the Bundle class where we get information of bundling several attractions. 

e.g We can get customers for peak seasons in a month.

`get_peak_customer_per_month()`

### attraction.py

Contains the Attraction class where we get information from google scraped data.

e.g. We can find the popularity of the bundle like this

`get_popularity_score()`