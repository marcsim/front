import { useState } from "react";
import Navigation from '../../../component/navigation/navigation.component';

export default function user() {
    const [isConnect, setIsConnect] = useState(false);

    if(window.localStorage.token) {
        setIsConnect(true);
    }
    
    return (
        <main>
            <Navigation isConnected={isConnect} />
            <h1>Bonjour, </h1>
        </main>
    );
}