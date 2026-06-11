import { lazy, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import { SocialIcon } from '../ui/Icons';
import { profile, socials } from '../../data/portfolio';

const ParticleField = lazy(() => import('../three/ParticleField'));

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: ContactForm = { name: '', email: '', message: '' };

function Contact(): React.JSX.Element {
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [sent, setSent] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputClasses =
    'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-primary focus:shadow-glow-primary';

  return (
    <SectionWrapper id="contact">
      {/* Background particle field */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true }}>
            <ParticleField count={1400} color="#7c3aed" radius={7} />
          </Canvas>
        </Suspense>
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <span className="font-mono text-sm uppercase tracking-[0.3em] text-primary">
          06 / Contact
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Let&apos;s <span className="gradient-text">build</span> something
        </h2>
        <p className="mt-4 text-slate-400">
          Have a project in mind or just want to say hi? Drop a message.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="glass mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-400">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-400">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            className={`${inputClasses} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-gradient-to-r from-primary to-secondary px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wider text-dark shadow-glow-primary transition-transform hover:scale-[1.02]"
        >
          {sent ? 'Opening your mail client…' : 'Send Message'}
        </button>
      </motion.form>

      {/* Socials */}
      <div className="mt-10 flex items-center justify-center gap-5">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-primary hover:text-primary hover:shadow-glow-primary"
          >
            <SocialIcon icon={social.icon} className="h-5 w-5 transition-transform group-hover:scale-110" />
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default Contact;
