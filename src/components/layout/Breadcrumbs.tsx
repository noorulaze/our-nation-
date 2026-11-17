"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-[#5C6A64] py-2.5 ${className}`}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-[#1B4D36] hover:text-[#123826] font-semibold transition hover:underline"
          >
            <Home className="w-3.5 h-3.5" />
            <span>ഹോം</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-[#A5B3AB] shrink-0" />
              {isLast || !item.href ? (
                <span className="font-bold text-[#1A2420] truncate max-w-[240px] sm:max-w-md" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-[#1B4D36] hover:text-[#123826] font-medium transition hover:underline truncate max-w-[160px] sm:max-w-xs"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
