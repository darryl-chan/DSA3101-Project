# DSA3101-Project William & George

## User Guide
1. Clone the repository into local device, if Git is installed run:
   ```
   git clone https://github.com/darryl-chan/DSA3101-Project.git
   ```
2. Install Docker Desktop into local device and run the application, if Docker not installed, you may follow the instructions provided in [Docker Desktop](https://www.docker.com/get-started/)
   
3. Ensure Docker is running in the background and navigate to the repository **DSA3101-Project**
  
4. Run the following command with Docker :whale: to start our application:
   ```
   docker-compose up -d --build
   ```
5. Access the web application at `localhost:8081`

6. To stop the application:
   ```
   docker compose down
   ```

## Webscraping
1. To run our web scraping function, ensure all Docker containers are running, use the following command to identify the name of the webscrape container:
   ```
   docker ps
   ```
2. After identifying the container, run the following command:
   ```
   docker exec -it {name_of_webscrape_container_shown} python scrape_wrapper.py
   ```
3. You will be prompted to provide necessary inputs (More information about the inputs below)
   ```
   "What is the google review url:"
   "How many minutes do you want to scrape:"
   "What is the name of the attraction:"
   "How often do you want to check please input positive number:"
   "Is this attraction under MFLG (Yes/No):"
   "What is the ticket cost:"
   ```
   Once the scrapping is complete you will see a `All Done!`
   
5. Before stopping all the containers, run the following command:
   ```
   docker cp dsa3101-project-data-container-1:/app ./data
   ```
   This is to copy all the data files back into the local directory so that all the data files are updated to be used in another device.

### Steps on copying google review url with example
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for the attraction [name](https://www.google.com/maps/place/Singapore+Zoo/@1.4043485,103.7904481,17z/data=!3m1!4b1!4m6!3m5!1s0x31da13d9102adcaf:0xb414fac8a43b1b91!8m2!3d1.4043485!4d103.793023!16zL20vMDIxMW16?entry=ttu)
3. Click on the `Reviews` tab and copy the url [link](https://www.google.com/maps/place/Singapore+Zoo/@1.4043485,103.7904481,17z/data=!4m8!3m7!1s0x31da13d9102adcaf:0xb414fac8a43b1b91!8m2!3d1.4043485!4d103.793023!9m1!1b1!16zL20vMDIxMW16?entry=ttu)
4. Paste the url in `"What is the google review url:"`

### Note:
   * For the `How often do you want to check please input positive number:`, it refers to the frequency you want to check whether the scraping is still running and if the scrape has reached 3 years ago, for e.g, if you input 2, it means the code will produce a output `check` every 2 minutes to ensure that the scraping is still running.
   * For the `How many minutes do you want to scrape:`, it refers to how many minutes do you want the scrape program to run. While a shorter duration scraped is likely to have incomplete data, the data will be extended to 3 years. However, shorter scrapes would lead to inaccurate google reviews.


