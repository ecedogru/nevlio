export default function LandingPage() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'system-ui, sans-serif', background: '#EDE3D5' }}>

      {/* ── SOL SABİT NAV ── */}
      <aside style={{
        width: 160,
        minWidth: 160,
        height: '100vh',
        background: '#EDE3D5',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(0,0,0,0.08)',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '18px 14px', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 900, fontSize: 22, color: '#111', letterSpacing: -1, lineHeight: 1 }}>nevlio.</div>
          <div style={{ fontSize: 8, color: '#999', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 2 }}>smart job tracker</div>
        </div>

        {/* Nav kartları */}
        {[
          { num: '01', label: 'Nasıl Çalışır?', bg: '#3B5BF6' },
          { num: '02', label: 'Özellikler',     bg: '#F5C842' },
          { num: '03', label: 'CV Analizi',     bg: '#E8471C' },
          { num: '04', label: 'İletişim',       bg: '#2ECC71' },
        ].map(item => (
          <a key={item.num} href="#" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '12px 14px',
            background: item.bg,
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            textDecoration: 'none',
            height: 88,
            cursor: 'pointer',
            transition: 'filter 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(0.92)')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'brightness(1)')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>{item.num}</span>
              <span style={{ color: '#fff', fontSize: 16, opacity: 0.9 }}>↗</span>
            </div>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>{item.label}</span>
          </a>
        ))}

        {/* CTA */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(0,0,0,0.08)', marginTop: 'auto' }}>
          <button style={{
            width: '100%',
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '13px 8px',
            fontWeight: 800,
            fontSize: 13,
            cursor: 'pointer',
            lineHeight: 1.4,
            letterSpacing: -0.3,
          }}>
            Hemen<br />başla ↗
          </button>
        </div>

        {/* Dil */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>TR</span>
          <span style={{ color: '#aaa', fontSize: 12 }}>|</span>
          <span style={{ fontSize: 13, color: '#999', cursor: 'pointer' }}>EN</span>
          <span style={{ marginLeft: 4, fontSize: 14 }}>🌐</span>
        </div>

        {/* Sosyal */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: 8 }}>
          {[
            { label: 'in', title: 'LinkedIn' },
            { label: 'tw', title: 'Twitter' },
            { label: 'ig', title: 'Instagram' },
          ].map(s => (
            <div key={s.label} title={s.title} style={{
              width: 30, height: 30,
              border: '1.5px solid rgba(0,0,0,0.18)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: '#444',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: 0.3,
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#111'; e.currentTarget.style.color = '#111' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.18)'; e.currentTarget.style.color = '#444' }}
            >
              {s.label}
            </div>
          ))}
        </div>
      </aside>

      {/* ── SAĞ HERO — TAM EKRAN ── */}
      <main style={{
        flex: 1,
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#1a1a2e',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 64px 72px',
      }}>
        {/* Arka plan gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0d1117 0%, #0d1f5c 45%, #1a3a8f 80%, #1565c0 100%)',
        }} />

        {/* Sağ üst dekoratif renkli dikdörtgenler — units.gr'daki gibi */}
        <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', gap: 8 }}>
          <div style={{ width: 80, height: 28, background: '#3B5BF6', borderRadius: 6, opacity: 0.7 }} />
          <div style={{ width: 48, height: 28, background: '#F5C842', borderRadius: 6, opacity: 0.7 }} />
          <div style={{ width: 64, height: 28, background: '#E8471C', borderRadius: 6, opacity: 0.7 }} />
        </div>

        {/* Işık efekti */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 55% 45%, rgba(59,91,246,0.25) 0%, transparent 65%)',
        }} />

        {/* Grid nokta deseni */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        {/* İçerik */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <h1 style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.92,
            letterSpacing: -4,
            margin: '0 0 28px',
          }}>
            {/* [BURAYA ANA BAŞLIK GELECEK] */}
            İş bul.<br />
            <span style={{ color: '#3B5BF6' }}>Zekice.</span>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 20,
            lineHeight: 1.55,
            marginBottom: 40,
            maxWidth: 460,
          }}>
            {/* [BURAYA ALT BAŞLIK / AÇIKLAMA GELECEK] */}
            Tüm ilanları bir yerde topla. CV'nle eşleştir. Şirketi tanı. Başvurunu takip et.
          </p>

          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: '#fff',
            color: '#111',
            border: 'none',
            borderRadius: 50,
            padding: '18px 36px',
            fontWeight: 800,
            fontSize: 16,
            cursor: 'pointer',
            letterSpacing: -0.3,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {/* [BURAYA CTA BUTONU METNİ GELECEK] */}
            Ücretsiz başla <span style={{ fontSize: 18 }}>↗</span>
          </button>
        </div>

        {/* Sağ alt köşe — units.gr'daki gibi küçük etiket */}
        <div style={{
          position: 'absolute',
          bottom: 28,
          right: 32,
          color: 'rgba(255,255,255,0.3)',
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}>
          {/* [BURAYA KÜÇÜK ETİKET / SLOGAN GELEBİLİR] */}
          AI destekli · Beta
        </div>
      </main>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
      `}</style>
    </div>
  )
}
