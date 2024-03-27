import csv
import random
import os

directory = '__test__'
os.makedirs(directory, exist_ok=True)

# Define the range for x and y coordinates
x_range = (-100, 100)
y_range = (-100, 100)

num_points_array = [10, 100, 1000, 10000, 100000]

for num_points in num_points_array:
    file_path = os.path.join(directory, f'random_{num_points}_points.csv')

    # Generate random points
    points = [(random.uniform(x_range[0], x_range[1]), random.uniform(y_range[0], y_range[1])) for _ in range(num_points)]

    # Write the points to a CSV file
    with open(file_path, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile,lineterminator='')
        for i, point in enumerate(points):
            if i < len(points) - 1:
                writer.writerow(point)
                csvfile.write("\n")
            else:
                writer.writerow(point)

    print(f'CSV file generated with {num_points} random points.')
