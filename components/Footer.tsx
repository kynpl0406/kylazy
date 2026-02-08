import React from 'react';
import { MapPin, Phone, Mail, Facebook, Youtube, Globe, GraduationCap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 mt-auto">
      {/* Decorative top gradient line */}
      <div className="w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-slate-800"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                Trường Đại Học Vinh
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Hệ thống giám sát mực nước và cảnh báo lũ lụt thời gian thực. 
              Ứng dụng công nghệ IoT để đảm bảo an toàn cho cộng đồng và cơ sở vật chất.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-slate-700 p-2 rounded-full text-slate-300 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-700 p-2 rounded-full text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="bg-slate-700 p-2 rounded-full text-slate-300 hover:bg-blue-400 hover:text-white transition-all duration-300">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Thông Tin Liên Hệ
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full translate-y-2"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-300 group">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm group-hover:text-white transition-colors">
                  182 Lê Duẩn, Thành phố Vinh, Tỉnh Nghệ An
                </span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 group">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm group-hover:text-white transition-colors">
                  (0238) 3855 452
                </span>
              </li>
              <li className="flex items-center gap-3 text-slate-300 group">
                <Mail className="w-5 h-5 text-blue-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                <a href="mailto:contact@vinhuni.edu.vn" className="text-sm hover:text-blue-400 transition-colors">
                  contact@vinhuni.edu.vn
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links / Support */}
          <div>
             <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Liên Kết Nhanh
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full translate-y-2"></span>
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-blue-400 hover:pl-1 transition-all duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Trang chủ Trường Đại Học Vinh
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 hover:pl-1 transition-all duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Cổng thông tin đào tạo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 hover:pl-1 transition-all duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Báo cáo sự cố kỹ thuật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 hover:pl-1 transition-all duration-200 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-slate-900 border-t border-slate-700 py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-slate-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} Vinh University. All rights reserved. Designed for Flood Monitoring Project.
          </p>
          <div className="flex gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;