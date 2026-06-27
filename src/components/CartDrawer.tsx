import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, Zap, QrCode, Mail, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (prodId: string, delta: number) => void;
  onRemove: (prodId: string) => void;
  onClearCart: () => void;
  t: any;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemove,
  onClearCart,
  t
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'processing' | 'success'>('cart');
  const [customerEmail, setCustomerEmail] = useState('');

  if (!isOpen) return null;

  const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const hasEsim = cart.some(item => item.product.category === 'esim' || item.product.category === 'plan' || item.product.category === 'iphone');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim()) return;
    setCheckoutStep('processing');

    setTimeout(() => {
      setCheckoutStep('success');
      onClearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0516] border-l border-white/15 text-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#FF007F]/10 text-[#FF007F]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-extrabold font-sans">{t.cart.title}</h2>
            </div>
            <button
              onClick={() => {
                onClose();
                setCheckoutStep('cart');
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {checkoutStep === 'cart' ? (
              cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20 text-gray-400 font-mono">
                  <ShoppingBag className="w-16 h-16 stroke-[1.5] text-gray-600 animate-pulse" />
                  <p className="text-sm">{t.cart.empty}</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-white/10 text-xs font-sans font-bold text-white hover:bg-[#FF007F] transition-colors"
                  >
                    Explore VIVA Store
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.product.id}
                      className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center gap-4 relative group"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain bg-black/40 rounded-xl p-2 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase font-mono text-[#FFD700] font-bold">
                          {item.product.category === 'esim' ? 'Instant QR Kit' : item.product.category === 'plan' ? '5G Monthly' : 'Hardware'}
                        </div>
                        <h4 className="text-sm font-bold text-white truncate font-sans">{item.product.name}</h4>
                        <div className="text-xs text-[#FF007F] font-mono font-bold mt-1">${item.product.price}</div>
                        
                        {/* Qty Controls */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => onUpdateQty(item.product.id, -1)}
                            className="p-1 rounded bg-white/5 hover:bg-white/15 text-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(item.product.id, 1)}
                            className="p-1 rounded bg-white/5 hover:bg-white/15 text-gray-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="p-2 text-gray-500 hover:text-[#FF007F] transition-colors self-start"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {hasEsim && (
                    <div className="p-4 rounded-2xl bg-[#FF007F]/10 border border-[#FF007F]/30 text-xs text-gray-200 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#FFD700]">
                        <Zap className="w-4 h-4 fill-current" />
                        <span>Instant Digital Delivery Notice:</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-gray-300">{t.cart.esimNote}</p>
                    </div>
                  )}
                </div>
              )
            ) : checkoutStep === 'processing' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-24 font-mono">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-[#FF007F]/20 animate-ping" />
                  <Zap className="w-10 h-10 text-[#FFD700] animate-bounce" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans text-white mb-1">Provisioning VIVA 5G Network Profile</h3>
                  <p className="text-xs text-gray-400">Authenticating with T-Mobile Ultra Capacity Gateway...</p>
                </div>
              </div>
            ) : (
              /* SUCCESS STATE SIMULATION WITH INSTANT ESIM QR CODE */
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 text-center py-6">
                <div className="w-16 h-16 bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white font-sans">{t.cart.successTitle}</h3>
                  <p className="text-xs text-gray-300 mt-2 max-w-xs mx-auto leading-relaxed">{t.cart.successSub}</p>
                </div>

                {/* Simulated eSIM Digital Activation Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-b from-[#180a33] to-[#0d041e] border border-[#FF007F] shadow-2xl text-left space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[10px] font-mono text-[#FFD700] uppercase font-extrabold">VIVA DIGITAL eSIM PROFILE</span>
                    <span className="bg-[#E20074] text-white text-[9px] px-1.5 py-0.5 rounded font-bold">READY TO SCAN</span>
                  </div>

                  <div className="flex items-center justify-center py-4 bg-white p-4 rounded-2xl mx-auto max-w-[180px]">
                    {/* Simulated High-Contrast QR Code */}
                    <div className="relative w-36 h-36 bg-black flex items-center justify-center rounded-xl overflow-hidden p-2">
                      <QrCode className="w-full h-full text-white" />
                      <div className="absolute inset-0 bg-[radial-gradient(#FF007F_1px,transparent_1px)] opacity-30" />
                    </div>
                  </div>

                  <div className="text-center font-mono text-[10px] text-gray-300 space-y-1">
                    <div>LPA:1$smdp.myvivamobile.com$ACT-992-881</div>
                    <div className="text-[#10B981] font-bold">● Profile Status: ACTIVE</div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#FF007F] flex-shrink-0" />
                    <span>Sent receipt & backup guide to <strong className="text-white">{customerEmail}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    setCheckoutStep('cart');
                  }}
                  className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs font-sans transition-all"
                >
                  {t.cart.close}
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer Checkout */}
          {checkoutStep === 'cart' && cart.length > 0 && (
            <form onSubmit={handleCheckout} className="p-6 border-t border-white/10 bg-[#0d071c] space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase text-gray-400 flex items-center justify-between">
                  <span>Digital Delivery Email</span>
                  <span className="text-[#FF007F]">*Required for eSIM</span>
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@community.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FF007F] font-sans"
                />
              </div>

              <div className="flex items-center justify-between font-sans">
                <span className="text-xs text-gray-400 font-mono">{t.cart.total}</span>
                <span className="text-2xl font-extrabold text-[#FFD700]">${totalPrice.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF007F] via-[#E20074] to-[#FF6B00] text-white font-extrabold text-sm tracking-wide shadow-xl hover:shadow-[0_0_25px_rgba(255,0,127,0.5)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current text-[#FFD700]" />
                <span>{t.cart.checkout}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
