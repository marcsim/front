import { User } from './../../api/dto/user.model';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Navigation from '../../component/navigation/navigation.component';

export default function login() {
    const [isConnect, setIsConnect] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [mailError, setMailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [goToHome, setGoToHome] = useState(false);

    async function onSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event?.preventDefault();

        setMailError('');
        setPasswordError('');

        let valid = true; 

        if (mail.trim() === '') {
            setMailError('Vous devez renseigner un titre valide');
            valid = false; 
        }

        if (password.trim() === '') {
            setPasswordError('Vous devez renseigner une année valide');
            valid = false;
        }

        if (valid) {
            await getServerSide(mail, password);
            if(window.localStorage.token !== 'undefined') {
                setIsConnect(true);
            }
        } else {
            console.log('Erreur formulaire invalid');
        }
    }

    function onMailChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setMail(event.target.value);
    }

    function onPasswordChanged(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }
    return (
        <div className="container-user">
            <Navigation isConnected={isConnect} />
            <main>
                <h1>S'identifier</h1>
                <Form className="form">
                    <Form.Label>Email:</Form.Label>
                    <input placeholder="mail" type="email" value={mail} onChange={ onMailChanged } />
                    <p>{ mailError }</p>
                    <Form.Label>Mot de passe:</Form.Label>
                    <input placeholder="password" type="password" value={password} onChange={ onPasswordChanged } />
                    <p>{ passwordError }</p>
                    <Button type="submit" onClick={onSubmit}>S'identifier</Button>
                </Form>
            </main>
        </div>
    );
}

export async function getServerSide(mail: string, password: string) {
    const postBody = {
        mail: mail,
        password: password
    };
    const requestMetadata = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    };

    await fetch('http://localhost:3001/User/login', requestMetadata)
    .then(res =>res.json())
    .then(recipes => {
        console.log('recipes', recipes);
        //Afficher l'erreur
        console.log('error', recipes.error);
        
        if (!recipes.error) {
            if (typeof window !== "undefined") {
                localStorage.setItem('token', recipes.accessToken);
            }
        }
        console.log('localstorage', window.localStorage);
        return ({ recipes });
    });
}