# from flask import Flask,render_template
from repertoire import ipv4,effter
# app = Flask(__name__)
# # effter()
# app.route('/',methods=['POST','GET'])
# def index():
#     return 'hello world'

# app.route('/hello',methods=['POST','GET'])
# def index2():
#     return 'hello world'

host = ipv4()

# app.run(host='localhost',port=8080,debug=True)

print(host)