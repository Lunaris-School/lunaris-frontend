import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

import logo from "../../assets/logo-escura.png";
import imagemHome from "../../assets/imagem-home.png";
import imagemPlanos from "../../assets/imagem-planos.png";

import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      {/* NAV */}
      <header className="landing-nav">
        <div className="nav-left">
          <img className="nav-logo" src={logo} alt="Logo" />
          <span className="nav-brand">Lunaris</span>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#sobre">Sobre</a>
          <a href="#planos">Planos</a>
        </nav>

        <div className="nav-actions">
          <button className="btn-outline" onClick={() => navigate('/login')}>
            Entrar
          </button>
          <button className="btn-solid" onClick={() => navigate('/cadastro-aluno')}>
            Cadastre-se
          </button>
        </div>
      </header>

      <section id="home" className="hero">
        <img className="hero-img" src={imagemHome} alt="Imagem Home" />

        <div className="hero-overlay">
          <h1>
            Seu futuro fala mais <br />
            de um idioma.
          </h1>
          <p>
            Nós acreditamos nas oportunidades fora do país.
          </p>

          <a
            className="hero-btn"
            href="mailto:lunaris.school@outlook.com.br?subject=Quero%20estudar%20na%20It%C3%A1lia&body=Ol%C3%A1,%0A%0ATenho%20interesse%20em%20receber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20cursos%20da%20Lunaris.%0A%0AMeu%20nome:%0ACidade:%0ATelefone:%0A%0AObrigada!"
            >
            Entre em contato
        </a>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="sobre">
        <div className="sobre-top">
          <div className="sobre-col">
            <h2>
              Viva a Itália. <br />
              Não Apenas Visite.
            </h2>
            <p>
              Estudar na Itália é mergulhar em um país onde cada rua conta uma história
              e cada esquina revela cultura, arte e tradição. Muito além das salas de
              aula, a experiência é viver o idioma no cotidiano, explorar cidades históricas,
              experimentar a gastronomia autêntica e fazer parte de uma das culturas mais
              influentes do mundo.
            </p>
          </div>

          <div className="sobre-col">
            <p>
              Nossa escola oferece uma experiência completa: ensino de qualidade,
              suporte ao estudante e uma imersão real na vida italiana. Você não vem
              apenas para aprender italiano, mas para desenvolver autonomia, confiança
              e uma visão de mundo ampliada.
            </p>
          </div>
        </div>

        <div className="sobre-mid">
          <div className="cards">
            <div className="info-card">
              <img src={icon1} alt="" />
              <h3>Imersão Real no Idioma</h3>
              <p>Você aprende italiano vivendo a rotina local, praticando em situações reais.</p>
            </div>

            <div className="info-card">
              <img src={icon2} alt="" />
              <h3>Certificação Reconhecida</h3>
              <p>Ao final do curso, você recebe um certificado válido internacionalmente.</p>
            </div>

            <div className="info-card">
              <img src={icon3} alt="" />
              <h3>Acompanhamento Personalizado</h3>
              <p>Suporte acadêmico e orientação prática para adaptação e moradia.</p>
            </div>

            <div className="info-card">
              <img src={icon4} alt="" />
              <h3>Vivência Cultural Autêntica</h3>
              <p>Aulas, eventos e experiências culturais para você viver a Itália.</p>
            </div>
          </div>

          <div className="sobre-right">
            <h2>Descubra uma nova forma de aprender na Itália</h2>
            <p>
              Mais do que um curso, oferecemos uma experiência completa de imersão cultural
              e acadêmica. Nossa escola combina ensino de excelência, suporte personalizado
              e vivências autênticas para que você desenvolva fluência, confiança e autonomia.
            </p>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="planos">
        <h2 className="planos-title">Nossos planos</h2>

        <div className="planos-bg">
          <img className="planos-img" src={imagemPlanos} alt="Imagem Planos" />
          <div className="planos-overlay" />

          <div className="planos-cards">
            <div className="plano-card">
              <h3>Plano Cultura Viva</h3>
              <div className="preco">€690 <span>/ por mês</span></div>
              <ul>
                <li>5 aulas presenciais por semana</li>
                <li>Certificado internacional</li>
                <li>Conversação 2x por semana</li>
                <li>Orientação para moradia</li>
              </ul>
            </div>

            <div className="plano-card destaque">
              <h3>Plano La Dolce Vita Premium</h3>
              <div className="preco">€980 <span>/ por mês</span></div>
              <ul>
                <li>5 aulas + 1 aula extra de reforço</li>
                <li>Conversação ilimitada</li>
                <li>Certificado avançado</li>
                <li>Mentoria individual</li>
              </ul>
            </div>

            <div className="plano-card">
              <h3>Plano Essenziale</h3>
              <div className="preco">€450 <span>/ por mês</span></div>
              <ul>
                <li>4 aulas presenciais por semana</li>
                <li>Grupo de conversação semanal</li>
                <li>Certificado de conclusão</li>
                <li>Suporte acadêmico</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <img src={logo} alt="Logo" />
        <span>Lunaris</span>
      </footer>
    </div>
  );
}