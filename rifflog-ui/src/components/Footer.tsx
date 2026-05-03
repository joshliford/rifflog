export default function Footer() {
  return (
    <footer className="max-w-screen flex justify-center items-center gap-6 py-3 px-6 border-[#26262c] border-t bg-[#0b0b0c]">
      <p className="text-xs text-[#76766f]">
        Designed and developed by Josh Liford
      </p>
      <a
        href="https://github.com/joshliford"
        target="_blank"
        className="text-xs text-[#76766f] hover:cursor-pointer hover:text-[#ff6b35] transition-colors"
      >
        Github
      </a>
      <a
        href="https://joshliford.github.io/"
        target="_blank"
        className="text-xs text-[#76766f] hover:cursor-pointer hover:text-[#ff6b35] transition-colors"
      >
        Portfolio
      </a>
      <p className="text-xs text-[#76766f]">&copy; All Rights Reserved</p>
    </footer>
  );
}
