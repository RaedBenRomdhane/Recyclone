from flask import Flask, request, jsonify , send_from_directory
from flask_cors import CORS
import os
import time
import json
from API import *
from Admin import *

app = Flask(__name__)
CORS(app)

# *** image interpretation fror user ***
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Pas de fichier sélectionné'})
    
    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        
        # chat gpt request
        #image_path='C:/**path**/Recyclone/server/uploads/'+filepath[8:]
        image_path='C:/Users/asus/OneDrive - SUPCOM/doc/supcom1/internship/Apps/Recyclone/server/uploads/'+filepath[8:]
        interpretation=image_path_interpret(image_path)

        #fake response
        'interpretation='  '''[
  {
    "type": "plastique",
    "pourcentage de présence": 40,
    "certitude": 90,
    "description": "bouteilles et emballages en plastique",
    "taux de recyclage": 30,
    "conseils de recyclage": "séparer et rincer les bouteilles avant de les déposer dans les bacs de recyclage appropriés"
  },
  {
    "type": "papier",
    "pourcentage de présence": 20,
    "certitude": 80,
    "description": "carton et journaux",
    "taux de recyclage": 70,
    "conseils de recyclage": "écarter les parties souillées avant de recycler"
  },
  {
    "type": "métal",
    "pourcentage de présence": 10,
    "certitude": 70,
    "description": "canettes et boîtes métalliques",
    "taux de recyclage": 50,
    "conseils de recyclage": "rincer et écraser les canettes avant de recycler"
  },
  {
    "type": "verre",
    "pourcentage de présence": 5,
    "certitude": 60,
    "description": "bouteilles et pots en verre",
    "taux de recyclage": 65,
    "conseils de recyclage": "rincer avant de déposer les objets en verre dans les conteneurs de recyclage"
  },
  {
    "type": "déchets organiques",
    "pourcentage de présence": 15,
    "certitude": 75,
    "description": "débris alimentaires et végétaux",
    "taux de recyclage": 25,
    "conseils de recyclage": "composter les déchets organiques"
  }
  ]
'''     
        print('-----------------')
        print(interpretation)
        #simulate the response time
        #time.sleep(2)
        return jsonify({'message': 'Fichier téléchargé avec succès', 'filename': file.filename,'interpretation':interpretation})


# *** admin password check ***

@app.route('/check', methods=['POST'])
def controle_accsess():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Aucune donnée fournie'}), 400
    
    verification = verify_password(data)

    #simulate the response time
    time.sleep(1)

    return jsonify({'message': 'Authentification avec succès', 'verification': verification})

# *** send the history data to the client ***
@app.route('/history', methods=['POST'])
def interpret_data():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Aucune donnée fournie'}), 400

    
    result = extarct_fro_history(data) 
    
    if result==False:
      #simulate the response time
      time.sleep(1)
      return jsonify({'message': 'Erreur d"authentification', 'result': result})
    
    else:
      #simulate the response time
      time.sleep(1)
      for document in result:
        serve_image( get_file_name(document["image_path"]))
      return jsonify({'message': 'Données traitées avec succès', 'result': result})

@app.route('/images/<filename>')
def serve_image(filename):
  return send_from_directory('uploads', filename)


if __name__ == '__main__':
    app.run(debug=True,port=8001)