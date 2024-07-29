import {Link} from 'react-router-dom'


function Home(){
    return(<>
        <div className='entry_container'>
        <p className='entry_text'>Bienvenue chez Recyclon, où nous portons le recyclage et le tri des déchets à un niveau supérieur grâce aux dernières versions de modèles d'IA</p>
        </div>
        <div className="cards">
            <div className="card">
                <img src='/src/assets/user.jpg' alt='User' className='card_img'></img>
                <div className="card_contente">
                    <h3>Se connecter en tant que utilisateur</h3>
                    <p>Connectez-vous en tant qu'utilisateur et exploitez le pouvoir de Recyclone pour trier les déchets. </p>
                    <Link to="/user" className='card_button' >Utilisateur</Link>
                </div>
            </div>
            <div className="card">
                <img src='/src/assets/admin.jpg' alt='Admin' className='card_img'></img>
                <div className="card_contente">
                    <h3>Se connecter en tant qu'administrateur</h3>
                    <p>Connectez-vous en tant qu'administrateur et exploitez l'historique de traitement subi par Recyclone.</p>
                    <Link to="/admin" className='card_button' >Administrateur</Link>
                </div>
            </div>
        </div>
    </>)
}
export default Home