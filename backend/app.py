from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import jwt
import datetime
import hashlib
import os
from fpdf import FPDF
import qrcode

app = Flask(__name__)

# ---------------------------------------------------------------------
# CONFIG
# ---------------------------------------------------------------------
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['SECRET_KEY'] = "your-secret-key-here"
CERT_FOLDER = "certificates"
os.makedirs(CERT_FOLDER, exist_ok=True)

# In-memory storage (use DB later)
users = {}

# ---------------------------------------------------------------------
# UTILITIES
# ---------------------------------------------------------------------
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token(user_id, user_type):
    return jwt.encode(
        {
            "user_id": user_id,
            "user_type": user_type,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        },
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

# FIXED USER LOOKUP
def get_user_by_id(user_id):
    for email, data in users.items():
        if data["id"] == user_id:
            return data, email
    return None, None


def auth_required():
    token = request.headers.get("Authorization")

    if not token:
        return None, jsonify({"error": "Authorization header missing"}), 401

    if token.startswith("Bearer "):
        token = token[7:]

    try:
        payload = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        user, user_email = get_user_by_id(payload["user_id"])

        if not user:
            return None, jsonify({"error": "User not found"}), 404

        return (user, user_email), None, None

    except jwt.ExpiredSignatureError:
        return None, jsonify({"error": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return None, jsonify({"error": "Invalid token"}), 401


# ---------------------------------------------------------------------
# AUTH ROUTES
# ---------------------------------------------------------------------
@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")
    user_type = data.get("user_type", "student")

    if not email or not password:
        return jsonify({"error": "Email & password required"}), 400

    if email in users:
        return jsonify({"error": "User already exists"}), 409

    user_id = str(len(users) + 1)

    users[email] = {
        "id": user_id,
        "email": email,
        "password": hash_password(password),
        "user_type": user_type,
        "name": "",
        "phone": "",
        "institution_type": "",
        "branch": "",
        "interests": [],
        "onboarded": False
    }

    token = generate_token(user_id, user_type)

    return jsonify({
        "success": True,
        "message": "Account created successfully",
        "user": {"id": user_id, "email": email, "user_type": user_type},
        "token": token
    }), 201


@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email & password required"}), 400

    user = users.get(email)
    if not user or user["password"] != hash_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = generate_token(user["id"], user["user_type"])

    return jsonify({
        "success": True,
        "message": "Login successful",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "user_type": user["user_type"]
        },
        "token": token
    }), 200


@app.route("/api/auth/verify", methods=["GET"])
def verify_token():
    result, err_json, code = auth_required()
    if err_json:
        return err_json, code

    user, _ = result

    return jsonify({
        "success": True,
        "user": {
            "id": user["id"],
            "email": user["email"],
            "user_type": user["user_type"],
            "onboarded": user.get("onboarded", False)
        }
    }), 200


# ---------------------------------------------------------------------
# ONBOARDING
# ---------------------------------------------------------------------
@app.route("/api/auth/onboard", methods=["POST"])
def onboard_user():
    result, err_json, code = auth_required()
    if err_json:
        return err_json, code

    user, user_email = result
    data = request.get_json()

    required = ["name", "phone", "institution_type"]
    for field in required:
        if not data.get(field):
            return jsonify({"error": f"{field} required"}), 400

    user["name"] = data["name"]
    user["phone"] = data["phone"]
    user["institution_type"] = data["institution_type"]
    user["branch"] = data.get("branch", "")
    user["interests"] = data.get("interests", [])
    user["onboarded"] = True

    return jsonify({
        "success": True,
        "message": "Profile updated",
        "user": user
    }), 200


# ---------------------------------------------------------------------
# CERTIFICATE GENERATOR
# ---------------------------------------------------------------------
@app.route("/api/certificate/generate", methods=["POST"])
def generate_certificate():
    result, err_json, code = auth_required()
    if err_json:
        return err_json, code

    user, _ = result
    data = request.get_json()

    course_name = data.get("course_name", "Unnamed Course")

    filename = f"certificate_{user['id']}_{course_name.replace(' ', '_')}.pdf"
    filepath = os.path.join(CERT_FOLDER, filename)

    # QR
    qr_msg = f"{user['name']} completed '{course_name}'"
    qr_path = os.path.join(CERT_FOLDER, f"qr_{user['id']}.png")

    qr = qrcode.make(qr_msg)
    qr.save(qr_path)

    # PDF
    pdf = FPDF("L", "mm", "A4")
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 28)
    pdf.cell(0, 20, "Certificate of Completion", ln=True, align="C")

    pdf.set_font("Helvetica", "", 18)
    pdf.ln(10)
    pdf.cell(0, 12, f"Presented To: {user['name']}", ln=True, align="C")

    pdf.ln(5)
    pdf.cell(0, 10, "For successfully completing", ln=True, align="C")

    pdf.set_font("Helvetica", "B", 20)
    pdf.cell(0, 12, course_name, ln=True, align="C")

    pdf.image(qr_path, x=130, y=110, w=50)

    pdf.output(filepath)

    return jsonify({
        "success": True,
        "message": "Certificate generated",
        "download_url": f"/api/certificate/download/{filename}"
    }), 200


@app.route("/api/certificate/download/<filename>", methods=["GET"])
def download_certificate(filename):
    filepath = os.path.join(CERT_FOLDER, filename)

    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 404

    return send_file(filepath, as_attachment=True)


# ---------------------------------------------------------------------
# SERVER
# ---------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
