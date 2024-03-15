#ตัว แลกเปลี่ยนข้อมูล

import pymongo
import mysql.connector
#ตัวบันทึก

# เชื่อมต่อ MongoDB
mongo_client = pymongo.MongoClient("mongodb+srv://E-commerce:ecommerce123@cluster0.ny3jjeo.mongodb.net")
mongo_db = mongo_client.test
mongo_collection = mongo_db.products

# เชื่อมต่อ MySQL
mysql_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="shop"
)
mysql_cursor = mysql_connection.cursor()

# ดึงข้อมูลสินค้าจาก MongoDB
products = mongo_collection.find()

# เขียนข้อมูลลงใน MySQL
for product in products:
    slug = product.get("slug", "")  # ใช้ .get() เพื่อไม่ให้เกิด KeyError กรณีที่ไม่มี 'slug'
    title = product["title"]
    desc = product["desc"]
    image = product["image"]

    sql = "INSERT INTO products (title, slug, `desc`, image) VALUES (%s, %s, %s, %s)"
    values = (title, slug, desc, image)
    mysql_cursor.execute(sql, values)

# ยืนยันการเขียนข้อมูลลงใน MySQL
mysql_connection.commit()

# ปิดการเชื่อมต่อ
mysql_cursor.close()
mysql_connection.close()

print("Data inserted into MySQL from MongoDB.")
