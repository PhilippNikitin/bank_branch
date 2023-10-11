from django.db import models
import random

# Create your models here.

def shedule():  # функция для получения расписания работы банка в JSON формате
    work_schedule = {
    "Monday": {
        "start_time": "09:00",
        "end_time": "18:00"
    },
    "Tuesday": {
        "start_time": "09:00",
        "end_time": "18:00"
    },
    "Wednesday": {
        "start_time": "09:00",
        "end_time": "18:00"
    },
    "Thursday": {
        "start_time": "09:00",
        "end_time": "18:00"
    },
    "Friday": {
        "start_time": "09:00",
        "end_time": "18:00"
    },
    "Saturday": {
        "start_time": "09:00",
        "end_time": "15:00"
    },
    "Sunday": {
        "start_time": "Closed",
        "end_time": "Closed"
    }
}
    return work_schedule


def mock_services():  # функция для получения набора услуг, оказываемых в банке, и соответсвующего количества окон
    services = {
        "card": {
            "services": random.choices([True, False], weights=[90, 10]),  # вероятность, что услуга будет оказываться, 90 %
            "employees": 6
        },
        "loan": {
            "services": random.choices([True, False], weights=[80, 20]),  # вероятность, что услуга будет оказываться, 80 %
            "employees": 0
        },
        "mortgage": {
            "services": random.choices([True, False], weights=[80, 20]),  # вероятность, что услуга будет оказываться, 80 %
            "employees": 3
        },
        "credit": {
            "services": random.choices([True, False], weights=[80, 20]),  # вероятность, что услуга будет оказываться, 80 %
            "employees": 2
        },
        "auto_loan": {
            "services": random.choices([True, False], weights=[80, 20]),  # вероятность, что услуга будет оказываться, 80 %
            "employees": 0
        },
        "deposit_and_accounts": {
            "services": random.choices([True, False], weights=[90, 10]),  # вероятность, что услуга будет оказываться, 90 %
            "employees": 6
        },
        "investment": {
            "services": random.choices([True, False]),  # вероятность, что услуга будет оказываться, 50 %
            "employees": 0
        },
        "online": {
            "services": random.choices([True, False], weights=[70, 30]),  # вероятность, что услуга будет оказываться, 70 %
            "employees": 0
        },
        "biometric_data_collection": {
            "services": random.choices([True, False], weights=[30, 70]),  # вероятность, что услуга будет оказываться, 30 %
            "employees": 0
        },
        "cash_deposit_for_legal_entities": {
            "services": random.choices([True, False], weights=[90, 10]),  # вероятность, что услуга будет оказываться, 90 %
            "employees": 0
        },
        "agent_point_for_shares_placement_and_redemption": {
            "services": random.choices([True, False], weights=[30, 70]),  # вероятность, что услуга будет оказываться, 30 %
            "employees": 0
        }
    }

    services["card"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["loan"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["mortgage"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["credit"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["auto_loan"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["deposit_and_accounts"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["investment"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["online"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["biometric_data_collection"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["cash_deposit_for_legal_entities"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0
    services["agent_point_for_shares_placement_and_redemption"]["employees"] = random.randint(1, 6) if services["card"]["services"] else 0

    return services

def queue():
    queue = {
        "card": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 90 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "loan": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 80 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "mortgage": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 80 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "credit": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 80 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "auto_loan": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 80 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "deposit_and_accounts": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 90 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "investment": {
            "peoples": 0,  # вероятность, что услуга будет оказываться, 50 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "online": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 70 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "biometric_data_collection": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 30 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "cash_deposit_for_legal_entities": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 90 %
            "minutes": random.choices([5, 10, 15, 20])
        },
        "agent_point_for_shares_placement_and_redemption": {
            "peoples": 0,
            # вероятность, что услуга будет оказываться, 30 %
            "minutes": random.choices([5, 10, 15, 20])
        }
    }
    return queue



class Bank(models.Model):
    name = models.CharField(max_length=256)
    address = models.TextField()
    latitude = models.CharField(max_length=25)
    longitude = models.CharField(max_length=25)
    work_schedule = models.JSONField(default=shedule)
    services = models.JSONField(default=mock_services)
    queue = models.JSONField(default=queue)

    def __str__(self):
        return f"Bank ({self.id})"