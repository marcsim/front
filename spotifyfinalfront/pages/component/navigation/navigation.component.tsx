import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import style from './navigation.module.css';


type connexionProps = {
    isConnected: Boolean;
};
export default function Navigation(props: connexionProps) {
    const [isConnect, setIsConnect] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(window.localStorage.token) {
            setIsConnect(true);
        }
      }, []);

    function signOut()  {
        localStorage.setItem('token', '');
        setIsConnect(false);
    }
    
    const connectDisplay = (
        <div>
            <Link href="/">
                <Button onClick={signOut} variant="danger" className={style.btn_user}>Déconnexion</Button>
            </Link>
            <Link href="/users/profile">
                <Button variant="primary" className={style.btn_user}>Mon compte</Button>
            </Link>
        </div>
    );
    const notConnectDisplay = (
        <div>
            <Link href="/users/register">
                <Button variant="danger" className={style.btn_user}>Inscription</Button>
            </Link>
            <Link href="/users/login">
                <Button variant="primary" className={style.btn_user}>Connexion</Button>
            </Link>
        </div>
    );
    const activeLink = { color: "black"};

    return (
        <Navbar bg="warning" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/">
                        <a className={router.pathname == "/" ? `${style.activeLink} ${style.navlink} ${style.first_navlink}` : `${style.navlink} ${style.first_navlink}`}>Accueil</a>
                    </Link>
                    <Link href="/albums">
                        <a className={router.pathname == "/albums" ? `${style.activeLink} ${style.navlink} ${style.first_navlink}` : `${style.navlink} ${style.first_navlink}`}>Album</a>
                    </Link>
                    <Link href="/songs">
                        <a className={router.pathname == "/songs" ? `${style.activeLink} ${style.navlink} ${style.first_navlink}` : `${style.navlink} ${style.first_navlink}`}>Musique</a>
                    </Link>
                    <Link href="/artists">
                        <a className={router.pathname == "/artists" ? `${style.activeLink} ${style.navlink} ${style.first_navlink}` : `${style.navlink} ${style.first_navlink}`}>Artiste</a>
                    </Link>
                </Nav>
            </Navbar.Collapse>
            {
                    props.isConnected ? connectDisplay : notConnectDisplay 
            }
        </Navbar>
    );
}