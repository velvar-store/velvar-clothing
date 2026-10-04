'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Info,
  Layers,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';

type Mode = 'b2c' | 'b2b';

interface Product {
  id: string;
  name: string;
  category: string;
  retailPrice: number;
  wholesalePrice: number;
  moq: number;
  frontImage: string;
  backImage?: string;
  description: string;
  fit: string;
  composition: string;
}

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  mode: Mode;
  image: string;
  quantity: number;
  moq: number;
}

const FALLBACK_IMAGE = 'https://placehold.co/800x1067/111111/FFFFFF?text=VELVAR';

const PRODUCTS: Product[] = [
  {
    id: 'velvar-oversized-tee',
    name: 'Premium Oversized T-Shirt',
    category: 'T-Shirts',
    retailPrice: 650,
    wholesalePrice: 350,
    moq: 15,
    frontImage: 'https://i.ibb.co.com/zWwg6p7b/FB-IMG-1791020395770.jpg',
    backImage: 'https://i.ibb.co.com/7xydbyTM/FB-IMG-1791020400681.jpg',
    description: '500 GSM waffle-textured heavyweight cotton drop-shoulder tee. Features clean monochrome chest V emblem and full cyberpunk anime back print.',
    fit: 'Boxy Drop-Shoulder Oversized',
    composition: '100% Ring-spun Heavyweight Cotton (500 GSM)',
  },
  {
    id: 'velvar-polo-shirt',
    name: 'Premium Polo Shirt',
    category: 'Polo Shirts',
    retailPrice: 900,
    wholesalePrice: 500,
    moq: 12,
    frontImage: 'https://images.unsplash.com/photo-1625910513413-730623315a6b?auto=format&fit=crop&w=800&q=80',
    description: 'Structured pique cotton polo shirt crafted for a sharp contemporary luxury fit.',
    fit: 'Modern Tailored Fit',
    composition: '100% Pique Fine Cotton (240 GSM)',
  },
  {
    id: 'velvar-cargo-pants',
    name: 'Cargo Pants',
    category: 'Pants',
    retailPrice: 1200,
    wholesalePrice: 700,
    moq: 10,
    frontImage: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
    description: 'Heavy utility tactical cargo pants with modular pocket arrangement and reinforced stitching.',
    fit: 'Relaxed Tapered Cut',
    composition: '98% Cotton Canvas, 2% Elastane',
  },
  {
    id: 'velvar-activewear-dryfit',
    name: 'Activewear Dry-Fit T-Shirt',
    category: 'Activewear',
    retailPrice: 450,
    wholesalePrice: 250,
    moq: 20,
    frontImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-lightweight moisture-wicking performance tee engineered for high intensity training.',
    fit: 'Athletic Ergonomic Fit',
    composition: '100% Micro-Poly Dry-Fit Fabric',
  },
  {
    id: 'velvar-cotton-panjabi',
    name: 'Premium Cotton Panjabi',
    category: 'Traditional',
    retailPrice: 1800,
    wholesalePrice: 1000,
    moq: 10,
    frontImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    description: 'Refined handcrafted premium cotton panjabi with intricate minimal collar embroidery.',
    fit: 'Classic Tailored Cut',
    composition: '100% Egyptian Fine Cotton',
  },
];

