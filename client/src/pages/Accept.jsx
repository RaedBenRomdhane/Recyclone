import React from 'react';
import {useDropzone} from 'react-dropzone';

function Accept(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles:2,
    onDrop: (acceptedFiles) => {
        if (props.onFilesAccepted) {
          props.onFilesAccepted(acceptedFiles);
          //console.log(acceptedFiles);
        }}
  });


  const fileRejectionItems = fileRejections.map(({ file, errors }) => (<>
      <p>Nom du fichier {file.path} provoque un erreur:</p>
      <ul>
        {errors.map(e => (
          <li key={e.code} className='error'>{e.message}!!</li>
        ))}
      </ul>
      </>
  ));

  return (
    <section className="Drop_Container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Faites glisser et déposer des fichiers ici, ou cliquez pour sélectionner des fichiers</p>
        <em>(Seules les images au format *.jpeg et *.png seront acceptées)</em>
      </div>
      <aside>
        {fileRejectionItems}
      </aside>
    </section>
  );
}

export default Accept;