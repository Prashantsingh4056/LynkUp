import { useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    // Background remains your exact Brand Lime (#D2E823) | Core Text remains Deep Forest Green (#1E3916)
    <section className="flex flex-col items-center min-h-screen bg-[#D2E823] text-[#1E3916] font-sans selection:bg-[#7C3AED] selection:text-white overflow-x-hidden">
      
      {/* Clean Floating Navbar with subtle contrast borders */}
      <nav className="w-full px-4 md:px-16 lg:px-24 xl:px-32 pt-6 sticky top-0 z-50">
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-full shadow-md w-full border border-[#1E3916]/10">
            <Link to="/" className="text-2xl font-black tracking-tight text-[#1E3916]">LynkUp<span className="text-[#7C3AED]">*</span></Link>
            
            {/* Mobile Nav Menu */}
            <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-white max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm font-bold`}>
                <a href="#features" onClick={() => setMobileOpen(false)} className="text-[#1E3916]/80 hover:text-[#7C3AED] transition">Products</a>
                <a href="#templates" onClick={() => setMobileOpen(false)} className="text-[#1E3916]/80 hover:text-[#7C3AED] transition">Templates</a>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="md:hidden text-[#1E3916]/80 hover:text-[#7C3AED] transition">Log in</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="md:hidden text-white px-5 py-2.5 bg-[#7C3AED] rounded-full text-center">Sign up free</Link>

                <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-[#1E3916] text-[#D2E823] p-2 rounded-full aspect-square font-medium transition cursor-pointer">
                    <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
            
            {/* Desktop Account Controls */}
            <div className="hidden md:flex items-center gap-4">
                <Link to='/login' className="active:scale-95 hover:bg-[#1E3916]/5 transition px-5 py-2.5 bg-[#f3f4f1] rounded-full text-[#1E3916] font-bold cursor-pointer text-sm">
                    Log in
                </Link>
                {/* Contrast Nav Accent Button */}
                <Link to="/signup" className="text-white px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-95 transition rounded-full font-bold shadow-md shadow-[#7C3AED]/20 cursor-pointer text-sm">
                    Sign up free
                </Link>
            </div>
            
            <button id="open-menu" onClick={() => setMobileOpen(true)}
                className="md:hidden bg-[#f3f4f1] text-[#1E3916] p-2.5 rounded-full aspect-square font-medium transition cursor-pointer">
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M4 12h16" /> <path d="M4 18h16" /> <path d="M4 6h16" /> </svg>
            </button>
        </div>
      </nav>
      
      {/* Decorative Tag */}
      <div className="flex items-center gap-1.5 border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#6D28D9] rounded-full px-4 py-1.5 text-xs mt-16 md:mt-24 font-bold tracking-wide uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span>
        Portfolio MVP Feature Set
      </div>

      {/* Headline with striking gradient to rich purple/violet split */}
      <h1 className="text-center text-[#1E3916] text-5xl md:text-7xl font-black max-w-4xl leading-[1.05] tracking-tight my-6 px-4">
        A link in bio <br className="hidden sm:inline" /> built for <span className="bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">you.</span>
      </h1>
      
      <p className="text-center text-base md:text-lg text-[#1E3916]/90 max-w-xl px-4 leading-relaxed font-bold">
        Join developers and creators using LynkUp for their link in bio. One link to help you share everything you create, curate, and deploy across the web.
      </p>
      
      {/* URL Claim Form Block */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 justify-center w-full max-w-lg px-4">
        <div className="relative w-full shadow-sm rounded-xl overflow-hidden border border-[#1E3916]/20 bg-white">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#1E3916]/40">lynkup.ee/</span>
          <input 
            type="text" 
            placeholder="username" 
            className="w-full bg-transparent text-[#1E3916] font-bold pl-[84px] pr-4 py-4 rounded-xl text-sm focus:outline-hidden"
          />
        </div>
        {/* Main CTA upgraded to high-contrast Purple Violet */}
        <Link to="/signup" className="w-full sm:w-auto text-center whitespace-nowrap bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black px-6 py-4 rounded-xl shadow-lg shadow-[#7C3AED]/30 active:scale-98 transition cursor-pointer text-sm">
          Get started for free
        </Link>
      </div>

      {/* Bottom Mock Mobile Canvas Sandbox */}
      <div className="relative mt-16 w-full max-w-4xl px-4 mb-20">
        {/* Soft underlying shadow aura */}
        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-[#7C3AED]/10 blur-[100px] z-0 rounded-full"></div>

        <div className="relative z-1 w-full border border-[#1E3916]/20 bg-[#1E3916] rounded-4xl shadow-2xl p-6 md:p-10 max-w-sm mx-auto flex flex-col items-center min-h-[440px]">
          
          {/* Avatar Area */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#EC4899] text-white font-black text-xl flex items-center justify-center shadow-md mb-3">
            LU
          </div>
          
          <p className="text-sm font-black text-[#D2E823] mb-1">@yourname</p>
          <p className="text-center text-xs text-[#D2E823]/80 px-4 mb-8 font-bold">Fullstack Software Developer</p>
          
          {/* Balanced interactive stack linking contrasting styles */}
          <div className="w-full space-y-3">
            <div className="w-full py-4 px-6 bg-white rounded-xl text-center text-xs font-black text-[#1E3916] border border-b-4 border-[#1E3916] transform hover:translate-y-[2px] hover:border-b-2 transition-all cursor-pointer">
              🚀 Explore My Projects Hub
            </div>
            <div className="w-full py-4 px-6 bg-white rounded-xl text-center text-xs font-black text-[#1E3916] border border-b-4 border-[#1E3916] transform hover:translate-y-[2px] hover:border-b-2 transition-all cursor-pointer">
              📦 Check Out My GitHub Repos
            </div>
            <div className="w-full py-4 px-6 bg-white text-[#1E3916] rounded-xl text-center text-xs font-black  border border-b-4 border-[#1E3916] transform hover:translate-y-[2px] hover:border-b-2 transition-all cursor-pointer">
              💼 Connect on LinkedIn
            </div>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default Home