export default function HomePage() {
  const [mode, setMode] = useState<Mode>('b2c');
  const [flippedProducts, setFlippedProducts] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Preload product images
  useEffect(() => {
    PRODUCTS.forEach((product) => {
      const front = new window.Image();
      front.src = product.frontImage;
      if (product.backImage) {
        const back = new window.Image();
        back.src = product.backImage;
      }
    });
  }, []);

  // Toast auto close
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      setToast(null);
    }, 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string) => {
    setToast(message);
  };

  const handleImageError = (imageKey: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    if (failedImages[imageKey]) return;
    setFailedImages((current) => ({
      ...current,
      [imageKey]: true,
    }));
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  const toggleFlip = (productId: string, hasBack: boolean) => {
    if (!hasBack) return;
    setFlippedProducts((current) => ({
      ...current,
      [productId]: !current[productId],
    }));
  };

  const setFlipState = (productId: string, value: boolean) => {
    setFlippedProducts((current) => ({
      ...current,
      [productId]: value,
    }));
  };

  const getUnitPrice = (product: Product, selectedMode: Mode) => {
    return selectedMode === 'b2b' ? product.wholesalePrice : product.retailPrice;
  };

  const getInitialQuantity = (product: Product, selectedMode: Mode) => {
    return selectedMode === 'b2b' ? product.moq : 1;
  };

  const addToCart = (product: Product, selectedMode: Mode = mode) => {
    const quantity = getInitialQuantity(product, selectedMode);
    const price = getUnitPrice(product, selectedMode);

    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id && item.mode === selectedMode,
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id && item.mode === selectedMode
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price,
          mode: selectedMode,
          image: product.frontImage,
          quantity,
          moq: product.moq,
        },
      ];
    });

    showToast(
      selectedMode === 'b2b' ? `${quantity} pcs added to wholesale order` : 'Product added to your bag',
    );
  };

  const removeFromCart = (id: string, itemMode: Mode) => {
    setCart((current) =>
      current.filter((item) => !(item.id === id && item.mode === itemMode)),
    );
  };

  const updateQuantity = (id: string, itemMode: Mode, direction: 1 | -1) => {
    setCart((current) =>
      current.map((item) => {
        if (item.id !== id || item.mode !== itemMode) {
          return item;
        }

        const step = itemMode === 'b2b' ? item.moq : 1;
        const minimum = itemMode === 'b2b' ? item.moq : 1;
        const nextQuantity = Math.max(minimum, item.quantity + direction * step);

        return { ...item, quantity: nextQuantity };
      }),
    );
  };

  const totalUnits = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black font-sans text-neutral-100 selection:bg-white selection:text-black">
      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[100] flex w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center gap-3 rounded-xl border border-neutral-700 bg-neutral-900/95 px-4 py-3 text-white shadow-2xl backdrop-blur-xl sm:left-auto sm:right-5 sm:translate-x-0">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black">
            <Check size={12} strokeWidth={3} />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider">
            {toast}
          </span>
        </div>
      )}

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <div className="flex shrink-0 items-center gap-2">
            <span className="font-serif text-lg font-black uppercase tracking-[0.15em] text-white sm:text-2xl">
              VELVAR FASHION
            </span>
            <span className="rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 text-[8px] font-mono tracking-widest text-neutral-400 sm:px-2 sm:text-[10px]">
              B2B & B2C
            </span>
          </div>

          {/* MODE SWITCHER & CART */}
          <div className="flex items-center gap-3">
            <div className="flex rounded-full border border-neutral-800 bg-neutral-950 p-1">
              <button
                type="button"
                onClick={() => setMode('b2c')}
                className={`rounded-full px-2.5 py-1.5 text-[9px] font-bold tracking-wider transition sm:px-4 sm:text-xs ${
                  mode === 'b2c'
                    ? 'bg-white text-black'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                RETAIL (B2C)
              </button>
              <button
                type="button"
                onClick={() => setMode('b2b')}
                className={`rounded-full px-2.5 py-1.5 text-[9px] font-bold tracking-wider transition sm:px-4 sm:text-xs ${
                  mode === 'b2b'
                    ? 'bg-white text-black'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                WHOLESALE (B2B)
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open cart with ${totalUnits} items`}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900 px-2.5 py-2 text-[10px] uppercase tracking-wider text-neutral-300 transition hover:border-neutral-600 hover:text-white sm:px-3.5"
            >
              <ShoppingBag size={14} />
              <span>({totalUnits})</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO / PAGE HEADER */}
      <section className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-6 md:py-16">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] text-neutral-400 sm:text-xs">
          <Sparkles size={11} /> DUAL-TIER CATALOG
        </div>
        <h1 className="mb-4 font-serif text-3xl font-bold text-white sm:text-5xl md:text-6xl">
          Latest Collection
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-xs font-light leading-6 text-neutral-400 sm:text-sm md:text-base">
          Explore our premium dual-tier catalog. Exclusive pricing available for both retail consumers and wholesale partners.
        </p>

        <div className="flex flex-wrap justify-center gap-2 font-mono text-[9px] uppercase tracking-wider sm:text-[10px]">
          <span className="rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2 text-neutral-300">
            {mode === 'b2b' ? 'WHOLESALE MODE (B2B)' : 'RETAIL MODE (B2C)'}
          </span>
          <span className="rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2 text-neutral-500">
            CURRENCY: ৳ (BDT) / $ (USD)
          </span>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => {
            const hasBack = Boolean(product.backImage);
            const isFlipped = Boolean(flippedProducts[product.id]);
            const frontKey = `${product.id}-front`;
            const backKey = `${product.id}-back`;

            return (
              <article
                key={product.id}
                onMouseEnter={() => {
                  if (hasBack) {
                    setFlipState(product.id, true);
                  }
                }}
                onMouseLeave={() => {
                  if (hasBack) {
                    setFlipState(product.id, false);
                  }
                }}
                className="group overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950 transition duration-300 hover:border-neutral-700 hover:shadow-2xl"
              >
                {/* IMAGE */}
                <div
                  role={hasBack ? 'button' : undefined}
                  tabIndex={hasBack ? 0 : undefined}
                  onClick={() => toggleFlip(product.id, hasBack)}
                  onKeyDown={(event) => {
                    if (
                      hasBack &&
                      (event.key === 'Enter' || event.key === ' ')
                    ) {
                      event.preventDefault();
                      toggleFlip(product.id, hasBack);
                    }
                  }}
                  className={`relative aspect-[3/4] overflow-hidden bg-neutral-900 ${
                    hasBack ? 'cursor-pointer' : ''
                  }`}
                >
                  {/* FRONT */}
                  <img
                    src={failedImages[frontKey] ? FALLBACK_IMAGE : product.frontImage}
                    alt={`${product.name} front view`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => handleImageError(frontKey, event)}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
                      isFlipped && hasBack ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                    }`}
                  />
                  {/* BACK */}
                  {hasBack && product.backImage && (
                    <img
                      src={failedImages[backKey] ? FALLBACK_IMAGE : product.backImage}
                      alt={`${product.name} back view`}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => handleImageError(backKey, event)}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
                        isFlipped ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
                      }`}
                    />
                  )}

                  {/* FLIP BADGE */}
                  {hasBack && (
                    <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-md border border-neutral-800 bg-black/80 px-2.5 py-1.5 text-[9px] uppercase tracking-wider text-neutral-300 backdrop-blur-md">
                      <RefreshCw size={10} />
                      <span className="hidden sm:inline">
                        {isFlipped ? 'Back View' : 'Hover / Tap for Back'}
                      </span>
                      <span className="sm:hidden">
                        {isFlipped ? 'BACK' : 'TAP VIEW'}
                      </span>
                    </div>
                  )}

                  {/* MOQ */}
                  {mode === 'b2b' && (
                    <div className="pointer-events-none absolute right-3 top-3 rounded-md bg-white px-2.5 py-1 text-[9px] font-black tracking-wider text-black">
                      MOQ: {product.moq}
                    </div>
                  )}

                  {/* CATEGORY */}
                  <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-neutral-800 bg-black/80 px-2.5 py-1 text-[9px] uppercase tracking-widest text-neutral-400 backdrop-blur-md">
                    {product.category}
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-4">
                    <div className="mb-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                      <span>{product.category}</span>
                      <span>MOQ: {product.moq}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="text-left font-sans text-lg font-bold leading-snug text-white transition hover:text-neutral-300 line-clamp-2"
                    >
                      {product.name}
                    </button>
                  </div>

                  {/* PRICING CONTAINER (Side-by-Side B2C and B2B) */}
                  <div className="mb-6 mt-auto flex items-center gap-3">
                    {/* Retail Price */}
                    <div className={`flex-1 rounded-xl border p-3 text-center transition-all ${
                      mode === 'b2c'
                        ? 'border-white bg-neutral-900 shadow-md ring-1 ring-white/20'
                        : 'border-neutral-800 bg-neutral-900/60'
                    }`}>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Retail (B2C)
                      </span>
                      <span className="block text-lg font-black font-mono text-white">
                        ৳{product.retailPrice}
                      </span>
                    </div>
                    {/* Wholesale Price */}
                    <div className={`flex-1 rounded-xl border p-3 text-center transition-all ${
                      mode === 'b2b'
                        ? 'border-white bg-neutral-900 shadow-md ring-1 ring-white/20'
                        : 'border-neutral-800 bg-neutral-900/60'
                    }`}>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                        Wholesale (B2B)
                      </span>
                      <span className="block text-lg font-black font-mono text-white">
                        ৳{product.wholesalePrice}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="w-full rounded-xl bg-white py-3.5 text-center font-sans text-sm font-semibold tracking-wide text-black shadow-sm transition hover:bg-neutral-200 active:scale-[0.98]"
                  >
                    Add to Cart {mode === 'b2b' ? `(${product.moq} pcs)` : ''}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-neutral-900 bg-neutral-950/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-neutral-900 px-6 py-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Feature
            icon={<Layers size={15} />}
            title="Heavyweight Density"
            text="320–500 GSM fabrics engineered for structured modern silhouettes."
          />
          <Feature
            icon={<Sparkles size={15} />}
            title="Collection 2026"
            text="Contemporary streetwear with graphic-focused archival design."
          />
          <Feature
            icon={<ShieldCheck size={15} />}
            title="B2B Wholesale"
            text="Wholesale pricing with transparent minimum order quantities."
          />
        </div>
      </section>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[80]">
          {/* BACKDROP */}
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/75 backdrop-blur-sm"
          />

          {/* DRAWER */}
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-neutral-800 bg-neutral-950 shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-neutral-900 p-5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <h2 className="text-sm font-bold uppercase tracking-widest">
                  Order Bag
                </h2>
                <span className="text-xs font-mono text-neutral-500">
                  ({totalUnits})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
                className="rounded p-1 text-neutral-400 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="py-20 text-center text-neutral-600">
                  <ShoppingBag className="mx-auto mb-4 opacity-30" size={38} />
                  <p className="text-xs uppercase tracking-widest">
                    Your bag is empty
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.mode}`}
                      className="rounded-xl border border-neutral-900 bg-neutral-900/40 p-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={
                            failedImages[`cart-${item.id}-${item.mode}`]
                              ? FALLBACK_IMAGE
                              : item.image
                          }
                          alt={item.name}
                          onError={(event) =>
                            handleImageError(`cart-${item.id}-${item.mode}`, event)
                          }
                          className="h-20 w-16 rounded-lg bg-neutral-900 object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 text-xs font-semibold text-white">
                              {item.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id, item.mode)}
                              aria-label={`Remove ${item.name}`}
                              className="shrink-0 text-neutral-500 hover:text-white"
                            >
                              <X size={14} />
                            </button>
                          </div>
                          <div className="mt-1 text-[9px] uppercase text-neutral-500">
                            {item.mode === 'b2b' ? `Wholesale • MOQ ${item.moq}` : 'Retail'}
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded border border-neutral-800 bg-black px-2 py-1">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.mode, -1)}
                                aria-label="Decrease quantity"
                                className="text-neutral-400 hover:text-white"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="min-w-8 text-center text-xs font-mono">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.mode, 1)}
                                aria-label="Increase quantity"
                                className="text-neutral-400 hover:text-white"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            <span className="font-mono text-xs font-bold text-white">
                              ৳{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CHECKOUT */}
            {cart.length > 0 && (
              <div className="border-t border-neutral-900 p-5">
                <div className="mb-2 flex justify-between text-xs text-neutral-500">
                  <span> Subtotal </span>
                  <span className="font-mono text-white">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="mb-4 flex justify-between text-xs text-neutral-500">
                  <span> Shipping </span>
                  <span> Calculated at checkout </span>
                </div>
                <div className="mb-5 flex justify-between border-t border-neutral-900 pt-3 text-sm font-bold">
                  <span> Total </span>
                  <span className="font-mono"> ৳{subtotal.toLocaleString()} </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    showToast('Checkout is ready for payment/backend integration.')
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-neutral-200"
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close product details"
            onClick={() => setSelectedProduct(null)}
            className="absolute inset-0 h-full w-full bg-black/85 backdrop-blur-md"
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-2xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-neutral-600">
                  {selectedProduct.category} {' // '} SS26
                </span>
                <h2 className="mt-1 text-lg font-black uppercase text-white sm:text-xl">
                  {selectedProduct.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close product details"
                className="text-neutral-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* MODAL IMAGE */}
              <div className="aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900">
                <img
                  src={
                    failedImages[`${selectedProduct.id}-details`]
                      ? FALLBACK_IMAGE
                      : selectedProduct.frontImage
                  }
                  alt={selectedProduct.name}
                  onError={(event) =>
                    handleImageError(`${selectedProduct.id}-details`, event)
                  }
                  className="h-full w-full object-cover"
                />
              </div>

              {/* MODAL DETAILS */}
              <div className="flex flex-col justify-between">
                <div className="space-y-5 text-xs leading-5 text-neutral-300">
                  <p> {selectedProduct.description} </p>
                  <div className="border-t border-neutral-900 pt-3">
                    <span className="mb-1 block text-[9px] uppercase tracking-widest text-neutral-600">
                      Fit & Silhouette
                    </span>
                    <span className="text-white"> {selectedProduct.fit} </span>
                  </div>
                  <div className="border-t border-neutral-900 pt-3">
                    <span className="mb-1 block text-[9px] uppercase tracking-widest text-neutral-600">
                      Fabric Composition
                    </span>
                    <span className="text-white">
                      {selectedProduct.composition}
                    </span>
                  </div>
                  <div className="border-t border-neutral-900 pt-3">
                    <span className="mb-1 block text-[9px] uppercase tracking-widest text-neutral-600">
                      Wholesale MOQ
                    </span>
                    <span className="text-white">
                      {selectedProduct.moq} pieces
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-neutral-900 pt-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-xs text-neutral-500">
                      Retail ৳{selectedProduct.retailPrice}
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      B2B ৳{selectedProduct.wholesalePrice} /unit
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-neutral-200"
                  >
                    <ShoppingBag size={14} /> Add to{' '}
                    {mode === 'b2b' ? 'Wholesale Order' : 'Bag'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 bg-black px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <div className="text-sm font-black tracking-[0.25em] text-white">
              VELVAR
            </div>
            <div className="mt-1 text-[9px] font-mono uppercase tracking-widest text-neutral-700">
              COLLECTION 2026
            </div>
          </div>

          <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-neutral-600">
            <Info size={12} /> B2C & B2B STOREFRONT
          </div>

          <button
            type="button"
            onClick={() => {
              setMode('b2b');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              showToast('Wholesale B2B mode activated');
            }}
            className="text-[10px] uppercase tracking-wider text-neutral-500 transition hover:text-white"
          >
            B2B Inquiry
          </button>
        </div>
      </footer>
    </main>
  );
}

/* FEATURE COMPONENT */
function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="px-6 py-6 text-center">
      <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-white">
        {icon}
      </div>
      <div className="mb-1 text-xs font-bold uppercase tracking-widest text-white">
        {title}
      </div>
      <p className="mx-auto max-w-xs text-xs leading-5 text-neutral-500">
        {text}
      </p>
    </div>
  );
}