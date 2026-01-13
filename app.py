import streamlit as st
import base64
from pathlib import Path
import mimetypes

st.set_page_config(page_title="Portfolio", layout="wide")

def load_text(path):
    return Path(path).read_text(encoding="utf-8")

def image_to_base64(image_path):
    mime_type, _ = mimetypes.guess_type(image_path)
    with open(image_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode()
    return f"data:{mime_type};base64,{encoded}"

# Load files
html = load_text("index.html")
css = load_text("styles.css")
js = load_text("script.js")

# Replace all image placeholders automatically
assets_path = Path("assets")

for image in assets_path.iterdir():
    if image.is_file():
        placeholder = f"{{{{{image.name}}}}}"
        html = html.replace(
            placeholder,
            image_to_base64(image)
        )

final_html = f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
{css}
</style>
</head>
<body>
{html}
<script>
{js}
</script>
</body>
</html>
"""

st.components.v1.html(final_html, height=3000, scrolling=True)
