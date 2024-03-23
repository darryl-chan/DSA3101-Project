from selenium import webdriver
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import time

def scrape(url, time_to_scrape, name):

    driver = webdriver.Chrome()
    
    driver.get(url)
    
    time.sleep(3)

    driver.find_element('xpath', '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[7]/div[2]/button').click()
    time.sleep(1)
    driver.find_element('xpath', '//*[@id="action-menu"]/div[2]').click()

    scrollable_div = driver.find_element('xpath', '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]')


    scrollable_div
    period = timedelta(minutes=time_to_scrape)
    next_time = datetime.now() + period

    while datetime.now() < next_time:
            driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', 
                    scrollable_div)
            


    response = BeautifulSoup(driver.page_source, 'html.parser')
    reviews = response.find_all('span', class_='kvMYJc')

    driver.quit()
    reviews = response.find_all('div', class_='DU9Pgb')
    list_of_time = []
    list_of_score = []
    for r in reviews:

        review_time = r.find('span', class_ = 'rsqaWe').getText()
        score = r.find('span', class_ = 'kvMYJc')['aria-label'][0]
        
        list_of_time.append(review_time)
        list_of_score.append(score)
        
    df = pd.DataFrame(
        {'Time' : list_of_time,
        'Score' : list_of_score}
    )
    
    if (df['Time'] == '4 years ago').any():
        first_index = df[df['Time'] == '4 years ago'].index[0]
        saved_data_frame = df.iloc[:first_index]
    else:
        saved_data_frame = df.copy()
        
    saved_data_frame.to_csv(f'../data/{name}.csv')