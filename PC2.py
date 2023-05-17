import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier

tabla=pd.read_csv('/content/sample_data/heart.csv')
tabla
df=tabla
df
df_dm=pd.get_dummies(df,columns=['Sex','ChestPainType','RestingECG','ExerciseAngina','ST_Slope'],drop_first="True")
df_dm
y=df_dm['HeartDisease']
X=df_dm.drop('HeartDisease',axis=1)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2,stratify=y)
