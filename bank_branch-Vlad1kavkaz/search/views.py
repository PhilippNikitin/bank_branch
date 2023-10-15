from django.shortcuts import render
from .models import Bank
import re
import unicodedata

# Create your views here.

def populate_database(request):
    file_path = 'search/база данных.csv'
    with open(file_path, 'r', encoding='utf-8') as csvfile:
        for row in csvfile:
            row = unicodedata.normalize("NFKD", row)
            row = row.strip()
            pattern = r'\"(.*?)\"'
            match = re.findall(pattern, row)
            if match:
                new_address = match[0]
            string = re.sub(pattern, '', row)
            string_list = string.split(',')
            Bank.objects.create(
                name=string_list[1],
                address=new_address,
                latitude=string_list[-2],
                longitude=string_list[-1]
            )

    return render(request, 'search/a.html')

def my_count(request):
    banks = Bank.objects.all()
    counter = 0
    for _ in banks:
        counter += 1
    print(counter)

    return render(request, 'search/b.html')