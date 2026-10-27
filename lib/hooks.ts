"use client";
import { currentUser } from "./auth";
import { loadCart, saveCart } from "./cart";
import { readAll } from "./db";
import { useLive } from "./useLive";
import type { CartItem, Collection, DbShape, User } from "./types";

export function useCollection<K extends Collection>(name: K): [DbShape[K], boolean] {
  return useLive<DbShape[K]>(() => readAll(name), [] as unknown as DbShape[K]);
}

export function useCart(): [CartItem[], (items: CartItem[]) => void] {
  const [items] = useLive<CartItem[]>(loadCart, []);
  return [items, saveCart];
}

export function useSession(): [User | undefined, boolean] {
  return useLive<User | undefined>(currentUser, undefined);
}
