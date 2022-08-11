import { FormEvent, useState } from 'react';
import Input from '../../componets/Input';
import Button from '../../componets/Button';
import { FiLogIn } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './logon.scss';

function Logon() {
    const [id, setId] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await api.get(`ngos/${id}`);
            console.log(response.data);
            // localStorage.setItem('ngoId', id);
            // localStorage.setItem('ngoName', response.data.name);
            navigate('/profile');
        } catch (err) {
            setError(true);
            // setId('');
        }
    };
    return (
        <div className="logon-Container">
            <div>
                <div className="logo">
                    <img src="./logo.svg" alt="To be Hero" />
                </div>
                <div className="logon">
                    <h1>Faça seu logon</h1>
                    <form onSubmit={handleLogin}>
                        <Input
                            className="input"
                            name="sua_id"
                            label="Sua ID"
                            setValue={setId}
                            value={id}
                            error={error}
                            setError={setError}
                            errorMessage={'Falha no login, tente novamente.'}
                        />
                        <Button className="button" type="submit">
                            Entrar
                        </Button>
                    </form>

                    <div className="register">
                        <Link className="back-link" to="/register">
                            <FiLogIn className="icon" size={16} />
                            Não tenho cadastro
                        </Link>
                    </div>
                </div>
            </div>
            <div className="heroes">
                <img src="./heroes.png" alt="Heroes" />
            </div>
        </div>
    );
}

export default Logon;
