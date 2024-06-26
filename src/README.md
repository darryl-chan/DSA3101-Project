# Backend documentation

## Installation

1. Docker
Ensure Docker :whale: is installed and running on local device
2. Run the following command:
```
docker build -f Dockerfile.backend -t backend .
docker run -d -p 5000:5000 backend
```
Our backend is hosted on port `5000`

## Libraries used

`pandas`
`numpy`
`flask`
`flask_cors`
`scipy`
`matplotlib`

## File description

### main.py

Application Programming Interface (API) for the front end to the back end connection

### controller.py

Python script that is called from main. It helps to create Attraction and Bundle objects for calculations to be done. It also connects to the data.

### bundle.py

Contains the Bundle class where we get information of bundling several attractions. 

e.g. We can get customers for peak seasons in a month.

`get_peak_customer_per_month()`

### attraction.py

Contains the Attraction class where we get information from google scraped data.

e.g. We can find the popularity of the bundle like this

`get_popularity_score()`
