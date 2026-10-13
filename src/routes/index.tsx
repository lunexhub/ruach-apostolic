import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, CheckCircle2, Church, Feather, LockKeyhole, MessageCircle, ShieldCheck, UserRound, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { registrationSchema, whatsappUrl, type Registration } from '@/lib/registration-schema';
import eagle from '@/assets/eagle.png';
import logo from '@/assets/logo.png';
import socialImg from '@/assets/ruach-social.png';

// Use direct path for social share image
const shareImageUrl = socialImg;

export const Route = createFileRoute('/')({
 head: () => ({ meta: [
  { title: 'Course Registration | Ruach Apostolic & Prophetic Training School' },
  { name: 'description', content: 'Register for Ruach Apostolic & Prophetic Training School. Where Eagles shall Sow Prophetic School.' },
  { property: 'og:title', content: 'Ruach Apostolic & Prophetic Training School — Registration' },
  { property: 'og:description', content: 'Register for the prophetic training course and connect with the school on WhatsApp.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
  { property: 'og:image', content: shareImageUrl },
  { property: 'og:image:type', content: 'image/png' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:image:alt', content: 'Ruach Apostolic & Prophetic Training School bird logo' },
  { name: 'twitter:image', content: shareImageUrl },
 ] }), component: Index,
});

function Index() {
 const [savedUrl, setSavedUrl] = useState('');
 const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<Registration>({ resolver: zodResolver(registrationSchema), defaultValues: { reason: '' } });
 const reason = watch('reason') || '';
 async function onSubmit(data: Registration) {
  // Open WhatsApp directly - no server call needed
  const tab = window.open('about:blank', '_blank');
  if (tab) tab.opener = null;
  
  const url = whatsappUrl(data);
  setSavedUrl(url);
  if (tab) tab.location.href = url;
 }
 function field(key: keyof Registration, label: string, placeholder: string, type = 'text', wide = false) {
  return <div className={`field ${wide ? 'field-wide' : ''}`}><label htmlFor={key}>{label} <span className="required-star">*</span></label><input id={key} type={type} placeholder={placeholder} {...register(key)} maxLength={key === 'address' ? 500 : key === 'email' ? 255 : key === 'phone' ? 25 : key === 'church_name' || key === 'gifting' ? 200 : 100} autoComplete={key === 'name' ? 'given-name' : key === 'surname' ? 'family-name' : key === 'dob' ? 'bday' : key === 'email' ? 'email' : key === 'phone' ? 'tel' : key === 'address' ? 'street-address' : 'off'} aria-required="true" aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} />{errors[key] && <p className="field-error" id={`${key}-error`}>{errors[key]?.message}</p>}</div>;
 }
 return <>
  <header className="site-header"><a className="brand" href="/" aria-label="Ruach home"><img src={logo} width={42} height={42} alt="Ruach bird logo"/><div><div className="brand-name">RUACH</div><div className="brand-sub">Apostolic & Prophetic</div></div></a><div className="header-note"><Feather size={14}/> A calling. A purpose. A new beginning.</div></header>
  <section className="hero"><img className="hero-image" src={eagle} width={1536} height={1024} alt="An eagle soaring above green mountains at sunrise"/><div className="hero-content"><div className="eyebrow">Prophetic School</div><h1>Ruach Apostolic &<br/>Prophetic Training School</h1><p className="hero-tagline">Where Eagles shall Sow Prophetic School</p><div className="hero-label"><Feather size={14}/> Course registration</div></div></section>
  <main className="main-layout">
   <aside className="sidebar"><div className="sidebar-eyebrow">Your next chapter</div><h2>Answer the calling.<br/>Begin your journey.</h2><div className="section-index"><span className="index-number">01</span> Personal information</div><div className="section-index"><span className="index-number">02</span> Contact details</div><div className="section-index"><span className="index-number">03</span> Church & calling</div><div className="sidebar-bottom">Have a question?<br/>Connect with the school.<a href="https://wa.me/27780296688" target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> 078 029 6688 <ArrowUpRight size={13}/></a></div></aside>
   <div><div className="form-heading"><h2>Course registration</h2><span className="required-note"><span className="required-star">*</span> Required fields</span></div>
    {savedUrl ? <section className="success" role="status"><CheckCircle2 className="text-primary" size={30}/><h3>Your registration is saved.</h3><p>Complete your registration by sending the prepared message to the school on WhatsApp.</p><Button asChild className="submit-button"><a href={savedUrl} target="_blank" rel="noopener noreferrer"><MessageCircle/> Continue to WhatsApp <ArrowUpRight/></a></Button></section> : <form onSubmit={handleSubmit(onSubmit)} noValidate>
     <fieldset className="form-section"><legend><UserRound/> Personal information</legend><div className="field-grid">{field('name','Name','Your first name')}{field('surname','Surname','Your surname')}{field('dob','Date of birth','','date')}</div></fieldset>
     <fieldset className="form-section"><legend><MessageCircle/> Contact details</legend><div className="field-grid">{field('email','Email address','you@example.com','email')}{field('phone','Phone number','e.g. 082 123 4567','tel')}{field('address','Address','Street address, suburb, city and postal code','text',true)}</div></fieldset>
     <fieldset className="form-section"><legend><Church/> Church & calling</legend><div className="field-grid">{field('church_name','Church name','Your home church')}{field('gifting','Area of gifting','Your spiritual gifting')}<div className="field field-wide"><label htmlFor="reason">Reason for attending the course <span className="required-star">*</span></label><textarea id="reason" {...register('reason')} maxLength={2000} placeholder="Share what has inspired you to attend this course…" aria-required="true" aria-invalid={Boolean(errors.reason)} aria-describedby={errors.reason ? 'reason-error' : undefined}/>{errors.reason && <p className="field-error" id="reason-error">{errors.reason.message}</p>}<div className="character-count">{reason.length} / 2000</div></div></div></fieldset>
     <div className="submit-area"><Button type="submit" disabled={isSubmitting} className="submit-button">{isSubmitting ? <LoaderCircle className="animate-spin"/> : <MessageCircle/>}{isSubmitting ? 'Opening WhatsApp…' : 'Register via WhatsApp'}{!isSubmitting && <ArrowUpRight/>}</Button><div className="privacy-note"><LockKeyhole size={11}/> Opens WhatsApp with your registration details pre-filled.</div></div>
    </form>}
   </div>
  </main><footer className="site-footer"><span>© 2026 Ruach Apostolic & Prophetic Training School</span><span className="flex items-center gap-1.5"><ShieldCheck size={12}/> Faith. Purpose. Calling.</span></footer>
 </>;
}
