const Footer = () => (
  <footer className="bg-[#001f3f] text-[#f5f5dc] py-8 mt-12">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <span className="font-bold text-lg">BookNest</span>
      </div>
      {/* <div className="flex gap-4">
        <a href="#" className="hover:text-[#ffd700] transition-colors">Home</a>
        <a href="#" className="hover:text-[#ffd700] transition-colors">Browse</a>
        <a href="#" className="hover:text-[#ffd700] transition-colors">About</a>
        <a href="#" className="hover:text-[#ffd700] transition-colors">Contact</a>
      </div> */}
      {/* <div className="flex gap-3">
        <a href="#" aria-label="Twitter" className="hover:text-[#ffd700] transition-colors text-xl">🐦</a>
        <a href="#" aria-label="GitHub" className="hover:text-[#ffd700] transition-colors text-xl">💻</a>
        <a href="#" aria-label="Instagram" className="hover:text-[#ffd700] transition-colors text-xl">📸</a>
      </div> */}
    </div>
    <div className="text-center text-xs text-[#f5f5dc] mt-6 opacity-80">
      © {new Date().getFullYear()} BookNest. All rights reserved.
    </div>
  </footer>
)

export default Footer