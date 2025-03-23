import os
import pandas as pd

# Specify the directory containing the .csv files
directory = 'C:/Users/Rob/OneDrive/Rob/PhD/OSF files'
search_string = '66b3681369c716ced82bb8ad'

# List to store the results
results = []

# Loop through all files in the directory
for filename in os.listdir(directory):
    if filename.endswith('.csv'):
        print(f'Checking file: {filename}')  # Debug print
        file_path = os.path.join(directory, filename)
        # Read the CSV file
        try:
            df = pd.read_csv(file_path)
            print(f'Reading {filename}...')  # Debug print
            # Check if the search string is in the dataframe
            if df.apply(lambda row: row.astype(str).str.contains(search_string).any(), axis=1).any():
                results.append(f'Found "{search_string}" in {filename}')
                print(f'Found "{search_string}" in {filename}')  # Immediate feedback
        except Exception as e:
            results.append(f'Could not read {filename}: {e}')
            print(f'Error reading {filename}: {e}')  # Debug print

# Print all results after the search is complete
if results:
    print('Search Results:')
    for result in results:
        print(result)
else:
    print('No results found.')


#--------------------------------------------------------

import os

# Set the working directory
os.chdir('C:/Users/Rob/OneDrive/Rob/PhD/OSF files')

# Confirm the new working directory
print(f'New working directory: {os.getcwd()}')

# List all files in the new directory to verify
print('Files in the new directory:')
print(os.listdir('.'))

# Specify the name of the CSV file
csv_file = 'j3u36ws17d.csv'  # Replace with your actual CSV file name

# Read the CSV file
try:
    df = pd.read_csv(csv_file)
    
    # Access the value in cell Z12 using the index
    value_z12 = df.iloc[11, 25]  # 11 for the 12th row, 25 for the 26th column (Z)
    print(f'The value in cell Z12 is: {value_z12}')

    # Check if the value in cell Z12 is over 700,000
    if value_z12 > 700000:
        print(f'The value in cell Z12 is over 700,000: {value_z12}')
    else:
        print('The value in cell Z12 is not over 700,000.')

except Exception as e:
    print(f'Could not read {csv_file}: {e}')




Intervention duration insufficient for data capture. Needed to play the game for at least 15 minutes.
