"use client";

import { Mail, MessageSquare, Twitter, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 sm:pt-32 px-4 sm:px-6 pb-12 sm:pb-20">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get <span className="font-museo">in Touch</span></h1>
          <p className="text-gray-400 text-base sm:text-lg font-museo">
            Ready to launch on Solana? Let&apos;s talk about your project
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Email */}
          <a
            href="mailto:contact@xcombinator.com"
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all text-center">
              <Mail className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-400 text-xs sm:text-sm">contact@xcombinator.com</p>
            </div>
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/xcombinator"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all text-center">
              <Twitter className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Twitter/X</h3>
              <p className="text-gray-400 text-xs sm:text-sm">@xCombinator</p>
            </div>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/xcombinator"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-blue-300/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all text-center">
              <Send className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Telegram</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Join our community</p>
            </div>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/xcombinator"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all text-center">
              <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-indigo-400" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Discord</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Chat with the team</p>
            </div>
          </a>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-museo">Ready to Launch?</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Whether you&apos;re planning a token launch, building a dApp, or need guidance on Solana development, our team is here to help you succeed.
          </p>
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all font-medium text-base sm:text-lg">
            Schedule a Call
          </button>
        </div>
      </div>
    </div>
  );
}