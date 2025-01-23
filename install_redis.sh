#!/bin/bash

# Check if the script is run as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run this script as root or use sudo"
    exit
fi

echo "Updating package lists..."
sudo apt update -y

echo "Installing Redis server..."
sudo apt install redis-server -y

echo "Configuring Redis for production..."
sudo sed -i 's/^# requirepass .*/requirepass your_redis_password/' /etc/redis/redis.conf
sudo sed -i 's/^supervised no/supervised systemd/' /etc/redis/redis.conf

echo "Restarting Redis service..."
sudo systemctl restart redis.service
sudo systemctl enable redis.service

echo "Redis installation completed successfully!"
echo "Make sure to replace 'your_redis_password' in the script with a strong password."

echo "Testing Redis installation..."
redis-cli -a your_redis_password ping

echo "Redis setup is complete."
