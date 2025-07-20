import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGoogle,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../assets/Logo/Logo-Full-Light.png"

const Footer = () => {
  return (
    <footer className="bg-richblack-800 text-richblack-300 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-sm">
        {/* Company */}
        <div>
          <div className="mb-4">
            <img src={logo} alt="StudyNotionImg" className="h-8" />
          </div>
          <p className="font-bold mb-2 text-base">Company</p>
          <ul className="space-y-1 text-sm font-normal">
            <li><Link to="#" className="transition duration-300 hover:text-white">About</Link></li>
            <li><Link to="#" className="transition duration-300 hover:text-white">Careers</Link></li>
            <li><Link to="#" className="transition duration-300 hover:text-white">Affiliates</Link></li>
          </ul>
          <div className="flex gap-3 mt-3 text-xl">
            <FaFacebookF className="hover:text-blue-500 cursor-pointer transition duration-300" />
            <FaGoogle className="hover:text-blue-500 cursor-pointer transition duration-300" />
            <FaTwitter className="hover:text-blue-500 cursor-pointer transition duration-300" />
            <FaYoutube className="hover:text-blue-500 cursor-pointer transition duration-300" />
          </div>
        </div>

        {/* Resources */}
        <div>
          <p className="font-bold mb-2 text-base">Resources</p>
          <ul className="space-y-1 text-sm font-normal">
            {["Articles", "Blog", "Chart Sheet", "Code challenges", "Docs", "Projects", "Videos", "Workspaces"].map(item => (
              <li key={item}><Link to="#" className="transition duration-300 hover:text-white">{item}</Link></li>
            ))}
          </ul>
        </div>

        {/* Plans + Community */}
        <div>
          <p className="font-bold mb-2 text-base">Plans</p>
          <ul className="space-y-1 text-sm font-normal">
            {["Paid memberships", "For students", "Business solutions"].map(item => (
              <li key={item}><Link to="#" className="transition duration-300 hover:text-white">{item}</Link></li>
            ))}
          </ul>
          <p className="font-bold mt-4 mb-2 text-base">Community</p>
          <ul className="space-y-1 text-sm font-normal">
            {["Forums", "Chapters", "Events"].map(item => (
              <li key={item}><Link to="#" className="transition duration-300 hover:text-white">{item}</Link></li>
            ))}
          </ul>
        </div>

        {/* Subjects */}
        <div>
          <p className="font-bold mb-2 text-base">Subjects</p>
          <ul className="space-y-1 text-sm font-normal">
            {[
              "AI", "Cloud Computing", "Code Foundations", "Computer Science", "Cybersecurity",
              "Data Analytics", "Data Science", "Data Visualization", "Developer Tools", "DevOps",
              "Game Development", "IT", "Machine Learning", "Math", "Mobile Development",
              "Web Design", "Web Development"
            ].map(item => (
              <li key={item}><Link to="#" className="transition duration-300 hover:text-white">{item}</Link></li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div>
          <p className="font-bold mb-2 text-base">Languages</p>
          <ul className="space-y-1 text-sm font-normal">
            {[
              "Bash", "C", "C++", "C#", "Go", "HTML & CSS", "Java", "JavaScript",
              "Kotlin", "PHP", "Python", "R", "Ruby", "SQL", "Swift"
            ].map(lang => (
              <li key={lang}><Link to="#" className="transition duration-300 hover:text-white">{lang}</Link></li>
            ))}
          </ul>
        </div>

        {/* Career building */}
        <div>
          <p className="font-bold mb-2 text-base">Career building</p>
          <ul className="space-y-1 text-sm font-normal">
            {[
              "Career paths", "Career services", "Interview prep",
              "Professional certification", "-", "Full Catalog", "Beta Content"
            ].map(career => (
              <li key={career}><Link to="#" className="transition duration-300 hover:text-white">{career}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <div className="space-x-3 mb-2 md:mb-0 font-normal">
          <Link to="#" className="hover:text-white transition duration-300">Privacy Policy</Link>
          <span>|</span>
          <Link to="#" className="hover:text-white transition duration-300">Cookie Policy</Link>
          <span>|</span>
          <Link to="#" className="hover:text-white transition duration-300">Terms</Link>
        </div>
        <div>
          Made with <span className="text-red-500">❤️</span> Sourabh © 2025 StudyNotion
        </div>
      </div>
    </footer>
  );
};

export default Footer;
