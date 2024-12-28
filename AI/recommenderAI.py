from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

# Khởi tạo Flask app
app = Flask(__name__)
CORS(app)  # Kích hoạt CORS

# Cấu hình MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Quan@762003'  # Thay bằng mật khẩu MySQL của bạn
app.config['MYSQL_DB'] = 'E_Shopping_database'   # Thay bằng tên database của bạn

# Khởi tạo MySQL
mysql = MySQL(app)

# Route để lấy danh sách từ khóa
@app.route('/keywords', methods=['GET'])
def get_keywords():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT keyword FROM suggestion_table")
        rows = cursor.fetchall()

        # Chuyển dữ liệu thành danh sách
        keywords = [row[0] for row in rows]
        return jsonify(keywords=keywords)
    except Exception as e:
        return jsonify(error=str(e)), 500

# Route gợi ý từ khóa
@app.route('/suggest', methods=['POST'])
def suggest_keywords():
    try:
        # Lấy danh sách từ khóa từ MySQL
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT keyword FROM suggestion_table")
        rows = cursor.fetchall()
        keywords = [row[0] for row in rows]

        # Kiểm tra danh sách từ khóa có rỗng không
        if not keywords:
            return jsonify(error="No keywords found in database."), 404

        # Vector hóa dữ liệu
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(keywords)

        # Xử lý input từ người dùng
        data = request.json
        user_input = data.get('input', '').strip()
        if not user_input:
            return jsonify(error="Input cannot be empty."), 400

        # Tính độ tương đồng
        input_vector = vectorizer.transform([user_input])
        similarity_scores = cosine_similarity(input_vector, tfidf_matrix).flatten()
        top_indices = similarity_scores.argsort()[-3:][::-1]
        suggestions = [keywords[i] for i in top_indices]

        return jsonify(suggestions=suggestions)
    except Exception as e:
        return jsonify(error=str(e)), 500

# Khởi chạy ứng dụng
if __name__ == '__main__':
    app.run(debug=True)
