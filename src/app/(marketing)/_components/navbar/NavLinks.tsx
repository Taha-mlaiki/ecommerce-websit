"use client";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MainNav = ({ data }: { data: Category[] }) => {
  const pathname = usePathname();
  const extractRoutes = data.filter((ele) => ele.name !== "All");

  const routes = extractRoutes.map((ele) => ({
    href: `/${ele.id}`,
    label: ele.name,
    active: pathname === `/${ele.id}`,
  }));

  return (
    <nav className="mx-6 mt-2">
    <div className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:flex">
      <Link
        href="/"
        className={cn(
          "text-sm font-bold transition-colors hover:text-black",
          pathname === "/" ? "text-black" : "text-neutral-400"
        )}
      >
        All
      </Link>
      {routes.map((route) => (
        <Link
          key={route!.label}
          href={route!.href}
          className={cn(
            "text-sm font-bold transition-colors hover:text-black",
            route!.active ? "text-black" : "text-neutral-400"
          )}
        >
          {route!.label}
        </Link>
      ))}
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <Menu size={25} />
          </SheetTrigger>
          <SheetContent>
            <ul className="mt-20 flex flex-col gap-3">
              <Link
                href="/"
                className={cn(
                  "text-sm font-bold transition-colors hover:text-black",
                  pathname === "/" ? "text-black" : "text-neutral-400"
                )}
              >
                All
              </Link>
              {routes.map((route) => (
                <Link
                  key={route!.label}
                  href={route!.href}
                  className={cn(
                    "text-sm font-bold transition-colors hover:text-black",
                    route!.active ? "text-black" : "text-neutral-400"
                  )}
                >
                  {route!.label}
                </Link>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MainNav;
