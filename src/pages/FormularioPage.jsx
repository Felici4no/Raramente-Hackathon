import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TriagemSwipeDemo from '../components/TriagemSwipeDemo.jsx';

export default function FormularioPage() {
  return (
    <>
      <div className="container" style={{ paddingTop: '32px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-quati-brown)',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={16} />
          Voltar para o site
        </Link>
      </div>
      <TriagemSwipeDemo />
    </>
  );
}
