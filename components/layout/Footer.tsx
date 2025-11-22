export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-zinc-500 text-sm">
          © {new Date().getFullYear()} AuraCV. Open Source.
        </p>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white text-sm transition-colors">
            GitHub
          </a>
          <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">
            Privacy
          </a>
          <a href="#" className="text-zinc-500 hover:text-white text-sm transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};
