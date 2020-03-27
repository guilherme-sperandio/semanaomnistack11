import React, {useState} from 'react';
import './styles.css';
import {Link,useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api'



export default function NewIncidente(){
    const history = useHistory();
    const [title, setTitle] =  useState('');
    const [description, setDescription] =  useState('');
    const [value, setValue] =  useState('');
    const ongId = localStorage.getItem('ongId');
    async function handleNewincident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        };
        try{
            await api.post('incidents', data,{
                headers:{
                    Authorization : ongId,
                }
            })
            history.push('/profile');

        }catch(err){
            alert("Erro ao cadastrar novo caso!");
        }

    }
    return(
        <div className="NewIncident_container">
            <div className="content">
                <section>
                <img src={logoImg} alt=" be the Hero"/>
                <h1>Cadastrar Novo caso</h1>
                <p>
                    Descreva o caso detalhadamente, para encontar um herói para te ajudar.
                </p>
                <Link className = "Back-link" to="/profile">
                    <FiArrowLeft size ={16} color = "#E02041" />
                    Voltar para Home
                </Link>
                </section>
                <form onSubmit={handleNewincident}>
                    <input 
                     type="text" placeholder="Titulo do caso"
                     value={title}
                     onChange = {e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange = {e => setDescription(e.target.value)}
                    ></textarea>
                    <input 
                        type="text" placeholder="Valor"
                        value={value}
                        onChange = {e => setValue(e.target.value)}
                    />
                    <div class="buttons2">
                    <button className="button" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    
    );
}