from random import randint, sample

sensor_path = "./sensors.txt"
road_path = "./roads.txt"

streets = ["Route de Lyon", "Ruelle Sainte Barbe", "La place de la Fontaine", "Avenue de la Gare"]
postalCodes = [75008, 46092, 94023, 21760]
cities = ["Reims", "Paris", "Lille", "Bordeaux"]

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
        self.id = id
        self.wear = wear

    def __str__(self) -> str:
        return "{" + f""""sensorId":{self.id}, "currentWear":{self.wear}""" + "}"

def fill_roads(n:int):
    road_file = open(road_path, "a")
    free_id = set(range(2*n))
    for i in range(n):
        ids = sample(list(free_id), 2)
        free_id = free_id - set(ids)
        current_road = Road(id=i, street=sample(streets, 1)[0],
                            sensorList=ids, postalCode=sample(postalCodes, 1)[0],
                            city=sample(cities, 1)[0])
        road_file.write(f"{current_road}\n")
    road_file.close()

def fill_sensors(n:int):
    sensors_file = open(sensor_path, "a")
    for i in range(n):
        current_sensor = Sensor(id=i, wear=randint(10, 100))
        sensors_file.write(f"{current_sensor}\n")
    sensors_file.close()


def main():
    n = 20
    fill_roads(n)
    fill_sensors(2*n)

if __name__ == "__main__":
    main()