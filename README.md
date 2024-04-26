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
3. You will be prompted to provide necessary inputs
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

   Note:
   * for the `How often do you want to check please input positive number:`, it refers to the frequency you want to check whether the scraping is still running and if the scrape has reached 3 years ago, for eg, if you input 2, it means the code will produce a output `check` every 2 minutes to ensure you that the scraping is still running.

