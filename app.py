from flask import Flask, render_template, request
from flask_cors import CORS
import requests
import os
app = Flask("__main__")
CORS(app)

#処理
@app.route("/")
def hello():
    return render_template(
        'index.html',
        title='XMLでデータ処理',
        message='Built for Javascript and Python'
    )
# 非同期処理
@app.route('/get_rss_xml', methods=['GET'])
def get_external_xml():
    # script.jsから送信されたデータを取得
    selectVal = request.args.get('val')
    xml_file_path = os.path.join('static', selectVal)
    if not os.path.exists(xml_file_path):
        return "File not found", 404
    # XML ファイルを読み込む
    with open(xml_file_path, 'r', encoding='utf-8') as f:
        xml_content = f.read()
    
    #urlの場合    
    # selectVal = request.args.get('val')
    # xml_url = selectVal
    # response = requests.get(xml_url)
    # return response.text, {'Content-Type': 'application/xml; charset=utf-8'}

    return xml_content, {'Content-Type': 'application/xml; charset=utf-8'}

# アプリケーションの実行
if __name__ == '__main__':
    app.debug = True
    app.run()