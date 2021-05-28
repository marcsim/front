import Link from 'next/link';
import { Button, Nav, Navbar } from 'react-bootstrap';
import './navigation.module.css';

type connexionProps = {
    isConnected: Boolean;
};
export default function Navigation(props: connexionProps) {
    const connectDisplay = <div>
        <Link href="/">
            <Button variant="danger" className="btn-user">Déconnexion</Button>
        </Link>
        <Link href="/users/profile">
            <Button variant="primary" className="btn-user">Mon compte</Button>
        </Link></div>;
    const notConnectDisplay = <div>
        <Link href="/users/register">
            <Button variant="danger" className="btn-user">Inscription</Button>
        </Link>
        <Link href="/users/login">
            <Button variant="primary" className="btn-user">Connexion</Button>
        </Link></div>;
    const activeLink = { color: "black"};

    return (
        <Navbar bg="warning" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/">Accueil</Link>
                    {/* className="navlink first-navlink" */}
                    {/* activeStyle={ activeLink } */}
                    <Link href="/albums">Album</Link>
                    <Link href="/songs">Musique</Link>
                    <Link href="/Artists">Artiste</Link>
                </Nav>
            </Navbar.Collapse>
            {
                    props.isConnected ?  connectDisplay : notConnectDisplay 
            }
        </Navbar>
    );
}