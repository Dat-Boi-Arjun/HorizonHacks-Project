import pandas as pd

def form_groups(data):
  df = pd.DataFrame(data, columns = ['Name', 'location', 'pref'])
  groups = df.groupby(['location','pref']).groups
  grouped_df = pd.DataFrame(columns = ['Group', 'People'])

  #Finding the people in a particular group of the GroupBy object and
  #adding it to the dataframe
  index = 0
  for i in groups.keys():
    people = [data[j][0] for j in groups[i]]
    grouped_df.loc[index, 'People'] = people
    grouped_df.loc[index, 'Group'] = i
    index += 1

  return grouped_df.to_dict()






