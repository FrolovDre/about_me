import profile from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10 py-6 text-center text-xs uppercase tracking-[0.25em] text-white/50">
      <p>
        © {year} {profile.name}. {profile.ui.footerNote}
      </p>
    </footer>
  );
}
