"use client";
import { createContext, useContext, useState, useCallback, ReactNode, createElement } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartCtx {
  items: Record<string, CartItem>;
  isOpen: boolean;
  add: (id: string, name: string, price: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clear: () => void;
  toggle: () => void;
  open: () => void;
  close: () => void;
  count: number;
  total: number;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, CartItem>>({});
  const [isOpen, setOpen] = useState(false);

  const add = useCallback((id: string, name: string, price: number) => {
    setItems(prev => {
      const ex = prev[id];
      return { ...prev, [id]: ex ? { ...ex, qty: ex.qty + 1 } : { id, name, price, qty: 1 } };
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => { const n = { ...prev }; delete n[id]; return n; });
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setItems(prev => {
      const item = prev[id];
      if (!item) return prev;
      const nq = item.qty + delta;
      if (nq <= 0) { const n = { ...prev }; delete n[id]; return n; }
      return { ...prev, [id]: { ...item, qty: nq } };
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);
  const toggle = useCallback(() => setOpen(p => !p), []);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  const entries = Object.values(items);
  const count = entries.reduce((s, i) => s + i.qty, 0);
  const total = entries.reduce((s, i) => s + i.price * i.qty, 0);

  return createElement(Ctx.Provider, { value: { items, isOpen, add, remove, updateQty, clear, toggle, open, close, count, total } }, children);
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
