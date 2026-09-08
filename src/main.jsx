import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);
const media = '/media/';
const whatsappNumber = '923205733063';
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello%20The%20Royal%20Trim%2C%20I%27d%20like%20to%20book%20an%20appointment.`;
const services = [
  { name: 'Signature Haircut', price: '2,500/-', detail: 'Consultation, cut, wash and finish', image: 'generated-4k/royal-service-4k.jpg' },
  { name: 'Dermacose Facial', price: '3,500/-', detail: 'Deep cleansing and skin reset', image: 'generated-4k/royal-treatment-4k.jpg' },
  { name: 'Keratin Treatment', price: '8,000/-', detail: 'Smooth, silky finish for short hair', image: 'generated-4k/royal-chair-4k.jpg' },
  { name: 'Premium Hair Color', price: '3,500/-', detail: 'Professional color with service care', image: 'generated-4k/royal-studio-4k.jpg' },
  { name: 'Manicure', price: '800/-', detail: 'Hand polish, shaping and care', image: 'generated-4k/royal-manicure-4k.jpg' },
  { name: 'Pedicure', price: '1,800/-', detail: 'Foot polish, shaping and care', image: 'generated-4k/royal-pedicure-4k.jpg' },
  { name: 'Nail Trimming', price: '400/-', detail: 'Clean, precise hand grooming', image: 'generated-4k/royal-nails-4k.jpg' },
  { name: 'Hand Polish', price: '800/-', detail: 'A clean, polished finish for hands', image: 'generated-4k/royal-manicure-4k.jpg' },
  { name: 'Feet Polish', price: '1,200/-', detail: 'Careful shaping and polished finish', image: 'generated-4k/royal-pedicure-4k.jpg' },
  { name: 'Pedicure & Massage', price: '1,500/-', detail: 'Foot care with a restorative massage', image: 'generated-4k/royal-massage-4k.jpg' },
  { name: 'Ultimate Care Combo', price: '3,500/-', detail: 'Manicure, pedicure, polish and massage', image: 'generated-4k/royal-manicure-4k.jpg' },
];
const featuredServices = services.slice(0, 4);
const gallery = [
  ['generated-4k/royal-studio-4k.jpg', 'The house'], ['generated-4k/royal-chair-4k.jpg', 'The studio'], ['generated-4k/royal-treatment-4k.jpg', 'The skin room'],
  ['generated-4k/royal-storefront-4k.jpg', 'The street view'], ['generated-4k/royal-service-4k.jpg', 'The craft'],
];
const videos = [
  'WhatsApp Video 2026-09-08 at 12.03.00 PM.mp4', 'WhatsApp Video 2026-09-08 at 12.03.01 PM (1).mp4',
  'WhatsApp Video 2026-09-08 at 12.03.01 PM.mp4', 'WhatsApp Video 2026-09-08 at 12.03.02 PM (1).mp4',
  'WhatsApp Video 2026-09-08 at 12.03.02 PM (2).mp4', 'WhatsApp Video 2026-09-08 at 12.03.02 PM.mp4',
  'WhatsApp Video 2026-09-08 at 12.03.03 PM (1).mp4', 'WhatsApp Video 2026-09-08 at 12.03.03 PM.mp4',
];

function BrandMark({ compact = false }) {
  return <div className={`brand-mark ${compact ? 'brand-mark--compact' : ''}`} aria-label="The Royal Trim"><span className="brand-crown">♛</span><span className="brand-scissors">✂</span>{!compact && <span className="brand-ribbon">EST. 2024</span>}</div>;
}

function ParticleField() {
  const mount = useRef(null);
  useEffect(() => {
    const el = mount.current; const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(50, el.clientWidth / el.clientHeight, 0.1, 100); camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6)); renderer.setSize(el.clientWidth, el.clientHeight); el.appendChild(renderer.domElement);
    const points = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i += 1) { const radius = 2.2 + Math.random() * 2.7; const angle = Math.random() * Math.PI * 2; points[i * 3] = Math.cos(angle) * radius * (0.45 + Math.random() * 0.7); points[i * 3 + 1] = (Math.random() - 0.5) * 4.5; points[i * 3 + 2] = (Math.random() - 0.5) * 2.2; }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.BufferAttribute(points, 3)); const material = new THREE.PointsMaterial({ color: 0xb98b45, size: 0.018, transparent: true, opacity: 0.48 }); const stars = new THREE.Points(geometry, material); scene.add(stars);
    let frame; const tick = () => { stars.rotation.y += 0.0008; stars.rotation.x = Math.sin(Date.now() * 0.00025) * 0.08; renderer.render(scene, camera); frame = requestAnimationFrame(tick); }; tick();
    const resize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); }; window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); renderer.dispose(); geometry.dispose(); material.dispose(); el.removeChild(renderer.domElement); };
  }, []);
  return <div className="particle-field" ref={mount} aria-hidden="true" />;
}

function BookingModal({ service, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: service || 'Signature Haircut', date: '', time: '' });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const message = `Hello The Royal Trim, I would like to book an appointment.%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0AService: ${encodeURIComponent(form.service)}%0APreferred date: ${encodeURIComponent(form.date)}%0APreferred time: ${encodeURIComponent(form.time)}`;
    setSubmitted(true);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" type="button" onClick={onClose} aria-label="Close booking form">×</button>{submitted ? <div className="booking-success"><p className="eyebrow">Message prepared</p><h2>See you<br /><em>in the chair.</em></h2><p>Your booking details are ready in WhatsApp. Send the message to finish your request.</p><button className="button button--gold" type="button" onClick={onClose}>Done</button></div> : <><p className="eyebrow">Your appointment</p><h2 id="booking-title">Reserve your<br /><em>royal hour.</em></h2><form onSubmit={submit}><label>Name<input name="name" value={form.name} onChange={update} required placeholder="Your name" /></label><label>Phone<input name="phone" value={form.phone} onChange={update} required placeholder="03XX XXXXXXX" /></label><label>Service<select name="service" value={form.service} onChange={update}>{services.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><div className="form-grid"><label>Date<input name="date" type="date" value={form.date} onChange={update} required /></label><label>Time<input name="time" type="time" value={form.time} onChange={update} required /></label></div><button className="button button--gold" type="submit">Continue to WhatsApp <span>↗</span></button></form></>}</div></div>;
}

function MenuPage({ onBook, onHome }) {
  const menuGroups = [
    { title: 'Hair & Styling', image: '4k/2.jpg', items: [['Fade Hair Cut', '1,000/-'], ['Standard Hair Cut', '800/-'], ['Long Length Hair Cut', '1,800/-'], ['Signature Haircut', '2,500/-'], ['Neck Round', '300/-']] },
    { title: 'Facials & Skin Care', image: '4k/3.jpg', items: [['Dermacose Facial', '3,500/-'], ['Derma Clear Facial', '4,500/-'], ['S B Facial', '5,500/-'], ['Natural Life Facial', '7,000/-'], ['Janssen Facial', '12,000/-'], ['Skin Polish', '1,000/-']] },
    { title: 'Keratin & Treatments', image: '4k/whatsapp-image-2026-09-08-at-12-02-58-pm.jpg', items: [['Protein Treatment, short length', '2,500/-'], ['Premium Protein Treatment', '4,000/-'], ['Keratin Treatment, short hair', '8,000/-'], ['Premium Keratin, medium hair', '12,000/-'], ['Luxury Keratin, long hair', '15,000/-'], ['Rebounding, normal length', '10,000/-']] },
    { title: 'Color & Care', image: '4k/whatsapp-image-2026-09-08-at-12-02-57-pm.jpg', items: [['L’Oreal Hair Color', '3,500/-'], ['Just For Men', '3,000/-'], ['Keune Hair Color', '2,000/-'], ['Garnier Hair Color', '2,000/-'], ['Service Charges Head', '1,000/-'], ['Service Charges Beard', '800/-']] },
    { title: 'Hands, Feet & Combos', image: '4k/6.jpg', items: [['Manicure', '800/-'], ['Pedicure', '1,800/-'], ['Nail Trimming (hands only)', '400/-'], ['Nail Trimming (feet only)', '500/-'], ['Hand Polish', '800/-'], ['Feet Polish', '1,200/-'], ['Pedicure / Massage', '1,500/-'], ['Ultimate Care Combo', '3,500/-']] },
    { title: 'Occasions & Complete Care', image: '4k/4.jpg', items: [['Engagement Makeup', '2,500/-'], ['Engagement Hairstyle', '500/-'], ['Groom Hair / Makeup', '4,000/-'], ['Party Makeup', '2,000/-'], ['Day Makeup', '1,500/-'], ['Evening Makeup', '2,000/-'], ['Ultimate Care Combo', '3,500/-']] },
  ];
  return <div className="menu-page"><header className="topbar"><button className="back-link" type="button" onClick={onHome}>← Back to home</button><a className="wordmark" href="#menu-top"><BrandMark compact /><span>THE ROYAL TRIM</span></a><button className="nav-cta" type="button" onClick={() => onBook()}>Book now <span>↗</span></button></header><main id="menu-top"><section className="menu-hero"><p className="eyebrow">The Royal Trim · Full menu</p><h1>Every detail.<br /><em>Considered.</em></h1><p>Our complete treatment menu, curated around the way you want to look and feel.</p></section><section className="menu-groups">{menuGroups.map((group) => <article className="menu-group" key={group.title}><div className="menu-group-image"><img src={`${media}${group.image}`} alt="" /></div><div className="menu-group-copy"><p className="eyebrow">The menu</p><h2>{group.title}</h2><div className="menu-items">{group.items.map(([name, price]) => <button type="button" key={name} onClick={() => onBook(name)}><span>{name}</span><strong>Rs. {price}</strong><i>↗</i></button>)}</div></div></article>)}</section><section className="menu-footer-cta"><p className="eyebrow">Not sure what to choose?</p><h2>Tell us what<br /><em>you have in mind.</em></h2><button className="button button--gold" type="button" onClick={() => onBook()}>Talk to the team <span>↗</span></button></section></main></div>;
}

function App() {
  const app = useRef(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingService, setBookingService] = useState('');
  const [route, setRoute] = useState(window.location.pathname);
  const openBooking = (service = '') => { setBookingService(service); setBookingOpen(true); };
  const openMenu = (event) => { event?.preventDefault(); window.history.pushState({}, '', '/menu'); setRoute('/menu'); window.scrollTo(0, 0); };
  const goHome = () => { window.history.pushState({}, '', '/'); setRoute('/'); window.scrollTo(0, 0); };
  useEffect(() => { const pop = () => setRoute(window.location.pathname); window.addEventListener('popstate', pop); return () => window.removeEventListener('popstate', pop); }, []);
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.hero-copy > *', { y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.2 }); gsap.utils.toArray('.reveal').forEach((item) => gsap.from(item, { y: 36, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 82%' } })); }, app); return () => ctx.revert(); }, []);
  if (route === '/menu') return <><MenuPage onBook={openBooking} onHome={goHome} />{bookingOpen && <BookingModal service={bookingService} onClose={() => setBookingOpen(false)} />}</>;
  return <div className="site-shell" ref={app}>
    <header className="topbar"><a className="wordmark" href="#top"><BrandMark compact /><span>THE ROYAL TRIM</span></a><nav><a href="#services">Services</a><a href="#experience">Experience</a><a href="#gallery">Gallery</a></nav><button className="nav-cta" type="button" onClick={() => openBooking()}>Book now <span>↗</span></button></header>
    <main id="top">
      <section className="hero hero--editorial"><ParticleField /><div className="hero-copy"><p className="eyebrow">Premium men&apos;s salon · Peshawar</p><h1>Sharp cuts.<br /><em>Royal confidence.</em></h1><p className="hero-lede">Premium grooming crafted for the modern man.</p><div className="hero-actions"><button className="button button--gold" type="button" onClick={() => openBooking()}>Book appointment <span>↗</span></button><a className="text-link" href="#services">Our services <span>↗</span></a></div></div><div className="hero-media"><img src={`${media}generated-4k/royal-studio-4k.jpg`} alt="Luxury Royal Trim reception and barber studio" /><div className="hero-media-overlay"><BrandMark /><span>Hair · Skin · Style</span></div><div className="hero-side-label">The house of grooming</div></div><div className="hero-feature-strip"><div><span>✧</span><strong>Skilled barbers</strong><small>Expert cuts and styling</small></div><div><span>◇</span><strong>Premium products</strong><small>Carefully chosen for you</small></div><div><span>□</span><strong>Clean &amp; safe</strong><small>Fresh tools, every service</small></div></div></section>
      <section className="service-rail reveal"><div className="rail-intro"><p className="eyebrow">What we do</p><h2>Our<br /><em>services.</em></h2><button className="text-link" type="button" onClick={openMenu}>View all services <span>↗</span></button></div>{featuredServices.map((service) => <button className="rail-service" type="button" onClick={() => openBooking(service.name)} key={service.name}><img src={`${media}${service.image}`} alt="" /><strong>{service.name}</strong><small>{service.detail}</small><span>↗</span></button>)}</section>
      <section className="manifesto reveal" id="experience"><div className="manifesto-visual"><img src={`${media}generated-4k/royal-studio-4k.jpg`} alt="The Royal Trim reception and client lounge" /><div className="manifesto-seal"><BrandMark compact /><span>Made in<br />Peshawar</span></div><p>Inside the house · 01</p></div><div className="manifesto-story"><p className="eyebrow">The Royal Standard</p><h2>Made for the way<br /><em>you want to look.</em></h2><p>From the first warm welcome to the final mirror check, every detail is designed around you. Skilled hands, premium products, and a space that lets you settle in.</p><div className="manifesto-line"><span>01 — Skill</span><span>02 — Care</span><span>03 — Style</span><span>04 — Time well spent</span></div></div></section>
      <section className="services-section" id="services"><div className="section-head reveal"><div><p className="eyebrow">The menu</p><h2>Services with<br /><em>presence.</em></h2></div><p>Choose your ritual. We&apos;ll take care of the rest.</p></div><div className="service-list">{services.map((service, i) => <button className="service-row reveal" type="button" onClick={() => openBooking(service.name)} key={service.name}><span className="service-index">0{i + 1}</span><img src={`${media}${service.image}`} alt="" /><span className="service-name"><strong>{service.name}</strong><small>{service.detail}</small></span><span className="service-price">Rs. {service.price}</span><span className="service-arrow">↗</span></button>)}</div><button className="menu-link" type="button" onClick={openMenu}>View full price menu <span>↗</span></button></section>
      <section className="packages-section reveal"><div className="section-head"><div><p className="eyebrow">Our packages</p><h2>Pick your<br /><em>standard.</em></h2></div><p>A considered edit of the essentials, for every kind of day.</p></div><div className="package-grid">{[['Basic Grooming','599/-',['Haircut & styling','Beard trim','Basic face wash'],'generated-4k/royal-chair-4k.jpg'],['Premium Grooming','999/-',['Haircut & styling','Beard trim & shape up','Face wash & moisturizer'],'generated-4k/royal-service-4k.jpg'],['Ultimate Grooming','1,499/-',['Haircut & styling','Beard trim & shape up','Face wash & skin care','Head massage'],'generated-4k/royal-treatment-4k.jpg']].map(([name, price, items, image], i) => <article className={`package-card ${i === 1 ? 'package-card--featured' : ''}`} key={name}><img className="package-image" src={`${media}${image}`} alt={`${name} at The Royal Trim`} /><div className="package-card-copy"><p className="eyebrow">{i === 1 ? 'Most popular' : `Package 0${i + 1}`}</p><h3>{name}</h3><div className="package-price">Rs. {price}</div><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul><button className="button" type="button" onClick={() => openBooking(name)}>Book now <span>↗</span></button></div></article>)}</div></section>
      <section className="reel-section reveal"><div className="reel-heading"><div><p className="eyebrow">In the chair · Films 01—04</p><h2>The ritual,<br /><em>in motion.</em></h2></div><p>Step inside the studio. Watch the craft, the concentration, and the final details come together.</p></div><div className="video-reel">{videos.slice(0, 4).map((video, index) => <figure className={`reel-film reel-film--${index + 1}`} key={video}><video src={`${media}${video}`} autoPlay muted loop playsInline /><figcaption><span>0{index + 1}</span>{['The consultation', 'Precision work', 'Finishing detail', 'The reveal'][index]}</figcaption></figure>)}</div></section>
      <section className="gallery-section" id="gallery"><div className="section-head reveal"><div><p className="eyebrow">The space</p><h2>Come as you are.<br /><em>Leave unmistakable.</em></h2></div><p>A studio with the warmth of a welcome and the edge of a sharp finish.</p></div><div className="gallery-grid">{gallery.map(([src, label], i) => <figure className={`gallery-item gallery-item--${i + 1} reveal`} key={src}><img src={`${media}${src}`} alt={label} /><figcaption>{label}</figcaption></figure>)}</div></section>
      <section className="testimonials reveal"><p className="eyebrow">What our clients say</p><div className="quote-mark">“</div><blockquote>“A great service, premium products, and perfect attention to detail.”</blockquote><cite>Arjun Mehta · Regular client</cite></section>
      <section className="closing-cta reveal"><BrandMark /><p className="eyebrow">Your chair is waiting</p><h2>Make an entrance<br /><em>worth remembering.</em></h2><button className="button button--gold" type="button" onClick={() => openBooking()}>Start your booking <span>↗</span></button></section>
    </main>
    <footer><a className="wordmark" href="#top"><BrandMark compact /><span>THE ROYAL TRIM</span></a><p>Premium men&apos;s grooming, Peshawar.</p><div><button type="button" onClick={openMenu}>Full menu</button><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a><a href="#gallery">Instagram</a></div></footer><a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat with The Royal Trim on WhatsApp"><span>◌</span><b>Chat with us</b></a>{bookingOpen && <BookingModal service={bookingService} onClose={() => setBookingOpen(false)} />}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
