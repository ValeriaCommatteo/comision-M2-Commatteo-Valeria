import { Link } from "react-router-dom";
import React from 'react';
import './stylePages.css';
import logo from '../assets/paisajes/logo.avif'
import Card from 'react-bootstrap/Card';

function Home() {
  return (
    <div className="centrar-tarjeta">
      <Card className="text-black">
        <Card.Body>
          <Card.Text>
            ¡Bienvenido a nuestra comunidad de viajeros! Descubre y comparte experiencias inolvidables, conecta con otros apasionados
            de los viajes y encuentra inspiración para tu próxima aventura. Regístrate hoy y comienza a explorar el fascinante mundo de las historias de viajes.
          </Card.Text>
        </Card.Body>
        <Card.Img src={logo} className="img-foto-portada" style={{ marginTop: '20px' }} />
      </Card>
    </div>

  );
}

export default Home;