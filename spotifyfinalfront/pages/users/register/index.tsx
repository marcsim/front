import { Button, Form } from 'react-bootstrap';
import { User } from './../../api/dto/user.model';
import Navigation from '../../component/navigation/navigation.component';
import { useState } from 'react';

export default function register() { 
    const [isConnect, setIsConnect] = useState(false);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [mailError, setMailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [users, setUsers] = useState<User[]>([]);

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
            const tmpUsers = [...users];
            tmpUsers.push({
                id: 0,
                mail,
                password,
            });
            setUsers(tmpUsers);
            await getServerSide(mail, password);
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
            <h1>Inscription</h1>
            <Form className="form">
                <Form.Label>Email:</Form.Label>
                <input placeholder="mail" type="email" value={mail} onChange={ onMailChanged } />
                <p>{ mailError }</p>
                <Form.Label>Mot de passe:</Form.Label>
                <input placeholder="password" type="password" value={password} onChange={ onPasswordChanged } />
                <p>{ passwordError }</p>
                
                <Button type="submit" onClick={onSubmit}>S'inscrire</Button>
            </Form>
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
    await fetch('http://localhost:3001/User/signup', requestMetadata)
    .then(res =>res.json())
    .then(recipes => {
        console.log(recipes);
        return ({ recipes });
    });
}