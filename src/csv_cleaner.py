import os
import pandas as pd


old_name = ["Dominican Republic", "Congo, Democratic Republic of the", "Central African Republic", "Cote d'Ivoire", "Western Sahara", "Congo, Republic of the", "Equatorial Guinea", "South Sudan", "Laos", "Czech Republic", "Bosnia and Herzegovina"]
new_name = ["Dominican Rep.", "Dem. Rep. Congo", "Central African Rep.", "Côte d'Ivoire", "W. Sahara", "Congo", "Eq. Guinea", "S. Sudan", "Lao PDR", "Czech Rep.", "Bosnia and Herz."]
for file in os.listdir("."):
    if file.endswith(".csv"):
        csv = pd.read_csv(file)
        for i in range(len(old_name)):
            for index, row in csv.iterrows():
                if row['Name'] == old_name[i]:
                    csv.at[index, 'Name'] = new_name[i]
        csv.to_csv(file, index=False)