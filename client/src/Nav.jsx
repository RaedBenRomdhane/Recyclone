import {Link,useMatch,useResolvedPath} from 'react-router-dom'

function Nav(){

    return(
    <div className="topnav">
        <CostumLink to="/">Accueil</CostumLink>
        <CostumLink to="/user">Utilisateur</CostumLink>
        <CostumLink to="/admin">Admin</CostumLink>
    </div>
    )
}

export default Nav

function CostumLink({to, children, ...props}){
    const resolvedPath=useResolvedPath(to)
    const isActive=useMatch({path:resolvedPath.pathname,end:true})
    return(
        
        <Link className={isActive ? "active" : ""} to={to} {...props} >
            {children}
        </Link>
    )
}