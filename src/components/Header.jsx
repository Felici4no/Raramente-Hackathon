import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, LayoutDashboard, MessageSquare, Database, Route, Award, Info, Cpu, ClipboardList } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Produto',         href: '/#hero',       icon: LayoutDashboard, tabletVisible: true },
  { label: 'Como funciona',   href: '/#whatsapp',   icon: MessageSquare,   tabletVisible: false },
  { label: 'QuaTiRare',       href: '/#quatirare',  icon: Database,        tabletVisible: true },
  { label: 'Jornada',         href: '/#jornada',    icon: Route,           tabletVisible: false },
  { label: 'Impacto',         href: '/#impacto',    icon: Award,           tabletVisible: false },
  { label: 'Formulário',      href: '/formulario',  icon: ClipboardList,  tabletVisible: true },
  { label: 'Sobre',           href: '/#footer',     icon: Info,            tabletVisible: false },
];

export default function Header() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const drawerRef                     = useRef(null);
  const firstFocusRef                 = useRef(null);
  const burgerRef                     = useRef(null);

  /* ── Scroll behaviour ── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Lock body scroll when drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ── Focus trap in drawer ── */
  useEffect(() => {
    if (!menuOpen) return;

    // Move focus to first element
    setTimeout(() => firstFocusRef.current?.focus(), 50);

    const handleKey = (e) => {
      if (e.key === 'Escape') closeMenu();

      if (e.key === 'Tab') {
        const focusable = drawerRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
        }
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const openMenu  = () => setMenuOpen(true);
  const closeMenu = () => {
    setMenuOpen(false);
    setTimeout(() => burgerRef.current?.focus(), 50);
  };

  return (
    <>
      {/* ── Floating header wrapper ── */}
      <div className={`header-wrapper${scrolled ? ' scrolled' : ''}`} role="banner">
        <header className={`header-nav${scrolled ? ' scrolled' : ''}`}>
          <div className="header-content">

            {/* Logo */}
            <a href="/" className="logo-group" aria-label="Agente na Sua — início">
              <img
                src="/nasua.png"
                alt=""
                aria-hidden="true"
                className="header-logo"
              />
              <span className="header-brand-name">Agente na Sua</span>
              <span className="header-badge header-only-desktop" aria-hidden="true">
                Plataforma SUS
              </span>
            </a>

            {/* Desktop nav — ≥ 1200px: all links */}
            <nav
              className="desktop-nav full-nav"
              aria-label="Navegação principal"
            >
              <ul className="nav-links" role="list">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Tablet nav — 768–1199px: only tabletVisible links */}
            <nav
              className="desktop-nav tablet-nav"
              aria-label="Navegação tablet"
            >
              <ul className="nav-links" role="list">
                {NAV_LINKS.filter(l => l.tabletVisible).map(({ label, href }) => (
                  <li key={href}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Desktop CTAs */}
            <div className="header-ctas" aria-label="Ações principais">
              <a href="/#whatsapp" className="header-btn-ghost">
                Falar com Nasua
              </a>
              <a href="/#dashboard" className="header-btn-primary">
                Acessar plataforma
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>

            {/* Burger — tablet + mobile */}
            <button
              ref={burgerRef}
              className="header-burger"
              onClick={openMenu}
              aria-expanded={menuOpen}
              aria-controls="drawer-panel"
              aria-label="Abrir menu de navegação"
            >
              <Menu size={20} aria-hidden="true" />
            </button>

          </div>
        </header>
      </div>

      {/* ── Drawer overlay ── */}
      <div
        className={`drawer-overlay${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── Drawer panel ── */}
      <aside
        id="drawer-panel"
        ref={drawerRef}
        className={`drawer-panel${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Drawer header */}
        <div className="drawer-header">
          <a
            href="/"
            className="logo-group"
            onClick={closeMenu}
            aria-label="Agente na Sua — início"
          >
            <img
              src="/nasua.png"
              alt=""
              aria-hidden="true"
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1rem',
              color: 'var(--color-text-brown)',
            }}>
              Agente na Sua
            </span>
          </a>

          <button
            ref={firstFocusRef}
            className="drawer-close"
            onClick={closeMenu}
            aria-label="Fechar menu"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="drawer-body" aria-label="Navegação mobile">
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className="drawer-nav-link"
              onClick={closeMenu}
            >
              <span className="drawer-nav-icon" aria-hidden="true">
                <Icon size={16} />
              </span>
              {label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="drawer-footer">
          <a href="/#dashboard" className="drawer-cta-primary" onClick={closeMenu}>
            <ArrowRight size={16} aria-hidden="true" />
            Acessar plataforma
          </a>
          <a href="/#whatsapp" className="drawer-cta-secondary" onClick={closeMenu}>
            <MessageSquare size={15} aria-hidden="true" />
            Falar com Nasua
          </a>
          <p style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#8B5A2B',
            marginTop: '4px',
            fontStyle: 'italic',
          }}>
            Tecnologia criada para apoiar — não substituir — profissionais de saúde.
          </p>
        </div>
      </aside>
    </>
  );
}
