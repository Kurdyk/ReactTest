from functools import wraps
from flask import request, jsonify
import jwt

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
    