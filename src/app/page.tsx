import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <header id="header" className="relative h-screen overflow-hidden bg-black">
        <video id="banner-video" autoPlay loop muted className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 z-0 brightness-90 contrast-125 saturate-110">
          <source src="/file/banerhome.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 h-full w-full">
          <Navbar />
          <div className="mt-[140px] ml-[80px]">
            <p className="text-[20px] mb-[10px] text-white">Uncover the Perfect Build</p>
            <h1 className="text-[40px] font-cinzel leading-tight text-white">
              “Perfect Item Recommendations”
              <br />
              For Every Dota Hero
            </h1>
            <Link href="/hero" className="inline-block px-[22px] py-[12px] border-[3px] border-white rounded-[30px] text-[18px] no-underline text-white transition-all duration-250 hover:scale-105">
              Prepare for Battle
            </Link>
          </div>
        </div>
      </header>

      <section id="latest-news" className="px-[100px] py-[40px] bg-[#0f0f0f]">
        <div className="flex justify-between mb-[25px] text-accent-gold">
          <h2 className="font-cinzel">LATEST NEWS</h2>
          <a
            href="https://www.dota2.com/news"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-gold no-underline"
          >
            VIEW ALL →
          </a>
        </div>

        <div className="grid grid-cols-3 gap-[25px]">
          <div className="bg-[#141414] border border-[#222] rounded-[8px] overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:border-[#b22222]">
            <Image src="/file/dota2xmonsterhunter.jpeg" alt="dota2xmonsterhunter" width={400} height={225} className="w-full h-[180px] object-cover" />
            <div className="p-[15px]">
              <p className="text-[12px] text-[#aaa]">NOVEMBER 11, 2025</p>
              <h3 className="news-title font-cinzel">Dota x Monster Hunter</h3>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#222] rounded-[8px] overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:border-[#b22222]">
            <Image src="/file/dotacollector.jpeg" alt="dotacollector" width={400} height={225} className="w-full h-[180px] object-cover" />
            <div className="p-[15px]">
              <p className="text-[12px] text-[#aaa]">OCTOBER 8, 2025</p>
              <h3 className="news-title font-cinzel">Collector&apos;s Cache Voting Open Now</h3>
            </div>
          </div>

          <div className="bg-[#141414] border border-[#222] rounded-[8px] overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:border-[#b22222]">
            <Image src="/file/theinternational.jpeg" alt="theinternational" width={400} height={225} className="w-full h-[180px] object-cover" />
            <div className="p-[15px]">
              <p className="text-[12px] text-[#aaa]">SEPTEMBER 11, 2025</p>
              <h3 className="news-title font-cinzel">The International 2025 Grand Champions</h3>
            </div>
          </div>
        </div>
      </section>

      <div id="about" className="relative w-full py-[80px] overflow-hidden bg-black">
        <video autoPlay loop muted className="absolute top-0 left-1/2 w-full h-full object-cover object-[30%_18%] -translate-x-1/2 z-0 brightness-75">
          <source src="/file/windranger.mp4" type="video/mp4" />
        </video>

        <div id="join" className="relative z-10 ml-[100px] text-white">
          <h1 className="text-[48px] font-cinzel mb-[20px]">
            JOIN THE
            <br />
            BATTLE
          </h1>
          <div className="btnplay">
            <a
              href="https://store.steampowered.com/app/570/Dota_2/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-[20px] py-[10px] border-[3px] border-white rounded-[8px] text-white no-underline transition-all duration-300 hover:scale-105 inline-block"
            >
              Play Free Now
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
