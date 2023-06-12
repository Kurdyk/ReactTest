from random import randint, sample, uniform, random

sensor_path = "./sensors.txt"
road_path = "./roads.txt"

streets = ["Route de Lyon", "Ruelle Sainte Barbe", "La place de la Fontaine", "Avenue de la Gare"]
postalCodes = [75008, 46092, 94023, 21760]
cities = ["Reims", "Paris", "Lille", "Bordeaux"]

# Shared 
def generate_random_coordinates(baseCoord:list, max_delta:float, n_wanted:int):
    result = list()
    for _ in range(n_wanted):
        signe_x, signe_y = 1 if random() > 0.5 else -1, 1 if random() > 0.5 else -1
        delta_x, delta_y = uniform(0, max_delta), uniform(0, max_delta)
        result.append([baseCoord[0] + signe_x * delta_x, baseCoord[1] + signe_y * delta_y])
    return result

# Road related
class Road:
    def __init__(self, id:int, street:str, sensorList:list, postalCode:int, city:str, startPosition:list, endPosition:list) -> None:
        self.id = id
        self.street = street
        self.sensorList = sensorList
        self.postalCode = postalCode
        self.city = city
        self.startPosition = startPosition
        self.endPosition = endPosition

    def __str__(self) -> str:
        return "{" + f""""roadId":{self.id}, "street":"{self.street}", "sensorsIdList":{self.sensorList}, "postalCode":{self.postalCode}, "city":"{self.city}", "startPosition":{self.startPosition}, "endPosition":{self.endPosition}""" + "}"

# Sensor related
class Sensor:
    def __init__(self, id:int, wear:int, position:list) -> None:
        self.id = id
        self.wear = wear
        self.position = position

    def __str__(self) -> str:
        return "{" + f""""sensorId":{self.id}, "currentWear":{self.wear}, "position":{self.position}""" + "}"

def fill_roads(n:int):
    free_id = set(range(2*n))
    coordinates = generate_random_coordinates([48.866, 2.333], 0.01, 2 * n)
    road_file = open(road_path, "a")
    for i in range(n):
        ids = sample(list(free_id), 2)
        free_id = free_id - set(ids)
        current_road = Road(id=i, street=sample(streets, 1)[0],
                            sensorList=ids, postalCode=sample(postalCodes, 1)[0],
                            city=sample(cities, 1)[0],
                            startPosition=coordinates[i],
                            endPosition=coordinates[i + 1])
        road_file.write(f"{current_road}\n")
    road_file.close()

def fill_sensors(n:int):
    coordinates = generate_random_coordinates([48.866, 2.333], 0.01, n)
    sensors_file = open(sensor_path, "a")
    for i in range(n):
        current_sensor = Sensor(id=i, wear=randint(10, 100), position=coordinates[i])
        sensors_file.write(f"{current_sensor}\n")
    sensors_file.close()


def main():
    n = 20
    fill_roads(n)
    fill_sensors(2*n)

if __name__ == "__main__":
    main()