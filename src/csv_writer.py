import csv

data = [
    ['Name', 'CSV name', 'Under MFLG?', 'Price'],
    ['Singapore cable car', 'cablecar.csv', 'Yes', 33],
    ['Sky Helix Sentosa', 'sky_helix_sentosa.csv', 'Yes', 20],
    ['Wings of Time', 'wing_of_time.csv', 'Yes', 19],
    ['Sea Aquarium', 'sea_aquarium.csv', 'No', 33],
    ['Adventure Cove', 'adv_cove.csv', 'No', 32],
    ['Singapore Flyer', 'singapore_flyer.csv', 'No', 40],
    ['Art Science Museum', 'art_science_museum.csv', 'No', 32],
    ['IFly', 'ifly.csv', 'No', 109]
]


file_path = '../data/attractions.csv'


with open(file_path, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)

print("CSV file created successfully.")
