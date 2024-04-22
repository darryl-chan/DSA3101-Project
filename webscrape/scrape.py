from selenium import webdriver
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import time
import scipy.stats as stats

def scrape(url, time_to_scrape, name, check_every_interval):

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
    next_interval_to_check = datetime.now() + timedelta(minutes=check_every_interval)

    while datetime.now() < next_time:
        driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', 
                scrollable_div)
        
        if datetime.now() > next_interval_to_check:
            print('check')
            response = BeautifulSoup(driver.page_source, 'html.parser')
            reviews = response.find_all('div', class_='DU9Pgb')
            to_quit = False
            for r in reviews:
                if r.find('span', class_ = 'rsqaWe').getText() == ('4 years ago'):
                    to_quit = True
                    break
            next_interval_to_check = datetime.now() + timedelta(minutes=check_every_interval)
            if to_quit == True:
                break


    response = BeautifulSoup(driver.page_source, 'html.parser')

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
    
    if (df['Time'] == '3 years ago').any():
        first_index = df[df['Time'] == '3 years ago'].index[0]
        saved_data_frame = df.iloc[:first_index]
    else:
        saved_data_frame = df.copy()
        
    saved_data_frame.to_csv(f'../data/{name}.csv')
    
def extend_review(csv_to_change):
    df = pd.read_csv(f'../data/{csv_to_change}.csv', index_col=0)
    np.random.seed(234)
    
    last_months_ago = df.iloc[-1]['Time'] if ("month" in df.iloc[-1]['Time']) else "11 months ago"
    first_index = df[df['Time'] == last_months_ago].index[0]
    saved_data_frame = df.iloc[:first_index]
    
    mean_review = np.mean(saved_data_frame['Score'])
    num_months = 1 if last_months_ago.split(" ")[0] == "a" else int(last_months_ago.split(" ")[0])
    mean_number_of_review_monthly = len(saved_data_frame) / num_months
    lst = stats.poisson.rvs(mean_number_of_review_monthly, size=12 - num_months + 1)
    total_review_month = mean_review * mean_number_of_review_monthly
    p = (total_review_month - mean_number_of_review_monthly) / (4 * mean_number_of_review_monthly)
    
    dic = {"Time": [], "Score" : []}
    offset = num_months + 1
    for i in range(offset, 12):
        index = i - offset
        num_samples = lst[index]
        lst_of_month = list(1 + stats.binom.rvs(4, p, size=num_samples))
        length_of_review = len(lst_of_month)
        string = [f"{i} months ago" for x in range(length_of_review)]
        dic['Time'].extend(string)
        dic['Score'].extend(lst_of_month)
    df_1 = pd.DataFrame(dic)
    new_df = pd.concat([saved_data_frame, df_1])
    
    dic = {"Time": [], "Score" : []}
    for i in range(1, 3):
        string_to_append = f"{i} years ago" if i == 2 else "a year ago"
        months = 12
        lst = stats.poisson.rvs(mean_number_of_review_monthly, size=months)
        
        for reviews in lst:
            lst_of_month = list(1 + stats.binom.rvs(4, p, size=reviews))
            length_of_review = len(lst_of_month)
            string = [string_to_append for x in range(length_of_review)]
            dic['Time'].extend(string)
            dic['Score'].extend(lst_of_month)

    full_df = pd.concat([new_df, pd.DataFrame(dic)])
    full_df.index = np.array([i for i in range(len(full_df))])
    full_df.to_csv(f'../data/{csv_to_change}.csv')
    
def get_user_input():
    url = input("What is the google review url:")
    time_to_scrape = float(input("How many minutes do you want to scrape:"))
    name = input("What is the name of the attraction:")
    check_every_interval = float(input("How often do you want to check please input positive number:"))
    scrape(url, time_to_scrape, name, check_every_interval)
    extend_review(name)