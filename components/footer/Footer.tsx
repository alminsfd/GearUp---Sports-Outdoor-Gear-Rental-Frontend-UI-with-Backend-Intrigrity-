import Link from 'next/link';
import {
     ShieldCheck,
     MapPin,
     Mail,
     ArrowUpRight,
     Zap,
     ArrowRight,
} from 'lucide-react';

import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
     return (
          <footer className="w-full px-4 py-8 md:px-8">
               {/* Container with Modern Rounded Glass Shell */}
               <div className="glass-panel relative overflow-hidden rounded-[2.5rem] bg-card/80 p-8 md:p-12 shadow-2xl border border-border/80">

                    {/* Decorative Background Accent Glows */}
                    <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />

                    <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">

                         {/* Column 1: Brand & Identity (4 Cols) */}
                         <div className="space-y-6 lg:col-span-4">
                              <Link href="/" className="inline-flex items-center gap-2.5">
                                   <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                        <Zap className="h-5 w-5 fill-current" />
                                   </div>
                                   <span className="text-2xl font-black tracking-tight text-foreground">
                                        Gear<span className="text-gradient-kinetic">Up</span>
                                   </span>
                              </Link>

                              <p className="max-w-sm text-sm font-medium text-muted-foreground leading-relaxed">
                                   Empowering adventurers and professionals with high-grade equipment rentals. Rent premium gear effortlessly or list your equipment to start earning today.
                              </p>

                              {/* Social Icons */}
                              <div className="flex items-center gap-3 pt-2">
                                   <a
                                        href="https://www.facebook.com"
                                        className="icon-button border border-border/60 bg-muted/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                                        aria-label="Facebook"
                                   >
                                        <FaFacebookF className="h-4 w-4" />
                                   </a>
                                   <a
                                        href="https://www.instagram.com"
                                        className="icon-button border border-border/60 bg-muted/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                                        aria-label="Instagram"
                                   >
                                        <FaInstagram className="h-4 w-4" />
                                   </a>
                                   <a
                                        href="https://x.com"
                                        className="icon-button border border-border/60 bg-muted/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
                                        aria-label="Twitter"
                                   >
                                        < FaXTwitter className="h-4 w-4" />
                                   </a>
                              </div>
                         </div>

                         {/* Navigation Links Grid (4 Cols) */}
                         <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:pl-6">

                              {/* Quick Links */}
                              <div className="space-y-4">
                                   <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Navigation
                                   </h3>
                                   <ul className="space-y-2.5 text-sm font-semibold">
                                        <li>
                                             <Link href="/gear" className="text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                                                  Explore Gears
                                             </Link>
                                        </li>
                                        <li>
                                             <Link href="/catagory" className="text-foreground/80 hover:text-primary transition-colors">
                                                  Categories
                                             </Link>
                                        </li>
                                        <li>
                                             <Link href="/gear" className="text-foreground/80 hover:text-primary transition-colors">
                                                  List Your Gear
                                             </Link>
                                        </li>
                                        <li>
                                             <Link href="/how-it-works" className="text-foreground/80 hover:text-primary transition-colors">
                                                  How it Works
                                             </Link>
                                        </li>
                                   </ul>
                              </div>

                              {/* Support Links */}
                              <div className="space-y-4">
                                   <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Support
                                   </h3>
                                   <ul className="space-y-2.5 text-sm font-semibold">
                                        <li>
                                             <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
                                                  Help Center
                                             </Link>
                                        </li>
                                        <li>
                                             <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
                                                  Rental Safety
                                             </Link>
                                        </li>
                                        <li>
                                             <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
                                                  FAQ
                                             </Link>
                                        </li>
                                        <li>
                                             <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">
                                                  Terms & Policy
                                             </Link>
                                        </li>
                                   </ul>
                              </div>
                         </div>

                         {/* Column 3: Contact Glass Card (4 Cols) - Inspired by Image */}
                         <div className="lg:col-span-4">
                              <div className="rounded-3xl border border-border/80 bg-muted/30 p-6 space-y-5 backdrop-blur-md">
                                   <div className="flex items-center justify-between">
                                        <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
                                             Get in Touch <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                        </h3>
                                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                   </div>

                                   <div className="space-y-3.5 text-xs font-medium">
                                        <div className="flex items-center gap-3">
                                             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-card border border-border/60 text-primary">
                                                  <MapPin className="h-4 w-4" />
                                             </div>
                                             <div>
                                                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Location</p>
                                                  <p className="font-semibold text-foreground">Mohammadpur, Dhaka 1207</p>
                                             </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-card border border-border/60 text-secondary">
                                                  <Mail className="h-4 w-4" />
                                             </div>
                                             <div>
                                                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Email Support</p>
                                                  <p className="font-semibold text-foreground">support@gearup.com</p>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Call to Action Button */}
                                   <Link
                                        href="/gear"
                                        className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-xs font-bold text-secondary-foreground shadow-lg shadow-secondary/20 transition-all hover:bg-secondary/90 active:scale-95"
                                   >
                                        <span>Browse Gear Catalog</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                   </Link>
                              </div>
                         </div>

                    </div>

                    {/* Bottom Bar Separator */}
                    <div className="mt-10 border-t border-border/60 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
                         <p className="text-xs font-semibold text-muted-foreground text-center sm:text-left">
                              © {new Date().getFullYear()} GearUp Platform. All rights reserved.
                         </p>

                         <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                              <ShieldCheck className="h-3.5 w-3.5" />
                              <span>Verified Peer-to-Peer Rentals</span>
                         </div>
                    </div>

               </div>
          </footer>
     );
}