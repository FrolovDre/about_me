import profile from '../data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm">
      <p>
        © {year} {profile.name}. {profile.ui.footerNote}
      </p>
    </footer>
  );
}
