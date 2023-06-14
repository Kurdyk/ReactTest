from functools import wraps
from flask import request, jsonify
import jwt
import fill_data
import json
from statistics import mean

import fakeBackend.authServer.utils as util

# User related
user_file_path = "../shared/users.txt"

def find_user_from_mail(mail:str) -> util.User:
    user_file = open(user_file_path, "r")
    for line in user_file:
        current_user = util.parse_user(line)
        if current_user.mail == mail:
            return current_user
    return

def json_all_users() -> str:
    result = []
    user_file = open(user_file_path, "r")
    for line in user_file:
        current_user = util.parse_user(line)
        result.append(current_user.to_json())
    return result 


# Token related
def token_required(f):

    def read_secret():
        secret_file = open("../shared/secret.txt", "r")
        secret = secret_file.readline().strip("\n")
        secret_file.close()
        return secret

    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'token' in request.headers:
            token = request.headers['token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            print(token)
            data = jwt.decode(token, read_secret(), algorithms=["HS256"])
            print(data)
            current_user = find_user_from_mail(data["mail"])

        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users context to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated

# Road related
class Road:
    def __init__(self, id:int, street:str, sensorList:list, postalCode:int, city:str) -> None:
        self.id = id
        self.street = street
        self.sensorList = sensorList
        self.postalCode = postalCode
        self.city = city

    def __str__(self) -> str:
        return "{" + f""""roadId":{self.id}, "street":"{self.street}", "sensorsIdList":{self.sensorList}, "postalCode":{self.postalCode}, "city":"{self.city}" """ + "}"
# Sensor related
class Sensor:
    def __init__(self, id:int, wear:int) -> None:
        self.id = id,
        self.wear = wear

    def __str__(self) -> str:
        return "{" + f""""sensorId":{self.id}, "currentWear":{self.wear}""" + "}"
    
def read_file(path:str):
    result = list()
    file = open(path, "r")
    for line in file:
        result.append(line.strip("\n"))
    file.close()
    return result

# usage/wear
def read_sensor_info(sensor_id:int, data_type:str, scale:str):
    
    def find_sensor(sensor_id:int, data_type:str):
        if data_type == "Wear":
            file = open(fill_data.wears_path, "r")
        else:
            file = open(fill_data.usages_path, "r")
        for line in file:
            current_data = json.loads(line)
            if current_data["sensorId"] == sensor_id:
                file.close()
                return current_data
        raise ValueError("Sensor not found")

    def week_aggregation():
        weeks = list()
        i = 0
        while True:
            current = data[i*7:(i+1)*7:]
            if len(current) != 7: 
                if len(current) > 0:
                    weeks.append(current)
                break
            weeks.append(current)
            i += 1
        return weeks
    
    def month_aggregation():
        months = list()
        i = 0
        current_month = 0
        while True:
            if i < len(data):
                if current_month in {0, 2, 4, 6, 7, 9, 11}: # 31 days months
                    current = data[i:i+31:]
                    i += 31
                elif current_month == 1: # febuary
                    current = data[i:i + 28:]
                    i += 28
                else: # the rest
                    current = data[i:i+30]
                    i += 30
                months.append(current)
                current_month = (current_month + 1) % 12
            else:
                if len(data[i::]) > 0:
                    months.append(data[i::])
                break
        return months
        
    def year_aggregation():
        years = list()
        i = 0
        while True:
            current = data[i*365:(i+1)*365:]
            if len(current) != 365:
                if len(current) > 0: 
                    years.append(current)
                break
            years.append(current)
            i += 1
        return years
    
    data = find_sensor(sensor_id, data_type)["usagesList" if data_type == "Usage" else "wearsList"]

    if scale == "Jour": # we'll return the last week
        return data[-7:]
    elif scale == "Semaine": # we'll return the three last weeks and the prediction for this one
        return [sum(week) for week in week_aggregation()[-3::]] if data_type == "Usage" else [mean(week) for week in week_aggregation()[-3::]]
    elif scale == "Mois": # we'll return the 11 last months and the prediction for this one
        return [sum(month) for month in month_aggregation()[-11::]] if data_type == "Usage" else [mean(month) for month in month_aggregation()[-11::]]
    elif scale == "Années": # we'll return every years and the prediction for this one
        return [sum(year) for year in year_aggregation()[::]] if data_type == "Usage" else [mean(year) for year in year_aggregation()[::]]
        
