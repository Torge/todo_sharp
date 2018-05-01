from flask import Flask, jsonify, url_for, redirect, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import json
from bson import ObjectId
from datetime import datetime
from oauth2client.client import OAuth2WebServerFlow
import httplib2

flow = OAuth2WebServerFlow(client_id='1027715718368-niq4gvn9hie8rr079ouv6p0osumdm4vb.apps.googleusercontent.com',
                           client_secret='clF2yjEX6sPxrJB3VNDiLrb2',
                           scope='email',
                           redirect_uri='http://localhost:8080/login')

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "strapi"
CORS(app)
mongo = PyMongo(app, config_prefix='MONGO')

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        elif isinstance(o, datetime):
          return o.isoformat()
        return json.JSONEncoder.default(self, o)


@app.route('/project', methods=['POST'])
def project_create():
  data = request.get_json()
  if not data:
    data = {"response": "ERROR"}
    return JSONEncoder().encode(data)
  else:
    projectId = mongo.db.project.insert(data)
    project = mongo.db.project.find_one({'_id': projectId})
    return JSONEncoder().encode(project)
@app.route('/project', methods=['GET'])
def project_find():
  projects = []
  cursor = mongo.db.project.find()
  for project in cursor:
    projects.append(project)
  return JSONEncoder().encode(projects)
@app.route('/project/<string:id>', methods=['GET'])
def project_get(id):
  project = mongo.db.project.find_one({'_id': ObjectId(id)})
  return JSONEncoder().encode(project)
@app.route('/project/<string:id>', methods=['PUT'])
def project_patch(id):
  data = request.get_json()
  mongo.db.project.update_one({'_id': ObjectId(id)}, {'$set': data})
  project = mongo.db.project.find_one({'_id': ObjectId(id)})
  return JSONEncoder().encode(project)
@app.route('/project/<string:id>', methods=['DELETE'])
def project_delete(id):
  mongo.db.project.delete_one({'_id': ObjectId(id)})
  return "ok"

@app.route('/ticket', methods=['POST'])
def ticket_create():
  data = request.get_json()
  if not data:
    data = {"response": "ERROR"}
    return JSONEncoder().encode(data)
  else:
    ticketId = mongo.db.ticket.insert(data)
    ticket = mongo.db.ticket.find_one({'_id': ticketId})
    return JSONEncoder().encode(ticket)
@app.route('/ticket', methods=['GET'])
def ticket_find():
  tickets = []
  cursor = mongo.db.ticket.find()
  for ticket in cursor:
    tickets.append(ticket)
  return JSONEncoder().encode(tickets)
@app.route('/ticket/<string:id>', methods=['GET'])
def ticket_get(id):
  ticket = mongo.db.ticket.find_one({'_id': ObjectId(id)})
  return JSONEncoder().encode(ticket)
@app.route('/ticket/<string:id>', methods=['PUT'])
def ticket_patch(id):
  data = request.get_json()
  mongo.db.ticket.update_one({'_id': ObjectId(id)}, {'$set': data})
  ticket = mongo.db.ticket.find_one({'_id': ObjectId(id)})
  return JSONEncoder().encode(ticket)
@app.route('/ticket/<string:id>', methods=['DELETE'])
def ticket_delete(id):
  mongo.db.ticket.delete_one({'_id': ObjectId(id)})
  return "ok"


@app.route('/user', methods=['POST'])
def user_create():
  data = request.get_json()
  if not data:
    data = {"response": "ERROR"}
    return JSONEncoder().encode(data)
  else:
    userId = mongo.db['users-permissions_user'].insert(data)
    user = mongo.db['users-permissions_user'].find_one({'_id': userId})
    return JSONEncoder().encode(user)
@app.route('/user', methods=['GET'])
def user_find():
  users = []
  cursor = mongo.db['users-permissions_user'].find()
  for user in cursor:
    users.append(user)
  return JSONEncoder().encode(users)
@app.route('/user/<string:id>', methods=['GET'])
def user_get(id):
  user = mongo.db['users-permissions_user'].find_one({'_id': ObjectId(id)})
  return JSONEncoder().encode(user)
@app.route('/user/<string:id>', methods=['PUT'])
def user_patch(id):
  data = request.get_json()
  mongo.db['users-permissions_user'].update_one({'_id': ObjectId(id)}, {'$set': data})
  user = mongo.db['users-permissions_user'].find_one({'_id': ObjectId(id)})
  return JSONEncoder().encode(user)
@app.route('/user/<string:id>', methods=['DELETE'])
def user_delete(id):
  mongo.db['users-permissions_user'].delete_one({'_id': ObjectId(id)})
  return "ok"

@app.route('/connect/google/')
def connetGoogle():
  return redirect(flow.step1_get_authorize_url())
@app.route('/auth/google/callback')
def auth():
  http = httplib2.Http()
  code = request.args.get('access_token')
  credentials = flow.step2_exchange(code)
  http = credentials.authorize(http)
  (resp, content) = http.request('https://www.googleapis.com/oauth2/v1/userinfo?alt=json')
  googleUser = json.loads(content)
  user = {
    'email': googleUser['email'],
    'username': googleUser['name'],
    'provider': 'google'
  }
  print(googleUser)
  mongo.db['users-permissions_user'].update_one({'email': user['email']}, {'$set': user}, upsert = True)
  user = mongo.db['users-permissions_user'].find_one({'email': user['email']})
  jwt = credentials.get_access_token().access_token
  return JSONEncoder().encode({'user': user, 'jwt': jwt})  

if __name__ == "__main__":
    app.run(debug=True)